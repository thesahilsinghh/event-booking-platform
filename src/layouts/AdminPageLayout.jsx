import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

import React from 'react'

export const AdminPageLayout = () => {

    return (
        <div className="flex">

            <Sidebar className="fixed top-0 left-0 h-screen" />

            <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}