import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false},
);

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    return next();
  });
};

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(user, salt, next);
  });
};

schema.pre('save', function (next) {
  const SALT_FACTOR = 5;
  if (!this.isModified('password')) {
    return next();
  }
  return genSalt(this, SALT_FACTOR, next);
});

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

schema.plugin(mongoosePaginate);

export default mongoose.model('User', schema);
