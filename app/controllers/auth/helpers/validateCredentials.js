import {buildErrObject} from '@utils';
import {User} from '@models';

export const validateCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user?.blocked) {
    if (await user?.comparePassword(password)) {
      delete user._doc?.password;

      return user;
    }
  } else {
    throw buildErrObject(403, 'USER_BLOCKED');
  }

  throw buildErrObject(401, 'INCORRECT_DATA');
};
