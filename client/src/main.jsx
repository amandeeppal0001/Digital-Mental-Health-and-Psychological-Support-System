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
// import { AuthProvider } from './context/AuthContext'; // Import the provider
// import './index.css';


//  import { ClerkProvider } from '@clerk/clerk-react'


// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }





// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* Wrap the entire App component with the AuthProvider */}
//     {/* <AuthProvider>
//       <App />
//     </AuthProvider> */}

//           <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//         <App />
//       </ClerkProvider>

//   </React.StrictMode>,
// );


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