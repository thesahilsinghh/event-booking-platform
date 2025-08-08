import { useState, useEffect } from "react";

export const EventForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        category: "",
        price: "",
        rows: "",
        cols: "",
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto space-y-4 my-7"
        >
            <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit Event" : "Add New Event"}
            </h2>

            {/* Image */}
            <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            {/* Title */}
            <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border rounded px-3 py-2"
                ></textarea>
            </div>

            {/* Date & Time */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date?.slice(0, 10) || ""}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold mb-1">Time</label>
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="e.g. 10:00 AM"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
            </div>

            {/* Venue */}
            <div>
                <label className="block font-semibold mb-1">Venue</label>
                <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            {/* Category */}
            <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select Category</option>
                    <option value="conference">Conference</option>
                    <option value="concert">Concert</option>
                    <option value="workshop">Workshop</option>
                    <option value="festival">Festival</option>
                </select>
            </div>

            {/* Price & Seating Grid */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block font-semibold mb-1">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold mb-1">Rows</label>
                    <input
                        type="number"
                        name="rows"
                        value={formData.rows}
                        onChange={handleChange}
                        placeholder="e.g. 10"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold mb-1">Columns</label>
                    <input
                        type="number"
                        name="cols"
                        value={formData.cols}
                        onChange={handleChange}
                        placeholder="e.g. 12"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
                {isEditing ? "Update Event" : "Add Event"}
            </button>
        </form>
    );
};
