import {validateResult} from '@utils';
import {body} from 'express-validator';

const get = [
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const update = [
  body('name').isString().withMessage('STRING_REQUIRED').optional(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export default {
  get,
  update,
};
