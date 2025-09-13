import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, addCommentToPost } from '../services/forumService';
// import { getPostById,  } from '../services/forumService';

// A helper to format the date strings from the API
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ForumPost = () => {
    const { postId } = useParams(); // Gets the post ID from the URL (e.g., /forum/68b59d65e02b32ae96cf2629)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the new comment form
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(postId);
                // The actual post data is nested inside the 'data' property of the API response
                if (response.data && response.data.data) {
                    setPost(response.data.data);
                } else {
                     setError('Post data could not be found in the server response.');
                }
            } catch (err) {
                setError('Failed to fetch the forum post. It may have been deleted or the link is incorrect.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]); // Re-run the effect if the post ID changes

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return; // Prevent empty comments

        setIsSubmitting(true);
        setError('');

        try {
            const response = await addCommentToPost(id, { content: newComment });
            // The API returns the updated post with the new comment, so we can update the state
            if (response.data && response.data.data) {
                setPost(response.data.data);
                setNewComment(''); // Clear the textarea
            }
        } catch (err) {
            setError('Could not submit your comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-600">Loading post...</div>;
    }
    
    if (error) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg max-w-2xl mx-auto mt-10">
                <h2 className="text-xl font-semibold text-red-700">Error</h2>
                <p className="text-red-600 mt-2">{error}</p>
                <Link to="/forum" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Forum</Link>
            </div>
        );
    }

    if (!post) {
        return <div className="p-8 text-center text-gray-500">Post not found.</div>;
    }

    return (
        <div className="container mx-auto  m-10 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-2xl">
            <div className="max-w-4xl mx-auto">
                <Link to="/forum" className="text-blue-600 hover:underline mb-4 inline-block">← Back to All Posts</Link>
                
                {/* The Main Post */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>
                    <div className="text-sm text-gray-500 mb-4">
                        <span>Posted by a <span className="font-semibold">{post.author?.role || 'user'}</span></span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Comment Submission Form */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Leave a Comment</h2>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            rows="4"
                            placeholder="Share your thoughts..."
                            required
                        ></textarea>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                </div>

                {/* Comments Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Comments ({post.comments.length})</h2>
                    <div className="space-y-4">
                        {post.comments.length > 0 ? (
                            post.comments.map(comment => (
                                <div key={comment._id} className="border-t border-gray-200 pt-4">
                                    <div className="text-sm text-gray-500 mb-2">
                                        <span className="font-semibold">{comment.author?.fullName || 'A User'}</span>
                                        <span className="mx-2">•</span>
                                        <span>{formatDate(comment.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-600">{comment.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">No comments yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumPost;
