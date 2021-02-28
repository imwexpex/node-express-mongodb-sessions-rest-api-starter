/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.MODE === 'dev') {
    console.error(err);
  }

  const status = (Number(err.code) > 500 ? 500 : err.code) || 500;

  // Sends error to user
  /*res.status().json({
    errors: {
      msg: err.message,
    },
  });*/

  res.status(status).send(err);
};

module.exports = {handleError};
