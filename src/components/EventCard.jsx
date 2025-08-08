import React from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const hasImage = !!event.image;

    return (
        <div
            className="border p-4 rounded shadow hover:shadow-md cursor-pointer"
            onClick={() => navigate(`/event/${event._id}`)}
        >
            {hasImage ? (
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded"
                />
            ) : (
                <div className="w-full h-48 bg-gray-100 flex flex-col justify-center items-center rounded text-gray-500">
                    <MdOutlineImageNotSupported className="w-8 h-8 mb-1" />
                    <span className="text-sm">Image not available</span>
                </div>
            )}
            <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
            <p className="text-sm text-gray-600">
                ₹{event.price} | {new Date(event.date).toDateString()}
            </p>
        </div>
    );
};

export default EventCard;
