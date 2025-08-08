import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { Register } from '../pages/Register';
import HomePage from '../pages/HomePage';
import EventDetail from '../pages/EventDetail';
import Layout from '../layouts/Layout';
import { AccountPage } from '../pages/AccountPage';
import { AdminPageLayout } from '../layouts/AdminPageLayout';
import { AdminEventsPage } from '../pages/AdminEventsPage';
import { AddEventPage } from '../pages/AddEventPage';
import { EditEventPage } from '../pages/EditEventPage';
import { AdminBookings } from '../pages/AdminBookings';
import SeatSelectionPage from '../pages/SeatSelectionPage';

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='/seat-booking/:eventId' element={<SeatSelectionPage />} />
            </Route>

            <Route path='/admin' element={<AdminPageLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="events/add" element={<AddEventPage />} />
                <Route path="events/edit/:id" element={<EditEventPage />} />
                <Route path="bookings" element={<AdminBookings />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
