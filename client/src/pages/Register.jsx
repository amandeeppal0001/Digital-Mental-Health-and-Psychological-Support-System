// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../services/authService';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'student' // Default role
//     });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const { name, email, password } = formData;

//     const onChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !email || !password) {
//             return setError('Please fill in all fields.');
//         }
//         if (password.length < 6) {
//             return setError('Password must be at least 6 characters.');
//         }

//         setLoading(true);
//         setError('');
        
//         try {
//             // We only need to send the necessary fields to the backend
//             const userData = { name, email, password, role: 'student' };
//             await registerUser(userData);
            
//             // On successful registration, redirect to the login page
//             navigate('/login');

//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
//             setError(errorMessage);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
                
//                 {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded">{error}</p>}
                
//                 <form className="space-y-6" onSubmit={onSubmit}>
//                     <div>
//                         <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             name="fullName"
//                             value={name}
//                             onChange={onChange}
//                             required
//                             className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="John Doe"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={email}
//                             onChange={onChange}
//                             required
//                             className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="you@example.com"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password"className="text-sm font-semibold text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={password}
//                             onChange={onChange}
//                             required
//                             minLength="6"
//                             className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="••••••••"
//                         />
//                     </div>
                    
//                     <div>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
//                         >
//                             {loading ? 'Creating Account...' : 'Register'}
//                         </button>
//                     </div>
//                 </form>
//                 <div className="text-center">
//                     <p className="text-sm text-gray-600">
//                         Already have an account?{' '}
//                         <Link to="/login" className="font-semibold text-blue-600 hover:underline">
//                             Login here
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student' // Default role
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { name, email, password, role } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return setError('Please fill in all fields.');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }

        setLoading(true);
        setError('');
            
        try {
            const userData = { name, email, password, role };
            await registerUser(userData);
            navigate('/login');
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h2>

                {error && (
                    <p className="text-center text-red-500 bg-red-100 p-3 rounded">
                        {error}
                    </p>
                )}

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={onChange}
                            required
                            minLength="6"
                            className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Role selection */}
                    <div>
                        <span className="text-sm font-semibold text-gray-700">Role</span>
                        <div className="flex flex-col space-y-2 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={role === 'student'}
                                    onChange={onChange}
                                    className="form-radio"
                                />
                                <span>Student</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={onChange}
                                    className="form-radio"
                                />
                                <span>Admin</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="counselor"
                                    checked={role === 'counselor'}
                                    onChange={onChange}
                                    className="form-radio"
                                />
                                <span>Counselor</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
