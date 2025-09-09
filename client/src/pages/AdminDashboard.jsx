import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/analyticsService';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDashboardStats();
                setStats(response.data.data);
            } catch (err) {
                setError('Failed to fetch dashboard data. You may not have access.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!stats) return <div className="p-8 text-center">No data available.</div>;

    return (
        <div className="container mx-auto p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
                    <div className="space-y-2">
                        <p><strong>Total Users:</strong> {stats.userStats.total}</p>
                        <p><strong>New Users (Last 7 Days):</strong> {stats.userStats.newLast7Days}</p>
                    </div>
                </div>

                {/* Resource Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Resource Engagement</h2>
                    <p><strong>Total Resources:</strong> {stats.resourceStats.total}</p>
                    <ul className="list-disc list-inside mt-2">
                       {stats.resourceStats.byCategory.map(cat => (
                           <li key={cat.category}>{cat.category}: {cat.count}</li>
                       ))}
                    </ul>
                </div>

                {/* Forum Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Forum Activity</h2>
                     <div className="space-y-2">
                        <p><strong>Total Posts:</strong> {stats.forumStats.totalPosts}</p>
                        <p><strong>Total Comments:</strong> {stats.forumStats.totalComments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
