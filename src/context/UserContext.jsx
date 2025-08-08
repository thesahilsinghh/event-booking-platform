import { jwtDecode } from "jwt-decode";
import { login, register } from "../services/authServices";
import { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();
export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("event-token");
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ ...decoded, token });
        }
    }, []);

    const loginUser = async (email, password) => {
        const res = await login({ email, password })
        localStorage.setItem("event-token", res.token);
        setUser(res);
    };
    const signup = async (userData) => {
        const res = await register(userData);
        localStorage.setItem("event-token", res.token);
        setUser(res);
    };


    const logout = () => {
        localStorage.removeItem("event-token");
        setUser(null);
    };

    const value = {
        user,
        setUser,
        loginUser,
        signup,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
