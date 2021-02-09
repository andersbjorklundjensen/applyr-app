import mongoose from 'mongoose';

export default new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Number, required: true },
  lastLogoutTime: { type: Number, required: true },
});
