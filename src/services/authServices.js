// src/services/authService.js
import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_BASE_URL + "/api/auth";

export const login = async (credentials) => {
    const res = await axios.post(`${API_AUTH}/login`, credentials);
    return res.data;
};

export const register = async (userData) => {
    const res = await axios.post(`${API_AUTH}/register`, userData);
    return res.data;
};

export const getUserProfile = async (token) => {
    const res = await axios.get(`${API_AUTH}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
};

export const getAllUsers = async (token) => {
    const res = await axios.get(`${API_AUTH}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
};
