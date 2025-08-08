import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaCog } from "react-icons/fa";

const Sidebar = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Events", path: "/admin/events", icon: <FaCalendarAlt size={18} /> },
        { name: "Bookings", path: "/admin/bookings", icon: <FaClipboardList size={18} /> },
        { name: "Settings", path: "/admin", icon: <FaCog size={18} /> },
    ];

    return (
        <aside className={`w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col  ${className}`}>
            <div className="p-6 border-b border-gray-700">
                <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-wide">Admin Panel</button>
            </div>
            <ul className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 
                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </li>
                    );
                })}
            </ul>
            <div className='p-4 border-t border-gray-700 text-gray-400 text-sm'>
                © {new Date().getFullYear()} Eventify
            </div>
        </aside>
    );
};

export default Sidebar;
