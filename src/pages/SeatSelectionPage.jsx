import React, { useState, useEffect } from "react";
import { getEventById } from "../services/eventServices";
import { bookEvent } from "../services/bookingServices";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const SeatSelectionPage = () => {
    const { eventId } = useParams();
    const { user } = useUser();

    const [event, setEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await getEventById(eventId);
                setEvent(res);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }
        fetchEvent();
    }, [eventId]);

    const handleSeatClick = (seat) => {
        if (seat.isBooked) return;

        setSelectedSeats((prev) =>
            prev.some((s) => s.row === seat.row && s.number === seat.number)
                ? prev.filter((s) => !(s.row === seat.row && s.number === seat.number))
                : [...prev, seat]
        );
    };

    const handleBooking = async () => {
        if (!user) return alert("Please log in first");

        try {
            await bookEvent(eventId, selectedSeats, user.token);
            alert("Booking successful!");
            const updatedEvent = await getEventById(eventId);
            setEvent(updatedEvent);
            setSelectedSeats([]);
        } catch (error) {
            console.error(error);
            alert("Booking failed!");
        }
    };

    const groupedSeats = event
        ? event.seats.reduce((acc, seat) => {
            if (!acc[seat.row]) acc[seat.row] = [];
            acc[seat.row].push(seat);
            return acc;
        }, {})
        : {};

    if (!event) {
        return <p className="p-6">Loading event...</p>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-6">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        <p className="text-gray-600">
                            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <strong>Time:</strong> {event.time}
                        </p>
                        <p className="text-gray-600">
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p className="text-lg font-semibold mt-2">
                            Price: ₹{event.price} per seat
                        </p>
                    </div>
                </div>
            </div>

            {/* Seat Layout */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Select Your Seats</h2>
                <div className="flex flex-col gap-4 items-center">
                    {Object.keys(groupedSeats).map((rowKey) => (
                        <div key={rowKey} className="flex gap-2 justify-center">
                            {groupedSeats[rowKey].map((seat, index) => {
                                const selected = selectedSeats.some(
                                    (s) => s.row === seat.row && s.number === seat.number
                                );

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={seat.isBooked}
                                        className={`w-10 h-10 rounded text-sm font-bold flex items-center justify-center
                                            transition-all duration-200
                                            ${seat.isBooked
                                                ? "bg-red-500 text-white cursor-not-allowed"
                                                : selected
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-300 hover:bg-gray-400"
                                            }
                                        `}
                                    >
                                        {seat.number}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-300 rounded"></div> Available
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded"></div> Selected
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-500 rounded"></div> Booked
                    </div>
                </div>

                {/* Booking Action */}
                <div className="mt-6 text-center">
                    <p className="mb-2">
                        Selected Seats:{" "}
                        {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ") || "None"}
                    </p>
                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectionPage;
