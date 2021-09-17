import {handleError} from '@utils';
import {matchedData} from 'express-validator';
import {User} from '@models';

const get = async (req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.error(e);
    handleError(res, e);
  }
};

const update = async (req, res) => {
  try {
    const matchedReq = matchedData(req);

    const user = await User.findByIdAndUpdate(req?.user?._id, matchedReq, {
      new: true,
    }).exec();

    res.json(user);
  } catch (e) {
    console.error(e);
    handleError(res, e);
  }
};

export default {
  get,
  update,
};
