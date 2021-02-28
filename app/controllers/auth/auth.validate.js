import utils from '@utils';
import {body} from 'express-validator';

exports.register = [
  body('email').isEmail().withMessage('EMAIL_REQUIRED'),
  body('password')
    .isString()
    .withMessage('PASSWORD_REQUIRED')
    .isLength({
      min: 5,
    })
    .withMessage('PASSWORD_NOT_MIN_LENGTH'),
  body('name').isString().withMessage('NAME_REQUIRED'),

  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];

exports.login = [
  body('email').isEmail().withMessage('EMAIL_REQUIRED'),
  body('password').isString().withMessage('PASSWORD_REQUIRED'),

  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];

exports.logout = [
  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];

exports.refresh = [
  body('refreshToken').isString().withMessage('REFRESH_TOKEN_REQUIRED'),

  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];
