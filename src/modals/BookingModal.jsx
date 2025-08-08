import React, { useState } from "react";
import InputField from "../components/InputField";

const BookingModal = ({ onClose, onConfirm, eventInfo }) => {
    const [seats, setSeats] = useState(1);
    const { title, category, date, time, venue, description, price, totalSeats, bookedSeats, } = eventInfo;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-4">{category.toUpperCase()}</p>

                <div className="space-y-1 text-sm">
                    <p><strong>Date:</strong> {new Date(date).toDateString()}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Venue:</strong> {venue}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Price:</strong> ₹{price}</p>
                    <p><strong>Total Seats:</strong> {totalSeats}</p>
                    <p><strong>Remaining Seats:</strong> {totalSeats - bookedSeats}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                    <InputField
                        type="number"
                        min={1}
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    onClick={() => onConfirm(seats)}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BookingModal;
