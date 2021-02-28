import utils from '@utils';

const validateSecret = (secret, next) => {
  if (secret === 'dxYgrrT9rcQPgTCaH9nfc7RuDjzbhbW8') {
    next();
  } else {
    throw 'Unauthorized';
  }
};

exports.use = (req, res, next) => {
  try {
    validateSecret(req.get('Client-Secret'), next);
  } catch (err) {
    return utils.handleError(res, utils.buildErrObject(401, 'Unauthorized'));
  }
};
