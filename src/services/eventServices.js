import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/events'; // replace with your actual backend URL

export const getAllEvents = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createEvent = async (eventData) => {
    const res = await axios.post(API_URL, eventData);
    return res.data;
};

export const getEventById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const updateEvent = async (id, updatedData) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedData);
    return res.data;
};

export const deleteEvent = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
