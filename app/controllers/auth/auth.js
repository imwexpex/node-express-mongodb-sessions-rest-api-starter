import {emailExists} from '@controllers/auth/helpers/emailExists';
import {validateCredentials} from '@controllers/auth/helpers/validateCredentials';
import {handleError} from '@utils';
import {User} from '@models';
import {createSession, deleteSession, refreshSession} from '@middleware/auth';
import {matchedData} from 'express-validator';

const register = async (req, res) => {
  try {
    const matchedReq = matchedData(req);

    await emailExists(matchedReq.email);

    const user = (await User.create(matchedReq)).toObject();

    delete user?.password;

    const session = await createSession(req, user._id);

    await res.json({user, session});
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
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
    handleError(res, error);
  }
};

const logout = async (req, res) => {
  try {
    await deleteSession(req);

    await res.sendStatus(200);
  } catch (error) {
    handleError(res, error);
  }
};

const refresh = async (req, res) => {
  try {
    res.json(await refreshSession(req));
  } catch (error) {
    handleError(res, error);
  }
};

export default {
  register,
  login,
  logout,
  refresh,
};
