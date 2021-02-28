import utils from '@utils';
import {User} from '@models';

export const validateCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user?.blocked) {
    if (await user?.comparePassword(password)) {
      return user;
    }
  } else {
    throw utils.buildErrObject(403, 'USER_BLOCKED');
  }

  throw utils.buildErrObject(401, 'INCORRECT_DATA');
};
