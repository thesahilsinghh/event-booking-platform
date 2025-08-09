import { FaPlus, FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { deleteEvent, getAllEvents } from "../services/eventServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { useEvents } from "../context/EventContext";

export const AdminEventsPage = () => {

    const { events, removeEvent } = useEvents()
    const { user } = useUser()
    const navigate = useNavigate();


    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId, user.token)
            removeEvent(eventId)
            toast.success('Event deleted successfully!')
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete event! Please try again later')
        }

    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
                <button
                    onClick={() => navigate("/admin/events/add")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 active:scale-95 transition"
                >
                    <FaPlus /> Add Event
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                    <thead className="bg-gray-50 text-sm text-gray-700">
                        <tr>
                            <th className="py-3 px-4 border-b text-left">Image</th>
                            <th className="py-3 px-4 border-b text-left">Title</th>
                            <th className="py-3 px-4 border-b text-left">Description</th>
                            <th className="py-3 px-4 border-b text-left">Date</th>
                            <th className="py-3 px-4 border-b text-left">Time</th>
                            <th className="py-3 px-4 border-b text-left">Venue</th>
                            <th className="py-3 px-4 border-b text-left">Category</th>
                            <th className="py-3 px-4 border-b text-left">Price</th>
                            <th className="py-3 px-4 border-b text-left">Seats (Booked/Total)</th>
                            <th className="py-3 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {events.length > 0 ? (
                            events.map((event, idx) => {
                                const totalSeats = event.seats?.length || 0;
                                const bookedSeats = event.seats?.filter(s => s.isBooked).length || 0;

                                return (
                                    <tr
                                        key={event._id}
                                        className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100`}
                                    >
                                        <td className="py-3 px-4 border-b">
                                            {event.image ? (
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md border border-gray-300">
                                                    <FaImage />
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 border-b font-medium text-gray-800">
                                            {event.title}
                                        </td>
                                        <td className="py-3 px-4 border-b whitespace-normal break-words text-gray-600">
                                            <p className="line-clamp-2">{event.description}</p>
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            {new Date(event.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 border-b">{event.time}</td>
                                        <td className="py-3 px-4 border-b">{event.venue}</td>
                                        <td className="py-3 px-4 border-b capitalize">{event.category}</td>
                                        <td className="py-3 px-4 border-b font-semibold text-gray-700">
                                            ₹{event.price}
                                        </td>
                                        <td className="py-3 px-4 border-b font-medium text-gray-800">
                                            {bookedSeats} / {totalSeats}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => navigate(`/admin/events/edit/${event._id}`)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-500 active:scale-95 transition"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => { handleDeleteEvent(event._id) }}
                                                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-500 active:scale-95 transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="10" className="py-6 text-center text-gray-500">
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
