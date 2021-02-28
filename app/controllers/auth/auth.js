import {emailExists} from '@controllers/auth/helpers/emailExists';
import {validateCredentials} from '@controllers/auth/helpers/validateCredentials';
import {createItem} from '@utils/db';
import utils from '@utils';
import {User} from '@models';
import {createSession, deleteSession, refreshSession} from '@middleware/auth';
import {matchedData} from 'express-validator';

exports.register = async (req, res) => {
  try {
    const matchedReq = matchedData(req);

    await emailExists(matchedReq.email);

    const user = await createItem(matchedReq, User);
    const session = await createSession(req, user._id);

    await res.json({user, session});
  } catch (error) {
    utils.handleError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const matchedReq = matchedData(req);

    const user = await validateCredentials(
      matchedReq.email,
      matchedReq.password,
    );

    await res.json({
      user,
      session: await createSession(req, user._id),
    });
  } catch (error) {
    utils.handleError(res, error);
  }
};

exports.logout = async (req, res) => {
  try {
    await deleteSession(req);

    await res.sendStatus(200);
  } catch (error) {
    utils.handleError(res, error);
  }
};

exports.refresh = async (req, res) => {
  try {
    res.json(await refreshSession(req));
  } catch (error) {
    utils.handleError(res, error);
  }
};
