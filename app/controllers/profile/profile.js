import utils from '@utils';
import {matchedData} from 'express-validator';
import {User} from '@models';

exports.get = async (req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.error(e);
    utils.handleError(res, e);
  }
};

exports.update = async (req, res) => {
  try {
    const matchedReq = matchedData(req);

    const user = await User.findByIdAndUpdate(req?.user?._id, matchedReq, {
      new: true,
    }).exec();

    res.json(user);
  } catch (e) {
    console.error(e);
    utils.handleError(res, e);
  }
};
