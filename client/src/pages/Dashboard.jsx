import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/analyticsService';
import { FiUsers, FiFileText, FiMessageSquare } from 'react-icons/fi'; // Using react-icons for some nice visuals

const StatCard = ({ icon, title, value, label }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {label && <p className="text-xs text-gray-400">{label}</p>}
    </div>
  </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDashboardStats();
                // Check if response is valid JSON, otherwise handle as error
                if (
                    typeof response.data === 'string' &&
                    response.headers &&
                    response.headers['content-type'] &&
                    response.headers['content-type'].includes('text/html')
                ) {
                    // If not authenticated, redirect to login
                    setError('Failed to fetch dashboard data. Server returned HTML instead of JSON. Please check your backend API endpoint and authentication.');
                    setStats(null);
                } else if (response.data && response.data.data) {
                    setStats(response.data.data);
                } else if (response.data) {
                    setStats(response.data);
                } else {
                    setError('No analytics data available.');
                    setStats(null);
                }
            } catch (err) {
                // If unauthorized, redirect to login
                if (err.response && err.response.status === 401) {
                    window.location.href = '/login';
                } else {
                    setError('Failed to fetch dashboard data. You may not have administrative access.');
                    console.error("Dashboard Error:", err);
                }
            } finally {
                setLoading(false);
            }
        };
         
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-600">Loading Dashboard Data...</div>;
    }
    
    if (error) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg max-w-2xl mx-auto mt-10">
                <h2 className="text-xl font-semibold text-red-700">Access Denied</h2>
                <p className="text-red-600 mt-2">{error}</p>
            </div>
        );
    }

    if (!stats) {
        return <div className="p-8 text-center text-gray-500">No analytics data available.</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<FiUsers size={24} className="text-blue-600" />} title="Total Users" value={stats.userStats.total} label={`+${stats.userStats.newLast7Days} in last 7 days`} />
                <StatCard icon={<FiFileText size={24} className="text-green-600" />} title="Total Resources" value={stats.resourceStats.total} />
                <StatCard icon={<FiMessageSquare size={24} className="text-purple-600" />} title="Forum Posts" value={stats.forumStats.totalPosts} label={`${stats.forumStats.totalComments} total comments`} />
            </div>

            {/* Detailed Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resource Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Resources by Category</h2>
                    <div className="space-y-3">
                        {stats.resourceStats.byCategory.length > 0 ? (
                            stats.resourceStats.byCategory.map(cat => (
                                <div key={cat.category} className="flex justify-between items-center">
                                    <span className="text-gray-600">{cat.category}</span>
                                    <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">{cat.count}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No resources have been created yet.</p>
                        )}
                    </div>
                </div>

                {/* Placeholder for future charts */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">User Activity Chart</h2>
                    <p className="text-gray-500">This is a placeholder for a future chart, which could show user sign-ups over time.</p>
                    {/* You would integrate a library like Recharts or Chart.js here */}
                    <div className="w-full h-48 bg-gray-100 mt-4 rounded-lg flex items-center justify-center">
                         <span className="text-gray-400">Chart Area</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

