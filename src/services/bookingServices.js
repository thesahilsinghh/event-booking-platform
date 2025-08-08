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

export const getAllUserBookings = async (token) => {
    const res = await axios.get(
        API_URL + '/me',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}
export const getAllBookings = async (token) => {
    const res = await axios.get(
        API_URL + '/',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}

