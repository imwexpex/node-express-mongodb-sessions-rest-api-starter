import utils from '@utils';
import {body} from 'express-validator';

exports.get = [
  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];

exports.update = [
  body('name').isString().withMessage('STRING_REQUIRED').optional(),

  (req, res, next) => {
    utils.validateResult(req, res, next);
  },
];
