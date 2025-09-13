import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import Resources from '../src/pages/Resources';
import Forum from '../src/pages/Forum';
import Booking from '../src/pages/Booking';
import AdminDashboard from '../src/pages/AdminDashboard';
import ResourceDetail from './pages/ResourceDetail.jsx';
import ForumPost from './pages/ForumPost.jsx';
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }





















function App() {
  return (
     <BrowserRouter>
      {/* 2. Wrap all your routes with the AuthProvider */}
      <AuthProvider>
    {/* <Router> */}
      <div className="bg-gray-500 min-h-screen font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
                          <Route path="/resources/:resourceId" element={<ResourceDetail />} />
                          {/* <Route path="/resources/:resourceId" element={<ResourceDetail />} /> */}
                          <Route path="/forum/:postId" element={<ForumPost />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/appointments/book" element={<Booking />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    {/* </Router> */}
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


































// import React from 'react';
// import { BrowserRouter, Route, Routes, Link, useParams } from 'react-router-dom';

// --- Placeholder Components ---
// In a real multi-file application, these would be in their own files.
// For this single-file environment, we define them here to resolve import errors.

// const AuthProvider = ({ children }) => {
//   // This is a mock AuthProvider. In a real app, it would manage auth state.
//   return <>{children}</>;
// };

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-200 dark:bg-gray-700 p-4">
//       <div className="container mx-auto flex gap-4 text-blue-600 dark:text-blue-300">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//         <Link to="/resources" className="hover:underline">Resources</Link>
//         <Link to="/forum" className="hover:underline">Forum</Link>
//         <Link to="/book-appointment" className="hover:underline">Booking</Link>
//         <Link to="/admin" className="hover:underline">Admin</Link>
//       </div>
//     </nav>
//   );
// };

// // Mock Clerk components to allow the code to run
// // const SignedIn = ({ children }) => <div>{children}</div>;
// // const SignedOut = ({ children }) => <div>{children}</div>;
// // const SignInButton = () => <button className="p-2 bg-blue-500 text-white rounded-md cursor-pointer">Sign In</button>;
// // const UserButton = () => <div className="w-8 h-8 bg-gray-400 rounded-full" title="User Profile"></div>;


// // Placeholder Pages
// const Home = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Home Page</h2><p>Welcome to the main page.</p></div>;
// const Login = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Login Page</h2></div>;
// const Register = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Register Page</h2></div>;
// const Dashboard = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>User Dashboard</h2></div>;
// const Resources = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Resources Page</h2></div>;
// const Forum = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Forum Page</h2></div>;
// const Booking = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Book an Appointment</h2></div>;
// const AdminDashboard = () => <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Admin Dashboard</h2></div>;

// const ResourceDetail = () => {
//     const { resourceId } = useParams();
//     return <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Resource Detail: {resourceId}</h2></div>;
// };

// const ForumPost = () => {
//     const { postId } = useParams();
//     return <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h2>Forum Post: {postId}</h2></div>;
// };


// // --- Main App Component ---

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
//           <header className="bg-white dark:bg-gray-800 shadow-md">
//             <div className="container mx-auto flex justify-between items-center p-4">
//                 <h1 className="text-xl font-bold">My App</h1>
//                 <div>
//                     <SignedOut>
//                       <SignInButton />
//                     </SignedOut>
//                     <SignedIn>
//                         <UserButton afterSignOutUrl="/" />
//                     </SignedIn>
//                 </div>
//             </div>
//           </header>
          
//           <Navbar />

//           <main className="container mx-auto px-4 py-8">
//             <Routes>
//               {/* Public routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/resources" element={<Resources />} />
//               <Route path="/resources/:resourceId" element={<ResourceDetail />} />
//               <Route path="/forum" element={<Forum />} />
//               <Route path="/forum/:postId" element={<ForumPost />} />

//               {/* Authentication Routes (if using custom pages) */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
              
//               {/* Protected Routes (would be protected in a real app) */}
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/book-appointment" element={<Booking />} />
//               <Route path="/admin" element={<AdminDashboard />} />
//             </Routes>
//           </main>
//         </div>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }