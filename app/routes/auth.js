const express = require('express');
const router = express.Router();

const trimRequest = require('trim-request');
const validate = require('../controllers/auth/auth.validate');
const controller = require('../controllers/auth/auth');
const {checkSession} = require('@middleware/auth');

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

router.get('/refresh', trimRequest.all, validate.refresh, controller.refresh);

module.exports = router;
