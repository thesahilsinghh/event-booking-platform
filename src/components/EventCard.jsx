import { useNavigate } from "react-router-dom";
import { noImagePreview } from "../assets/data";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const imageLink = event.image || noImagePreview;

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => navigate(`/event/${event._id}`)}
        >
            <div className="relative h-52 w-full">
                <img
                    src={imageLink}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {event.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    ₹{event.price} • {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="mt-1 text-sm text-gray-600 truncate">
                    {event.venue}
                </p>
            </div>
        </div>
    );
};

export default EventCard;
