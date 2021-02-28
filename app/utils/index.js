const {buildErrObject} = require('./buildErrObject');
const {buildSuccObject} = require('./buildSuccObject');
const {handleError} = require('./handleError');
const {itemNotFound} = require('./itemNotFound');
const {validateResult} = require('./validateResult');

module.exports = {
  buildErrObject,
  buildSuccObject,
  handleError,
  itemNotFound,
  validateResult,
};
