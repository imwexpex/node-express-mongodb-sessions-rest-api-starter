import express from 'express';

import trimRequest from 'trim-request';
import {default as validate} from '../controllers/auth/auth.validate';
import {default as controller} from '../controllers/auth/auth';

import {checkSession} from '@middleware/auth';

const router = express.Router();

router.post(
  '/register',
  trimRequest.all,
  validate.register,
  controller.register,
);

router.post('/login', trimRequest.all, validate.login, controller.login);

router.get(
  '/logout',
  checkSession,
  trimRequest.all,
  validate.logout,
  controller.logout,
);

router.post('/refresh', trimRequest.all, validate.refresh, controller.refresh);

module.exports = router;
