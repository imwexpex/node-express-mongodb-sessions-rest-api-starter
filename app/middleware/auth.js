import {Session, User} from '@models';
import user from '@models/user';
import utils from '@utils';
import isAfter from 'date-fns/isAfter';
import addMinutes from 'date-fns/addMinutes';
import {matchedData} from 'express-validator';
import randToken from 'rand-token';

const extractToken = (req) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim();
  } else if (req.body.token) {
    token = req.body.token.trim();
  } else if (req.query.token) {
    token = req.query.token.trim();
  }
  return token;
};

const createSession = async (req, userId) => {
  let ip = req.headers['cf-connecting-ip'];

  const token = randToken.generate(128);
  const refreshToken = randToken.generate(128);

  const dateNow = new Date();

  await Session.create({
    user: userId,
    ip,
    token,
    refreshToken,
    tokenExpireAt: addMinutes(dateNow, process.env.TOKEN_EXPIRATION_IN_MINUTES),
    refreshTokenExpireAt: addMinutes(
      dateNow,
      process.env.REFRESH_TOKEN_EXPIRATION_IN_MINUTES,
    ),
  });

  return {
    token,
    refreshToken,
  };
};

const deleteSession = async (req) => {
  const session = await Session.findOne({
    token: extractToken(req),
  });

  if (session && refreshSession) {
    await session.remove();

    return;
  }

  throw utils.buildErrObject(401, 'Unauthorized');
};

const refreshSession = async (req) => {
  const {refreshToken} = matchedData(req);

  const session = await Session.findOne({
    token: extractToken(req),
  });

  if (
    session && session?.refreshToken === refreshToken &&
    !isAfter(new Date(), new Date(session?.refreshTokenExpireAt))
  ) {
    await session.delete();

    return await createSession(req, session.user._id);
  }

  throw utils.buildErrObject(401, 'Unauthorized');
};

const checkSession = async (req, res, next) => {
  const session = await Session.findOne({
    token: extractToken(req),
  }).populate('user');

  if (session && !isAfter(new Date(), new Date(session.tokenExpireAt))) {
    if (!session.user?.blocked) {
      req.user = session.user;

      next();
    } else {
      return res.status(403).send(utils.buildErrObject(403, 'USER_BLOCKED'));
    }
  } else {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = {
  checkSession,
  createSession,
  deleteSession,
  refreshSession,
};
