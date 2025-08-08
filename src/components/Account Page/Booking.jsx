import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getAllUserBookings } from '../../services/bookingServices';
import { format } from 'date-fns';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaRupeeSign } from 'react-icons/fa';

export const Booking = () => {
    const { user } = useUser();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            try {
                if (user) {
                    const res = await getAllUserBookings(user?.token);
                    setBookings(res);
                    console.log(res);
                }
            } catch (error) {
                console.log("Error fetching user bookings:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, [user]);

    if (loading) {
        return (
            <div className="p-10 h-full flex justify-center items-center bg-gray-100">
                <p className="text-gray-500 text-lg">Loading your bookings...</p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-gradient-to-tr from-blue-50 to-blue-100">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    My Bookings
                </h2>

                {bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings found.</p>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="border p-5 rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                {/* Event title */}
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {booking.event?.title || 'Event Name'}
                                </h3>

                                {/* Event details */}
                                <div className="mt-2 flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm gap-2">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-blue-600" />
                                        {booking.event?.date
                                            ? format(new Date(booking.event.date), 'MMMM d, yyyy')
                                            : 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                        {booking.event?.venue || 'Unknown venue'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaTicketAlt className="text-blue-600" />
                                        {booking.seatsBooked} seat(s)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaRupeeSign className="text-blue-600" />
                                        {booking.totalPrice}
                                    </div>
                                </div>

                                {/* Category & booking date */}
                                <div className="mt-2 text-gray-500 text-sm flex justify-between">
                                    <span>Category: {booking.event?.category || 'N/A'}</span>
                                    <span>
                                        Booked on:{' '}
                                        {booking.createdAt
                                            ? format(new Date(booking.createdAt), 'MMMM d, yyyy')
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
