import React, { useState, useEffect } from 'react';
import { getAllPosts, createPost } from '../services/forumService';
import { Link } from 'react-router-dom';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data.data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPost(newPost);
            setPosts([response.data.data, ...posts]); // Add new post to the top
            setNewPost({ title: '', content: '' }); // Reset form
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };

    if (loading) return <div className="text-center p-8">Loading forum...</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold m-4">Peer Support Forum</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Create a new post (Anonymous)</h2>
                <form onSubmit={handlePostSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                        placeholder="Post title..."
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <textarea
                        name="content"
                        value={newPost.content}
                        onChange={handleInputChange}
                        placeholder="Share your thoughts..."
                        className="w-full p-2 border rounded mb-4"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Submit Post
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600">{post.comments.length} comments</p>
                        <Link to={`/forum/${post._id}`} className="text-blue-500 hover:underline">
                            View Discussion
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
