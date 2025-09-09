import ForumPost from '../models/forumPost.model.js';
import ForumComment from '../models/forumComment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// --- POSTS ---

/**
 * @desc    Create a new forum post
 * @route   POST /api/forum
 * @access  Private
 */
export const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required.");
    }

    const post = await ForumPost.create({
        title,
        content,
        author: req.user._id, // from authMiddleware
    });

    res.status(201).json(new ApiResponse(201, post, "Forum post created successfully."));
});

/**
 * @desc    Get all forum posts
 * @route   GET /api/forum
 * @access  Private
 */
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await ForumPost.find()
        .sort({ createdAt: -1 })
        // We populate the author but only select the role, not name/email, for privacy
        .populate('author', 'role') 
        .populate('comments');

    res.status(200).json(new ApiResponse(200, posts, "All posts fetched successfully."));
});

/**
 * @desc    Get a single post by ID with comments
 * @route   GET /api/forum/:postId
 * @access  Private
 */
export const getPostById = asyncHandler(async (req, res) => {
    const post = await ForumPost.findById(req.params.postId)
        .populate('author', 'role')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'role' // Also hide author identity in comments
            }
        });

    if (!post) {
        throw new ApiError(404, "Post not found.");
    }

    res.status(200).json(new ApiResponse(200, post, "Post fetched successfully."));
});


// --- COMMENTS ---

/**
 * @desc    Create a new comment on a post
 * @route   POST /api/forum/:postId/comments
 * @access  Private
 */
export const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
        throw new ApiError(400, "Comment content is required.");
    }

    // First, check if the post exists
    const post = await ForumPost.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found.");
    }

    // Create the new comment
    const comment = await ForumComment.create({
        content,
        author: req.user._id, // from authMiddleware
        post: postId,
    });

    // Add the comment's ID to the post's comments array and save the post
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(new ApiResponse(201, comment, "Comment added successfully."));
});
