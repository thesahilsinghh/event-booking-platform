# 🎭 Event Management & Seat Booking System

A **full-stack MERN application** for creating, managing, and booking events with an interactive seat selection system.  
This repository contains **both frontend and backend setup instructions** so the same file works in both repos.

---

## 📌 Features

### Frontend

- Browse events with images, details, and categories.
- View event details: date, time, venue, description, price.
- Select seats in an interactive grid.
- Login-required booking flow.
- Admin dashboard:
  - Add, edit, delete events.
  - Track booked seats.
  - Manage Users

### Backend

- RESTful API for event management.
- Seat booking with double-booking prevention.
- MongoDB schema for events, bookings, and users.
- Authentication-ready (JWT).

---

## 🛠 Tech Stack

**Frontend**

- React + React Router
- Tailwind CSS
- Axios

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js for password hashing

---

### Frontend

git clone -> https://github.com/thesahilsinghh/event-booking-platform.git
npm install
npm run dev

### Backend

git clone -> https://github.com/thesahilsinghh/event-management.git
npm install
npm run dev

**Environment Variables**

### Frontend .env

- VITE_API_BASE_URL=http://localhost:2139

### Backend .env

- PORT=2139
- MONGO_URI=mongodb+srv://admin:admin@cluster0.rok9xqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/event
- JWT_SECRET=5696726d089fe84397db71b29b3421a6ff046ca29fa4fdaaf567f8af3d5e4dd1dab10723e7a8b6015ba05556bdbc96a1deb1d6382cc094d4d00be4f1da02a0c7
- FRONTEND_URL=http://localhost:3000
- SALT_ROUNDS=13

API Routes
| Method | Endpoint | Description | Access |
| ------ | ----------- | -------------------------- | ------- |
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Log in and receive a token | Public |
| GET | `/profile` | Get logged-in user profile | Private |
| GET | `/` | Get all users | Admin |

Booking Routes (/api/bookings)
| Method | Endpoint | Description | Access |
| ------ | -------- | ------------------------------- | ------- |
| POST | `/` | Create a new booking | Private |
| GET | `/me` | Get bookings for logged-in user | Private |
| GET | `/` | Get all bookings | Admin |

Event Routes (/api/events)
| Method | Endpoint | Description | Access |
| ------ | -------- | --------------------- | ------ |
| GET | `/` | Get all events | Public |
| GET | `/:id` | Get event by ID | Public |
| POST | `/` | Create a new event | Admin |
| PUT | `/:id` | Update an event by ID | Admin |
| DELETE | `/:id` | Delete an event by ID | Admin |
