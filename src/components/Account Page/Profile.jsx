import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { getUserProfile } from '../../services/authServices';

export const Profile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.token) return;
            try {
                const profile = await getUserProfile(user.token);
                setUserData(profile);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        );
    }

    const displayUser = userData || user;

    if (!displayUser) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <p className="text-gray-500 text-lg">No profile data found</p>
            </div>
        );
    }

    return (
        <div className="py-10 flex justify-center items-center bg-gradient-to-tr from-blue-50 to-blue-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                        {displayUser.name?.charAt(0) || 'U'}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">{displayUser.name}</h2>
                    <p className="text-gray-500 text-sm">{displayUser.email}</p>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <FaUser className="text-blue-600" size={18} />
                        <span className="text-gray-700 font-medium">{displayUser.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaPhone className="text-blue-600" size={18} />
                        <span className="text-gray-700">{displayUser.phone || "No phone number added"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-blue-600" size={18} />
                        <span className="text-gray-700">{displayUser.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
