import express from 'express';
const router = express.Router();

router.use('/', require('./auth'));

router.use('/profile', require('./profile'));

module.exports = router;
