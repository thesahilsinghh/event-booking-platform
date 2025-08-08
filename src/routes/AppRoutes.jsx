import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { Register } from '../pages/Register';
import HomePage from '../pages/HomePage';
import EventDetail from '../pages/EventDetail';
import Layout from '../layouts/Layout';

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path='/admin' element={<Dashboard />} />
            </Route>


            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
