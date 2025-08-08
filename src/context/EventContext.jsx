import { createContext, useContext, useEffect, useState } from "react";
import { getAllEvents } from "../services/eventServices";
import { bookEvent } from "../services/bookingServices";

const EventContext = createContext();
export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const allEvents = await getAllEvents();
            setEvents(allEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const bookSeats = async (id, seats) => {

        const eventData = events.find(event => event._id === id);
        if (!eventData) throw new Error("Event not found");
        const updatedSeats = eventData.bookedSeats + seats;
        const token = localStorage.getItem('event-token');
        const booking = await bookEvent(id, seats, token);
        setEvents(prevEvents => prevEvents.map(event => event._id === id ? { ...event, bookedSeats: updatedSeats } : event));
        return booking
    };

    const value = {
        events,
        setEvents,
        loading,
        refreshEvents: fetchEvents,
        bookSeats,
    };

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
