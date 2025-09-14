import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser();
      console.log("Server Response:", res.data);

      logout(); // clear context + localStorage
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded ${
      isActive
        ? "bg-blue-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            MindWell
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 ${isOpen ? "hidden" : "block"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
          <svg
            className={`w-5 h-5 ${isOpen ? "block" : "hidden"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {user ? (
              <>
                <li>
                  <NavLink to="/appointments/book" className={navLinkClass}>
                    Book Appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/resources" className={navLinkClass}>
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/forum" className={navLinkClass}>
                    Forum
                  </NavLink>
                </li>
                {user.role === "admin" && (
                  <li>
                    <NavLink to="/admin" className={navLinkClass}>
                      Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-3 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                </li>
                {/* Dropdown for Register */}
                <li className="relative group">
                  <button className="block py-2 px-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white">
                    Register
                  </button>
                  <ul className="absolute left-0 hidden group-hover:block bg-gray-800 border border-gray-700 rounded-lg mt-1 w-40">
                    <li>
                      <NavLink
                        to="/register"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Student/Admin
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register/counselor"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Counselor
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





































//   import axios from 'axios';
// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ 1. Import the useAuth hook
// import { logoutUser } from '../services/authService';
// // import { Loader2 } from "lucide-react";
// // import { useAuth } from '../context/AuthContext'; 
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   // ✅ 2. Get the global user state and logout function from the context
//   const { user, logout } = useAuth();
//   console.log("Current User in Navbar:", user);

//   // ⛔️ The local state and useEffect for reading localStorage are no longer needed.

//   // const handleLogout = () => {
//   //     // ✅ 3. Call the logout function from the context
//   //     logout();
//   //     // Navigate the user after logging out
//   //     navigate('/login');
//   // };


// // This function assumes 'navigate' is available from the useNavigate hook in your component.
// // Example: const navigate = useNavigate();

// const handleLogout = async (e) => {
//     e.preventDefault();
    
//     try {
     
//      const res= await logoutUser();

//       console.log('Server Response:', res.data); 
//       logout();
     
//       navigate('/')
    
      
//     } catch (err) {
//       console.error(err.response?.data);
//     }
   
//   };


//   const navLinkClass = ({ isActive }) =>
//     `block py-2 px-3 rounded ${
//       isActive
//         ? "bg-blue-700 text-white"
//         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//     }`;

//   return (
//     <nav className="bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link to="/" className="flex items-center space-x-3">
//           <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
//             MindWell
//           </span>
//         </Link>

//         {/* Mobile Menu Button (no changes here) */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className={`w-5 h-5 ${isOpen ? "hidden" : "block"}`}
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//           <svg
//             className={`w-5 h-5 ${isOpen ? "block" : "hidden"}`}
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//             />
//           </svg>
//         </button>

//         {/* Links */}
//         <div
//           className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
//           id="navbar-default"
//         >
//           <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
//             {/* The conditional logic here remains the same, but it's now powered by the global context */}
//             {user ? (
//               <>
//                 <li>
//                   <NavLink to="/appointments/book" className={navLinkClass}>
//                     Book Appointment
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/resources" className={navLinkClass}>
//                     Resources
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/forum" className={navLinkClass}>
//                     Forum
//                   </NavLink>
//                 </li>
//                 {user.role === "admin" && (
//                   <li>
//                     <NavLink to="/admin" className={navLinkClass}>
//                       Dashboard
//                     </NavLink>
//                   </li>
//                 )}
//                 {/* {user.role === 'student' && (
//                                     <li><NavLink to="/book-appointment" className={navLinkClass}>Book Appointment</NavLink></li>
//                                 )} */}

//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left py-2 px-3 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <NavLink to="/login" className={navLinkClass}>
//                     Login
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/register" className={navLinkClass}>
//                     Register
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
