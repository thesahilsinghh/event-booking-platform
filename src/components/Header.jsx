import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Buttons/CustomButton";
import InputField from "./InputField";
import { useGlobalContext } from "../context/GlobalContext";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";

const Header = ({ }) => {
    const navigate = useNavigate();
    const { search, setSearch } = useGlobalContext();
    const { user, logout } = useUser();

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 shadow bg-indigo-100 sticky top-0 z-50">
            <button onClick={() => navigate('/')}>
                <Logo />
            </button>
            <div className="min-w-96">
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
                    <CustomButton onClick={logout} >
                        Logout
                    </CustomButton>}
            </div>
        </header>
    );
};

export default Header;
