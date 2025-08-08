import React from "react";
import EventCard from "../components/EventCard";
import { useEvents } from "../context/EventContext";
import { useGlobalContext } from "../context/GlobalContext";

const HomePage = () => {
    const { events } = useEvents();
    const { search } = useGlobalContext();

    const filteredEvents = events?.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {filteredEvents.map((event, index) => (
                <div
                    key={event._id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {index % 2 === 0 ? (
                        <>
                            <EventCard event={event} />
                            <div></div>
                        </>
                    ) : (
                        <>
                            <div></div>
                            <EventCard event={event} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomePage;
