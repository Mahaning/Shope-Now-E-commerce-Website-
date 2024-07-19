import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  slug: {
    type: String,
    lowercase: true,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  active: {
    type: Boolean,
    default: true, 
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    // required: true, 
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
  },
}, {
  timestamps: true, 
});

export default mongoose.model("Category", categorySchema);
