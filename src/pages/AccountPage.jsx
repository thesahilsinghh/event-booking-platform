import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Profile } from "../components/Account Page/Profile";
import { Booking } from "../components/Account Page/Booking";
import { FaUser, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

export const AccountPage = () => {
    const { user, logout } = useUser();
    const [tab, setTab] = useState(sessionStorage.getItem("account-page") || "profile");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem("account-page", tab);
    }, [tab]);

    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);

    function changeTab(index) {
        if (user) {
            setTab(index);
        } else {
            navigate("/login");
        }
    }

    return (
        <section className="py-5 sm:px-12 px-4 text-gray-800 relative max-w-[1200px] mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center lg:text-left capitalize">
                {tab}
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 min-h-[60vh]">
                {/* Sidebar */}
                <div className="lg:w-[250px] bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 sticky top-24 self-start">
                    <button
                        onClick={() => changeTab("profile")}
                        className={`flex items-center gap-3 w-full px-5 py-4 text-lg font-medium hover:bg-blue-50 transition ${tab === "profile" ? "bg-blue-100 border-l-4 border-blue-500" : ""
                            }`}
                    >
                        <FaUser size={20} />
                        My Profile
                    </button>

                    <button
                        onClick={() => changeTab("bookings")}
                        className={`flex items-center gap-3 w-full px-5 py-4 text-lg font-medium hover:bg-blue-50 transition ${tab === "bookings" ? "bg-blue-100 border-l-4 border-blue-500" : ""
                            }`}
                    >
                        <FaClipboardList size={20} />
                        My Bookings
                    </button>

                    {user && (
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-5 py-4 text-lg font-medium hover:bg-red-50 text-red-600 transition"
                        >
                            <FaSignOutAlt size={20} />
                            Logout
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-lg shadow-md border h-fit border-gray-200 p-6">
                    {tab === "profile" && <Profile />}
                    {tab === "bookings" && <Booking />}
                </div>
            </div>
        </section>
    );
};
