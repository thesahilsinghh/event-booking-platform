import React from "react";
import EventCard from "../components/EventCard";
import { useEvents } from "../context/EventContext";
import { useGlobalContext } from "../context/GlobalContext";

const HomePage = () => {

    const { events } = useEvents();
    const { search } = useGlobalContext()

    const filteredEvents = events?.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {filteredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
