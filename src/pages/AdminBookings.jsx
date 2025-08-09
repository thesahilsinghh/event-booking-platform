import React, { useEffect, useState } from 'react';
import { getAllBookings, getAllUserBookings } from '../services/bookingServices';
import { format } from 'date-fns';
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';

export const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const { userId } = useParams(); // <-- get userId from URL

    useEffect(() => {
        async function fetchBookings() {
            try {
                let res = await getAllBookings(user?.token);
                if (userId) {
                    console.log(res)
                    const data = res.filter(booking => booking.user?._id === userId);
                    console.log(data)
                    setBookings(data)
                } else {
                    setBookings(res);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, [user?.token, userId]);

    if (loading) {
        return (
            <div className="p-10 flex justify-center items-center bg-gray-100">
                <p className="text-gray-500 text-lg">
                    {userId ? 'Loading user bookings...' : 'Loading all bookings...'}
                </p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    {userId ? `Bookings for User: ${bookings[0]?.user?.email || userId}` : 'All Bookings'}
                </h2>
                {bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm">
                                    <th className="border p-3 text-left">#</th>
                                    <th className="border p-3 text-left">Event</th>
                                    <th className="border p-3 text-left">User</th>
                                    <th className="border p-3 text-left">Date</th>
                                    <th className="border p-3 text-left">Venue</th>
                                    <th className="border p-3 text-left">Category</th>
                                    <th className="border p-3 text-center">Seats</th>
                                    <th className="border p-3 text-center">Total Price</th>
                                    <th className="border p-3 text-left">Booked On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition">
                                        <td className="border p-3">{index + 1}</td>
                                        <td className="border p-3 font-medium">{booking.event?.title || 'N/A'}</td>
                                        <td className="border p-3">{booking.user?.name || booking.user || 'N/A'}</td>
                                        <td className="border p-3">
                                            {booking.event?.date
                                                ? format(new Date(booking.event.date), 'MMM d, yyyy')
                                                : 'N/A'}
                                        </td>
                                        <td className="border p-3">{booking.event?.venue || 'N/A'}</td>
                                        <td className="border p-3">{booking.event?.category || 'N/A'}</td>
                                        <td className="border p-3 text-center">
                                            {Array.isArray(booking.seatsBooked) && booking.seatsBooked.length > 0
                                                ? booking.seatsBooked.map(seat => `${seat.row}${seat.number}`).join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td className="border p-3 text-center">
                                            ₹{booking.totalPrice || 0}
                                        </td>
                                        <td className="border p-3">
                                            {booking.createdAt
                                                ? format(new Date(booking.createdAt), 'MMM d, yyyy')
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
