const express = require('express');
const router = express.Router();

const trimRequest = require('trim-request');
const validate = require('../controllers/profile/profile.validate');
const controller = require('../controllers/profile/profile');
import {checkSession} from '@middleware/auth';

router.get('/', checkSession, trimRequest.all, validate.get, controller.get);

router.put(
  '/',
  checkSession,
  trimRequest.all,
  validate.update,
  controller.update,
);

module.exports = router;
