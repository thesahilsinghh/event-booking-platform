import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">MyDashboard</h1>
            <ul className="flex gap-6">
                <li><a href="#" className="hover:text-blue-500">Home</a></li>
                <li><a href="#" className="hover:text-blue-500">Dashboard</a></li>
                <li><a href="#" className="hover:text-blue-500">Logout</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
