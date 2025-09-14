import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'https://digital-mental-health-and-psycholog.vercel.app/api',
  // baseURL: /*process.env.REACT_APP_API_URL || */'http://localhost:5000', // Adjust if your backend URL is different
  headers: {
        'Content-Type': 'application/json'
    },
  withCredentials: true, // Important for sending cookies if you use them for sessions
});

// Interceptor to add the auth token to every request
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

API.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem('authToken');
        
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config; // Return the modified config
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);



/**
 * @desc    Fetches all users with the 'counselor' role.
 * @route   GET /api/appointments/counselors
 */
export const getAvailableCounselors = () => API.get('/appointments');

/**
 * @desc    Creates a new appointment for the logged-in user.
 * @route   POST /api/appointments
 * @param   {object} bookingData - Contains counselor, date, timeSlot, and notes.
 */
// export const bookAppointment = (bookingData) => API.post('/appointments/book', bookingData);
export const bookAppointment = (bookingData) => {
  const { counselor, timeSlot, mode = "Online" } = bookingData;

  // Convert "date + timeSlot" into proper ISO datetime
  const [startTime] = timeSlot.split(" - "); // e.g. "09:00 AM"
  const appointmentTime = new Date(`${date} ${startTime}`).toISOString();

  const payload = {
    counselorId: counselor,
    appointmentTime,
    mode
  };

  return API.post("/appointments/book", payload);
};
/**
 * @desc    Fetches all appointments booked by the current logged-in user.
 * @route   GET /api/appointments/my-bookings
 */
export const getMyBookings = () => API.get('/appointments/my-appointments');

/**
 * @desc    Cancels a specific appointment by its ID.
 * @route   PUT /api/appointments/:bookingId/cancel
 * @param   {string} bookingId - The ID of the appointment to cancel.
 */
export const cancelBooking = (bookingId) => API.put(`/appointments/cancel/${bookingId}`);

// You can add more functions here later, for example:
// export const updateAppointmentStatus = (bookingId, status) => API.put(`/appointments/${bookingId}/status`, { status });
