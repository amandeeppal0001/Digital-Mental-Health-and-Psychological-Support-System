// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const { email, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // const onSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     // It's good practice to set a base URL for axios in a separate config file,
//   //     // but for simplicity, we'll keep it here.
//   //     const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//   //     // localStorage.setItem('token', res.data.token);
//   //     console.log('Server Response:', res); 
//   //     // localStorage.setItem('authToken', res.data.token);
//   //     localStorage.setItem('authToken', res.data.data.accessToken);
//   //     navigate('/dashboard');
      
//   //   } catch (err) {
//   //     setError(err.response?.data?.msg || 'An error occurred');
//   //     console.error(err.response?.data);
//   //   }
//   // };


// const onSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
    
//     try {
//       // It's better to use your service function for consistency
//       const res = await loginUser(formData);

//       console.log('Server Response:', res.data); 

//       // Check if the expected data exists in the response
//       if (res.data && res.data.data && res.data.data.accessToken) {
        
//         // Destructure the token and user object from the response
//         const { accessToken, user } = res.data.data;
        
//         // 1. Use the login function from your AuthContext 
//         //    (This saves the token to localStorage and updates the global state)
//         Login(accessToken);
        
//         // 2. Navigate based on the user's role
//         if (user.role === 'admin') {
//           navigate('/dashboard');
//         } else if (user.role === 'student') {
//           navigate('/resources');
//         } else {
//           // Default navigation for any other roles
//           navigate('/'); 
//         }

//       } else {
//         setError('Login failed: Invalid data received from server.');
//       }
      
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//       console.error(err.response?.data);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <form onSubmit={onSubmit}>
//         <div className="mb-4">
//           <label htmlFor="userEmail" className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             id="userEmail"
//             value={email}
//             onChange={onChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             autoComplete="email" 
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="userPassword"  className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="userPassword"
//             value={password}
//             onChange={onChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
//         >
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center text-gray-600">
//         Don't have an account?{' '}
//         <Link to="/register" className="text-blue-600 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;




















import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// REMOVE: import axios from 'axios';

// ✅ 1. ADD: Import the service function and the auth hook
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext.jsx';

 
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // ✅ 2. ADD: Call the useAuth hook to get the login function
  const { login } = useAuth();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await loginUser(formData);

      console.log('Server Response:', res.data); 

      if (res.data && res.data.data && res.data.data.accessToken) {
        
        const { accessToken, user } = res.data.data;
        
        // ✅ 3. FIX: Call the lowercase 'login' function from the context
        login(accessToken);
        
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else if (user.role === 'student') {
          navigate('/resources');
        } else {
          navigate('/'); 
        }

      } else {
        setError('Login failed: Invalid data received from server.');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={onSubmit}>
        {/* ... rest of your JSX form ... */}
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id="userEmail"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="email" 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="userPassword"  className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="userPassword"
            value={password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;