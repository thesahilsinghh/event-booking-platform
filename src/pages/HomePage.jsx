import React, { useState } from "react";
import EventCard from "../components/EventCard";
import { useEvents } from "../context/EventContext";
import { useGlobalContext } from "../context/GlobalContext";

const HomePage = () => {
    const { events } = useEvents();
    const { search } = useGlobalContext();

    // Filter states
    const [filterDate, setFilterDate] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterVenue, setFilterVenue] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // unique categories & venues for dropdowns
    const categories = [...new Set(events.map(e => e.category))];
    const venues = [...new Set(events.map(e => e.venue))];

    // Filtering logic
    const filteredEvents = events
        ?.filter(event =>
            event.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(event =>
            filterDate ? event.date.slice(0, 10) === filterDate : true
        )
        .filter(event =>
            filterCategory ? event.category === filterCategory : true
        )
        .filter(event =>
            filterVenue ? event.venue === filterVenue : true
        )
        .filter(event =>
            maxPrice ? event.price <= Number(maxPrice) : true
        );

    return (
        <div className="p-6 space-y-6">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow">
                {/* Date Filter */}
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                {/* Category Filter */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Venue Filter */}
                <select
                    value={filterVenue}
                    onChange={(e) => setFilterVenue(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">All Venues</option>
                    {venues.map((venue, i) => (
                        <option key={i} value={venue}>
                            {venue}
                        </option>
                    ))}
                </select>

                {/* Price Filter */}
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                {/* Clear Filters */}
                <button
                    onClick={() => {
                        setFilterDate("");
                        setFilterCategory("");
                        setFilterVenue("");
                        setMaxPrice("");
                    }}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded w-full"
                >
                    Clear Filters
                </button>
            </div>

            {/* Events */}
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
