# Talksy - Full Stack Chat Application

Talksy is a modern full-stack chat application built with the MERN stack (MongoDB, Express, React, Node.js). It offers real-time messaging, user authentication, and a sleek interface for seamless communication.

## Features

- Real-time messaging using Socket.io
- User authentication and profile management
- One-on-one private conversations
- Responsive design for all devices
- User presence indicators (online/offline)
- Cloudinary integration for avatar uploads
- Secure authentication with JWT


## Tech Stack

**Client:** React, Zustand, Socket.io-client, TailwindCSS

**Server:** Node.js, Express, Socket.io, MongoDB, Mongoose

**Authentication:** JWT (JSON Web Tokens)

**Validation:** ZOD 

**Cloud Storage:** Cloudinary

## Installation

Follow these steps to set up Talksy locally:

1. Clone the repository
```bash
git clone https://github.com/ggarvit16/Talksy-Full-Stack-Chat-App.git
cd Talksy-Full-Stack-Chat-App
```

2. Install dependencies for the root, frontend, and backend
```bash
# Root directory
npm install

# Frontend directory
cd frontend
npm install

# Backend directory
cd ../backend
npm install
```

3. Set up your environment variables in backend directory (see [Environment Variables](#environment-variables) section)

4. Build the project
```bash
# From the root directory
npm run build
```

5. Start the backend server
```bash
# From the backend directory
cd backend
nodemon index.js
```

6. Start the frontend development server
```bash
# From the frontend directory
cd frontend
npm run dev
```

7. Open your browser and navigate to http://localhost:3000 (or the port specified in your frontend setup)

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URL=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```
