import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { AuthenticationLayout } from "../layouts/AuthenticationLayout";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

export const Register = () => {
    const navigate = useNavigate();
    const { signup } = useUser()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user"
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateFormData(formData);
        if (error) return toast.error(error)
        try {
            await signup(formData);
            toast.success('user logged in')
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    const validateFormData = ({ name, email, phone, password }) => {
        if (!name || !email || !phone || !password) {
            return "Please fill in all fields.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email.";
        }

        if (!/^\d{10}$/.test(phone)) {
            return "Please enter a valid 10-digit phone number.";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }

        return null; // No error
    };


    return (
        <AuthenticationLayout>
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Hello there 👋</h2>
            <form onSubmit={handleSubmit}>
                <InputField name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
                <InputField name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <InputField name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <InputField name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                    Login
                </button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
                Already have an account? <button onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">Login</button>
            </p>
        </AuthenticationLayout>
    );
};
