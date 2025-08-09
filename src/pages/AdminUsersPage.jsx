import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getAllUsers } from "../services/authServices";

export const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await getAllUsers(user.token);
            setUsers(res);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Eventify Users</h1>

            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead className="bg-gray-50 text-sm text-gray-700">
                        <tr>
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Email</th>
                            <th className="py-3 px-4 border-b text-left">Phone</th>
                            <th className="py-3 px-4 border-b text-left">Role</th>
                            <th className="py-3 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {users.length > 0 ? (
                            users.map((u, idx) => (
                                <tr
                                    key={u._id}
                                    className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100`}
                                >
                                    <td className="py-3 px-4 border-b font-medium text-gray-800">{u.name}</td>
                                    <td className="py-3 px-4 border-b">{u.email}</td>
                                    <td className="py-3 px-4 border-b">{u.phone}</td>
                                    <td className="py-3 px-4 border-b capitalize">{u.role}</td>
                                    <td className="py-3 px-4 border-b">

                                        <button
                                            onClick={() => navigate(`/admin/bookings/${u._id}`)}
                                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-500 active:scale-95 transition"
                                        >
                                            View Bookings
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
