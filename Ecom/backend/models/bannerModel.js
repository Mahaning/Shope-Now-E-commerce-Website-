import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  bannerImage: {
    data: Buffer,
    contentType: String,
  },
  bannerDescription: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
