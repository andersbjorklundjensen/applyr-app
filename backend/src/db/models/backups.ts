import mongoose from 'mongoose';

export default new mongoose.Schema({
  ownerId: { type: String, required: true },
  created: { type: Number, required: true },
  filename: { type: String, required: true },
});
