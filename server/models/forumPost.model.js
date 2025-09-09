import mongoose from 'mongoose';

const ForumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
  // We link to the user who created it, but on the frontend, we can display "Anonymous"
  // to protect privacy. This link is for data integrity.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // We will store an array of comment IDs related to this post.
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumComment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ForumPost', ForumPostSchema);

