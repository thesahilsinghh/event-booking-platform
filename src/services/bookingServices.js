import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/bookings';

export const bookEvent = async (eventId, seats, token) => {
    const res = await axios.post(
        API_URL,
        { eventId, seats },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};