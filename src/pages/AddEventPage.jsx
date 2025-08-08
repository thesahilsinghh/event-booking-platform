import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventServices";
import { EventForm } from "../components/EventForm";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

export const AddEventPage = () => {
    const navigate = useNavigate();
    const { user } = useUser()

    const handleAdd = async (data) => {
        try {
            await createEvent(data, user.token);
            navigate("/admin/events");
            toast.success('Event added!')
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return <EventForm onSubmit={handleAdd} />;
};
