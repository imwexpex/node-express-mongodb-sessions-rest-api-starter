import {validateResult} from '@utils';
import {body} from 'express-validator';

const register = [
  body('email').isEmail().withMessage('EMAIL_REQUIRED'),
  body('password')
    .isString()
    .withMessage('PASSWORD_REQUIRED')
    .isLength({
      min: 5,
    })
    .withMessage('PASSWORD_NOT_MIN_LENGTH'),
  body('name').isString().withMessage('NAME_REQUIRED'),

  validateResult,
];

const login = [
  body('email').isEmail().withMessage('EMAIL_REQUIRED'),
  body('password').isString().withMessage('PASSWORD_REQUIRED'),

  validateResult,
];

const logout = [validateResult];

const refresh = [
  body('refreshToken').isString().withMessage('REFRESH_TOKEN_REQUIRED'),

  validateResult,
];

export default {
  register,
  login,
  logout,
  refresh,
};
