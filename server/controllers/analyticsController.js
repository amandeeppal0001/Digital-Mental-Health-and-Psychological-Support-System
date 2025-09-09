import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {User} from '../models/User.model.js';
import Resource from '../models/Resources.model.js';
import ForumPost from '../models/forumPost.model.js';
import ForumComment from '../models/forumComment.model.js';

/**
 * @desc    Get aggregated data for the admin dashboard
 * @route   GET /api/analytics/dashboard
 * @access  Private (Admin)
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    // To calculate new users in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Prepare all database queries to run in parallel
    const promises = [
        User.countDocuments(),
        User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
        Resource.countDocuments(),
        // Use Aggregation Pipeline to group resources by category and count them
        Resource.aggregate([
            {
                $group: {
                    _id: '$category', // Group by the category field
                    count: { $sum: 1 } // Count documents in each group
                }
            },
            {
                $project: {
                    category: '$_id', // Rename _id to category
                    count: 1,
                    _id: 0 // Exclude the default _id field
                }
            }
        ]),
        ForumPost.countDocuments(),
        ForumComment.countDocuments()
    ];

    // Execute all promises concurrently
    const [
        totalUsers,
        newUsersLast7Days,
        totalResources,
        resourcesByCategory,
        totalForumPosts,
        totalForumComments
    ] = await Promise.all(promises);

    // Structure the data for a clean response
    const stats = {
        userStats: {
            total: totalUsers,
            newLast7Days: newUsersLast7Days,
        },
        resourceStats: {
            total: totalResources,
            byCategory: resourcesByCategory,
        },
        forumStats: {
            totalPosts: totalForumPosts,
            totalComments: totalForumComments,
        },
    };

    res.status(200).json(new ApiResponse(200, stats, "Dashboard analytics fetched successfully."));
});
