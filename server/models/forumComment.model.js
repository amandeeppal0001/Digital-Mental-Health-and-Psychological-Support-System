import mongoose from 'mongoose';

const ForumCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required.'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // This is the link back to the parent post.
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ForumComment', ForumCommentSchema);

