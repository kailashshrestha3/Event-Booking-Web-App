# Eventora - Event Booking Platform

A full-stack event management and booking web application built with MERN stack.

## Features

- User authentication with JWT and OTP email verification
- Browse and book events
- Admin dashboard to manage events and bookings
- Real-time seat availability tracking
- Secure payment status tracking

## Tech Stack

**Frontend:** React.js, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, JWT, Nodemailer

## Prerequisites

- Node.js v14+
- MongoDB Atlas account
- Gmail account (for email verification)

## Installation

### Backend Setup

```bash
cd server
npm install

# Create .env file
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/eventora
JWT_SECRET=your_secret_key
```

### Frontend Setup

```bash
cd client
npm install
```

## Running the Project

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

Backend runs on `http://localhost:5000`  
Frontend runs on `http://localhost:5173`

## Test Credentials

```
Admin:
Email: admin@eventora.com
Password: password123

User:
Email: user@eventora.com
Password: password123
```

## Project Structure

```
Eventora/
├── server/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Database Seeding

```bash
cd server
node seed.js
```

This creates dummy users, events, and bookings for testing.

## Author

**Gokul Shrestha**  
GitHub: [@kailashshrestha3](https://github.com/kailashshrestha3)
