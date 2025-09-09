import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// // 1. Import the necessary components
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* 2. Wrap your App with the BrowserRouter */}
//     <BrowserRouter>
//       {/* 3. Wrap your App with the AuthProvider */}
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );