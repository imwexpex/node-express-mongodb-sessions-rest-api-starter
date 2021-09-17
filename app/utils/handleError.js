/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
export const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.MODE === 'dev') {
    console.error(err);
  }

  const status = (Number(err.code) > 500 ? 500 : err.code) || 500;

  res.status(status).send(err);
};
