// import React, { useEffect, createContext, useContext, useState } from 'react';
// import { useNavigate, MemoryRouter, Routes, Route, Link } from 'react-router-dom';
// import { logoutUser } from '../services/authService';
// // --- Mock AuthContext to make the component self-contained ---
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState({ name: 'Test User' });

//     const logout = async () => {
//         console.log("Logout function called, clearing user.");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// const useAuth = () => useContext(AuthContext);
// // --- End of Mock AuthContext ---

// /**
//  * A component that handles the logout process.
//  */
// const Logout = () => {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//         const performLogout = async () => {
//             await logoutUser();
//             console.log("Redirecting to /login...");
//             navigate('/login');
//         };
//         performLogout();
//     }
//   }, [logout, navigate, user]);

//   return <div className="p-4 text-center text-gray-500">Processing logout...</div>;
// };

// // --- Example Usage Demonstration ---

// const HomePage = () => {
//     const { user } = useAuth();
//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-2">Home Page</h2>
//             {user ? (
//                 <p>Welcome, {user.name}! <Link to="/logout" className="text-blue-500 underline">Logout</Link></p>
//             ) : (
//                 <p>You are logged out. <Link to="/login" className="text-blue-500 underline">Login</Link></p>
//             )}
//         </div>
//     );
// };

// const LoginPage = () => <h2 className="text-xl font-bold">Login Page</h2>;

// // FIX: The <AuthProvider> now wraps the <MemoryRouter> to ensure contexts are provided correctly.
// // The main content of the app is extracted into its own component.
// const AppContent = () => (
//     <div className="p-4 border rounded-lg">
//         <p className="mb-4 p-2 bg-blue-100 rounded">
//             Clicking "Logout" on the Home Page will trigger the Logout component and redirect here to the Login Page.
//         </p>
//         <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/logout" element={<Logout />} />
//         </Routes>
//     </div>
// );


// const App = () => (
//     <AuthProvider>
//         <MemoryRouter initialEntries={['/']}>
//             <AppContent />
//         </MemoryRouter>
//     </AuthProvider>
// );


// export default App;

    












































// // import React, { useEffect, createContext, useContext, useState } from 'react';
// // // FIX: react-router-dom is imported to provide routing context
// // import { useNavigate, MemoryRouter, Routes, Route, Link } from 'react-router-dom';

// // // --- Mock AuthContext to make the component self-contained ---
// // // In your actual app, this would be in its own file (e.g., /context/AuthContext.jsx)
// // const AuthContext = createContext(null);

// // const AuthProvider = ({ children }) => {
// //     const [user, setUser] = useState({ name: 'Test User' }); // Start with a logged-in user

// //     const logout = async () => {
// //         console.log("Logout function called, clearing user.");
// //         setUser(null);
// //     };

// //     return (
// //         <AuthContext.Provider value={{ user, logout }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // // FIX: The useAuth hook is now defined locally within this file.
// // const useAuth = () => useContext(AuthContext);
// // // --- End of Mock AuthContext ---


// // /**
// //  * A component that handles the logout process.
// //  * It doesn't render any UI; its sole purpose is to call the logout function
// //  * and redirect the user to the login page.
// //  */
// // const Logout = () => {
// //   const { logout } = useAuth();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     // Only perform logout if a user exists to prevent loops
// //     if (user) {
// //         const performLogout = async () => {
// //             await logout();
// //             console.log("Redirecting to /login...");
// //             navigate('/login');
// //         };
// //         performLogout();
// //     }
// //   }, [logout, navigate, user]);

// //   return <div className="p-4 text-center text-gray-500">Processing logout...</div>;
// // };

// // // --- Example Usage Demonstration ---
// // // This App component demonstrates how the Logout component works.

// // const HomePage = () => {
// //     const { user } = useAuth();
// //     return (
// //         <div>
// //             <h2 className="text-xl font-bold mb-2">Home Page</h2>
// //             {user ? (
// //                 <p>Welcome, {user.name}! <Link to="/logout" className="text-blue-500 underline">Logout</Link></p>
// //             ) : (
// //                 <p>You are logged out. <Link to="/login" className="text-blue-500 underline">Login</Link></p>
// //             )}
// //         </div>
// //     );
// // };

// // const LoginPage = () => <h2 className="text-xl font-bold">Login Page</h2>;


// // const App = () => (
// //     <MemoryRouter initialEntries={['/']}>
// //         <AuthProvider>
// //              <div className="p-4 border rounded-lg">
// //                 <p className="mb-4 p-2 bg-blue-100 rounded">
// //                     Clicking "Logout" on the Home Page will trigger the Logout component and redirect here to the Login Page.
// //                 </p>
// //                 <Routes>
// //                     <Route path="/" element={<HomePage />} />
// //                     <Route path="/login" element={<LoginPage />} />
// //                     <Route path="/logout" element={<Logout />} />
// //                 </Routes>
// //             </div>
// //         </AuthProvider>
// //     </MemoryRouter>
// // );


// // export default App;












