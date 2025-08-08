const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-5">
            <h2 className="text-xl font-bold mb-5">Dashboard</h2>
            <ul className="space-y-4">
                <li className="hover:text-gray-300 cursor-pointer">Overview</li>
                <li className="hover:text-gray-300 cursor-pointer">Users</li>
                <li className="hover:text-gray-300 cursor-pointer">Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
