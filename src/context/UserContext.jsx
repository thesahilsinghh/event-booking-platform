import { jwtDecode } from "jwt-decode";
import { getUserProfile, login, register } from "../services/authServices";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("event-token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUser({ ...decoded, token });

                    const userInfo = await getUserProfile(token);
                    if (userInfo) setUserData(userInfo);
                } catch (err) {
                    console.error("Error decoding token or fetching profile:", err);
                    localStorage.removeItem("event-token");
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const loginUser = async (email, password) => {
        try {
            const res = await login({ email, password });
            localStorage.setItem("event-token", res.token);
            const decoded = jwtDecode(res.token);
            setUser({ ...decoded, token: res.token });
            const userInfo = await getUserProfile(res.token);
            setUserData(userInfo);
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    };

    const signup = async (data) => {
        try {
            const res = await register(data);
            localStorage.setItem("event-token", res.token);
            const decoded = jwtDecode(res.token);
            setUser({ ...decoded, token: res.token });
            const userInfo = await getUserProfile(res.token);
            setUserData(userInfo);
        } catch (err) {
            console.error("Signup failed:", err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("event-token");
        setUser(null);
        setUserData({});
    };

    const value = {
        user,
        userData,
        setUser,
        loginUser,
        signup,
        logout,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
