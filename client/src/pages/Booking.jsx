import React, { useState, useEffect } from 'react';
import { getAvailableCounselors, bookAppointment, getMyBookings, cancelBooking } from '../services/appointmentService';

// Pre-defined time slots for simplicity. This could also be fetched from the backend in a more advanced version.
const timeSlots = [
    '09:00 AM - 09:45 AM',
    '10:00 AM - 10:45 AM',
    '11:00 AM - 11:45 AM',
    '02:00 PM - 02:45 PM',
    '03:00 PM - 03:45 PM',
];

const Booking = () => {
    const [counselors, setCounselors] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [formData, setFormData] = useState({
        counselor: '',
        date: '',
        timeSlot: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch initial data (counselors and existing bookings) when the component mounts
    const fetchInitialData = async () => {
        try {
            const counselorsRes = await getAvailableCounselors();
            const bookingsRes = await getMyBookings();
            setCounselors(counselorsRes.data);
            setMyBookings(bookingsRes.data);
        } catch (err) {
            setError('Failed to load data. Please refresh the page.');
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);
    
    const { counselor, date, timeSlot, notes } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
        if (!counselor || !date || !timeSlot) {
            return setError('Please select a counselor, date, and time slot.');
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await bookAppointment(formData);
            setSuccess('Appointment booked successfully! Your bookings have been updated below.');
            // Reset form and refetch bookings to show the new appointment
            setFormData({ counselor: '', date: '', timeSlot: '', notes: '' });
            const bookingsRes = await getMyBookings();
            setMyBookings(bookingsRes.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed. The time slot may be unavailable.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleCancel = async (bookingId) => {
        // A custom modal would be better than window.confirm, but this works for now.
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await cancelBooking(bookingId);
                setSuccess('Appointment successfully cancelled.');
                 // Refetch bookings to update the list
                 const bookingsRes = await getMyBookings();
                 setMyBookings(bookingsRes.data);
            } catch(err){
                setError(err.response?.data?.message || 'Failed to cancel the appointment.');
            }
        }
    };
    
    // Helper function to apply color coding to the appointment status
    const getStatusColor = (status) => {
        switch(status) {
            case 'Scheduled': return 'text-blue-600 bg-blue-100';
            case 'Completed': return 'text-green-600 bg-green-100';
            case 'Cancelled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Book an Appointment</h1>
            
            {/* Booking Form Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">New Appointment</h2>
                {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
                {success && <p className="text-center text-green-500 bg-green-100 p-3 rounded mb-4">{success}</p>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="counselor" className="block text-sm font-medium text-gray-700">Select Counselor</label>
                        <select id="counselor" name="counselor" value={counselor} onChange={onChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option value="">-- Choose a counselor --</option>
                            {counselors.map(c => <option key={c._id} value={c._id}>{c.fullName}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
                        <input type="date" id="date" name="date" value={date} onChange={onChange} min={new Date().toISOString().split("T")[0]} className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
                    </div>
                     <div>
                        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Select Time Slot</label>
                        <select id="timeSlot" name="timeSlot" value={timeSlot} onChange={onChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                             <option value="">-- Choose a time --</option>
                             {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
                        <textarea id="notes" name="notes" value={notes} onChange={onChange} rows="3" className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" placeholder="Anything you'd like the counselor to know beforehand?"></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
                        {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
            
            {/* My Bookings List Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Appointments</h2>
                 <div className="space-y-4">
                    {myBookings.length > 0 ? (
                        myBookings.map(booking => (
                            <div key={booking._id} className="border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">Counselor: {booking.counselor.fullName}</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">Time: {booking.timeSlot}</p>
                                </div>
                                <div className="flex items-center mt-3 sm:mt-0">
                                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                    {booking.status === 'Scheduled' && (
                                        <button onClick={() => handleCancel(booking._id)} className="ml-4 text-sm text-red-600 hover:underline">Cancel</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">You have no upcoming appointments.</p>
                    )}
                 </div>
            </div>

        </div>
    );
};

export default Booking;

