import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./Buttons/CustomButton";
import InputField from "./InputField";
import { useGlobalContext } from "../context/GlobalContext";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";
import { FaTachometerAlt, FaUserCircle } from "react-icons/fa";

const Header = ({ }) => {
    const navigate = useNavigate();
    const { search, setSearch } = useGlobalContext();
    const { user, logout } = useUser();

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-6 shadow bg-indigo-100 sticky top-0 z-50">
            <button onClick={() => navigate('/')}>
                <Logo />
            </button>
            <div className="min-w-96 flex items-center justify-between">
                <InputField placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="md:w-1/3" />
            </div>

            <div className="flex gap-3">
                {!user ?
                    (<>
                        <CustomButton onClick={() => navigate("/login")} className="bg-blue-600">
                            Login
                        </CustomButton>
                        <CustomButton onClick={() => navigate("/signup")} className="bg-green-600">
                            Signup
                        </CustomButton>
                    </>) :
                    <>
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all duration-200" >
                            <FaTachometerAlt size={18} />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <CustomButton onClick={logout} >
                            Logout
                        </CustomButton>
                        <button
                            onClick={() => navigate("/account")}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                        >
                            <FaUserCircle className="text-blue-600" size={24} />
                            <span className="hidden sm:inline text-gray-700 font-medium">Account</span>
                        </button>

                    </>

                }

            </div>
        </header>
    );
};

export default Header;
