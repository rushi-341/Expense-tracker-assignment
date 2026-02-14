📊 Bellcorp Expense Tracker

Full-Stack MERN Application for Personal Expense Management

🚀 Project Overview

Bellcorp Expense Tracker is a scalable full-stack MERN application that allows authenticated users to manage personal expenses efficiently.

The application includes:

Secure JWT Authentication

Full CRUD Transaction Management

Scalable Transaction Explorer with Pagination & Filters

Expense Dashboard with Aggregation

Clean Minimal React UI

🏗 Tech Stack
Frontend

React.js

Axios

React Router

CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT

Bcrypt

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🔐 Features
Authentication

User Registration

User Login

Password hashing using bcrypt

JWT-based protected routes

Transaction Management

Users can:

Add transaction

Edit transaction

Delete transaction

View transaction details

Each transaction contains:

Title

Amount

Category

Date

Notes (optional)

Transaction Explorer

Supports:

Server-side pagination

Dynamic data fetching

Text search (title + notes)

Filter by:

Category

Date range

Amount range

Maintained UI state via query params

Empty state handling

Dashboard

Displays:

Total expense summary

Category-wise breakdown

Recent transactions preview

Implemented using MongoDB aggregation.

🗄 Database Design
Users Collection
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "Hashed String",
  "createdAt": "Date"
}

Transactions Collection
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "String",
  "amount": "Number",
  "category": "String",
  "date": "Date",
  "notes": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}


📂 Project Structure
Backend
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── .env

Frontend
frontend/
│
├── components/
├── pages/
├── context/
├── services/
├── App.jsx
└── index.js

⚙️ Setup Instructions
Clone Repository
git clone https://github.com/your-username/bellcorp-expense-tracker.git
cd bellcorp-expense-tracker

Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


Run backend:

npm run dev

Frontend Setup
cd frontend
npm install


Create .env:

REACT_APP_API_URL=http://localhost:5000


Run frontend:

npm start

🧠 Architectural Decisions

JWT for stateless authentication

Server-side pagination for scalability

MongoDB aggregation for dashboard

Indexed fields for optimized queries

MVC architecture for clean separation

📹 Submission

Hosted frontend (Vercel)

Hosted backend (Render)

MongoDB Atlas

GitHub repository

Demo video explaining:

Architecture

Database design

Backend logic

Explorer functionality

Dashboard aggregation

👨‍💻 Author

Rushi Yalamanchili
MERN Stack Developer