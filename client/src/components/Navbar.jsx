import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

// A simple helper to get user data from localStorage
const getUser = () => {
    try {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    } catch (error) {
        return null;
    }
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();
    
    // This effect listens for changes in localStorage, which is a common pattern
    // for updating UI on auth changes across tabs, though not always necessary.
    // A more robust solution might use a global state (Context API, Redux).
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(getUser());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            setUser(null);
            navigate('/login');
        }
    };

    const navLinkClass = ({ isActive }) => 
        `block py-2 px-3 rounded ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;
    
    return (
        <nav className="bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MindWell</span>
                </Link>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" 
                    aria-controls="navbar-default" 
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    {/* Hamburger Icon */}
                    <svg className={`w-5 h-5 ${isOpen ? 'hidden' : 'block'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
                    {/* Close Icon */}
                    <svg className={`w-5 h-5 ${isOpen ? 'block' : 'hidden'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                </button>
                
                {/* Links */}
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {user ? (
                            <>
                                <li><NavLink to="/resources" className={navLinkClass}>Resources</NavLink></li>
                                <li><NavLink to="/forum" className={navLinkClass}>Forum</NavLink></li>
                                {user.role === 'admin' && (
                                    <li><NavLink to="/admin/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
                                )}
                                <li>
                                    <button onClick={handleLogout} className="block w-full text-left py-2 px-3 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                                <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

