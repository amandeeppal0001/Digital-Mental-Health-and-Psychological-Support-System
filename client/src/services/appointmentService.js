import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: /*process.env.REACT_APP_API_URL || */'http://localhost:5000', // Adjust if your backend URL is different
  withCredentials: true, // Important for sending cookies if you use them for sessions
});

// Interceptor to add the auth token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


/**
 * @desc    Fetches all users with the 'counselor' role.
 * @route   GET /api/appointments/counselors
 */
export const getAvailableCounselors = () => API.get('/appointments/counselors');

/**
 * @desc    Creates a new appointment for the logged-in user.
 * @route   POST /api/appointments
 * @param   {object} bookingData - Contains counselor, date, timeSlot, and notes.
 */
export const bookAppointment = (bookingData) => API.post('/appointments', bookingData);

/**
 * @desc    Fetches all appointments booked by the current logged-in user.
 * @route   GET /api/appointments/my-bookings
 */
export const getMyBookings = () => API.get('/appointments/my-bookings');

/**
 * @desc    Cancels a specific appointment by its ID.
 * @route   PUT /api/appointments/:bookingId/cancel
 * @param   {string} bookingId - The ID of the appointment to cancel.
 */
export const cancelBooking = (bookingId) => API.put(`/appointments/${bookingId}/cancel`);

// You can add more functions here later, for example:
// export const updateAppointmentStatus = (bookingId, status) => API.put(`/appointments/${bookingId}/status`, { status });
