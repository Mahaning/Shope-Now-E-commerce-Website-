import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Number
  },
  role: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    default: 2 // Default to 'user'
  },
  otp: {
    type: String,
    default: ''
  },
  otpExpires: {
    type: Date
  }
});

// Middleware to update the updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

export default mongoose.model('User', userSchema);
