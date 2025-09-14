








































import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // You need to run: npm install jwt-decode

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component that will wrap your entire app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for a token when the app first loads
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Check if the token is expired before setting the user
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
        } else {
          // Token is expired, remove it from storage
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Invalid token found on load:", error);
        localStorage.removeItem('authToken'); // Clear the invalid token
      }
    }
  }, []);

  // Function to handle user login
  // const login = (token) => {
  //   localStorage.setItem('authToken', token);
  //   const decodedUser = jwtDecode(token);
  //   setUser(decodedUser);
  // };

  const login = (token) => {
  localStorage.setItem("authToken", token);
  const decodedUser = jwtDecode(token);
  localStorage.setItem("user", JSON.stringify(decodedUser)); // ✅ add this
  setUser(decodedUser);
};

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create the custom hook that components will use to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};





