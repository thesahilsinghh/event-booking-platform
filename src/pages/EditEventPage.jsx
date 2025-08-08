import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent, getEventById } from "../services/eventServices";
import { EventForm } from "../components/EventForm";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

export const EditEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const { user } = useUser()

    useEffect(() => {
        async function fetchEvent() {
            try {
                const data = await getEventById(id);
                setEventData(data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }
        fetchEvent();
    }, [id]);

    const handleUpdate = async (data) => {
        try {
            await updateEvent(id, data, user?.token);
            navigate("/admin/events");
            toast.success('Event Updated successfully!')
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    if (!eventData) return <p className="text-center mt-10">Loading...</p>;

    return <EventForm onSubmit={handleUpdate} initialData={eventData} isEditing />;
};