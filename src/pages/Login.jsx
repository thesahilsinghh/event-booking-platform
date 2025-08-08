// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { AuthenticationLayout } from "../layouts/AuthenticationLayout";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useUser()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.error('Please fill in all fields!')
        try {
            await loginUser(email, password);
            toast.success('user logged in')
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <AuthenticationLayout>
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Welcome Back 👋</h2>
            <form onSubmit={handleSubmit}>
                <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                    Login
                </button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
                Don’t have an account? <button onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline">Create new account</button>
            </p>
        </AuthenticationLayout>
    );
};

export default Login;
