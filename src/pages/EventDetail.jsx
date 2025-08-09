import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingModal from "../modals/BookingModal";
import { useEvents } from "../context/EventContext";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { noImagePreview } from "../assets/data";

const EventDetail = () => {
    const { id } = useParams();
    const { events, bookSeats } = useEvents();
    const [event, setEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate()
    useEffect(() => {
        if (id && events.length > 0) {
            const eventInfo = events.find((event) => event._id === id);
            setEvent(eventInfo);
        }
    }, [id, events]);

    const handleBooking = async (seatCount) => {
        if (seatCount <= 0) return toast.error('Please select one seat for booking')
        try {
            await bookSeats(id, seatCount);
            toast.success('Seats booked successfully')
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed");
        }
        setShowModal(false);
    };

    if (!event) return <div className="p-6 text-center text-gray-600">Loading event...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <img
                src={event.image || noImagePreview}
                alt={event.title}
                className="w-full h-96 object-cover rounded-lg shadow-sm"
            />


            {/* Info */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
                <p className="text-gray-600 mt-2 leading-relaxed">{event.description}</p>

                <div className="mt-4 space-y-2 text-gray-700">
                    <p><span className="font-semibold">Venue:</span> {event.venue}</p>
                    <p><span className="font-semibold">Category:</span> {event.category}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {event.time}</p>
                    <p><span className="font-semibold">Price:</span> ₹{event.price}</p>
                    <p><span className="font-semibold">Available Seats:</span> {event.totalSeats - event.bookedSeats?.length}</p>
                </div>

                <button
                    onClick={() => user ? navigate('/seat-booking/' + event._id) : navigate('/login')}
                    className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
                >
                    Book Now
                </button>
            </div>

            {showModal && (
                <BookingModal
                    eventInfo={event}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleBooking}
                    event={event}
                />
            )}
        </div>
    );
};

export default EventDetail;
