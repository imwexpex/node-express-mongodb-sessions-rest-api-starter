import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    ip: {
      type: String,
    },
    tokenExpireAt: {
      type: Date,
      required: true,
    },
    refreshTokenExpireAt: {
      type: Date,
      required: true,
    },
  },
  {versionKey: false, timestamps: true, token: 1},
);

export default mongoose.model('Session', schema);
