import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Article', 'Video', 'Audio', 'Guide'],
    required: true,
  },
  // You could add a URL for video/audio resources
  url: {
    type: String,
  },
  // To track who created the resource
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model, likely an admin or counselor
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resource', ResourceSchema);
