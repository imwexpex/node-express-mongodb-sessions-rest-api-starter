import express from 'express';

import trimRequest from 'trim-request';
import {default as validate} from '../controllers/profile/profile.validate';
import {default as controller} from '../controllers/profile/profile';
import {checkSession} from '@middleware/auth';

const router = express.Router();

router.get('/', checkSession, trimRequest.all, validate.get, controller.get);

router.put(
  '/',
  checkSession,
  trimRequest.all,
  validate.update,
  controller.update,
);

module.exports = router;
