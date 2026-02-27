# NagarArogya - Hospital Management System Authentication Setup

This document provides complete setup instructions for the authentication system implemented in the NagarArogya Hospital Management System.

## 🏥 Overview

The system includes:
- **Firebase Authentication** for user registration and login
- **Role-Based Access Control** (Patient, Doctor, Admin)
- **Protected Routes** that redirect unauthenticated users to login
- **Express Backend** for Firebase integration and token verification
- **Firestore Database** for storing user profiles

---

## 📋 Table of Contents

1. [Backend Setup](#backend-setup)
2. [Frontend Setup](#frontend-setup)
3. [Firebase Configuration](#firebase-configuration)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Features](#features)
7. [Architecture](#architecture)

---

## 🔧 Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Copy `.env.example` to `.env` and fill in your Firebase credentials:
   ```bash
   cp .env.example .env
   ```

4. **Configure Firebase Credentials:**
   
   Add your Firebase Admin SDK credentials to `.env`:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY_ID=your-key-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_CLIENT_ID=your-client-id
   PORT=5000
   ```

   **How to get Firebase Admin SDK credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Copy the JSON credentials to your `.env` file

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

---

## 🎨 Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   Copy `.env.example` to `.env.local` and add your Firebase credentials:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Firebase for Frontend:**
   
   Add your Firebase Web App credentials to `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_API_URL=http://localhost:5000/api
   ```

   **How to get Firebase Web App credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click "Web" icon to add a new app
   - Copy the Firebase config object

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

---

## 🔐 Firebase Configuration

### Setting Up Firebase Project

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication:**
   - In Firebase Console, go to Authentication
   - Click "Get started"
   - Enable "Email/Password" authentication method

3. **Enable Firestore Database:**
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (for development)
   - Create the following collections:
     - `users` (for user profiles)

### Firestore Security Rules (for development):
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow write: if request.auth.uid == uid;
      allow create: if request.auth.uid != null;
    }
  }
}
```

---

## 🚀 Running the Application

### Terminal 1 - Start Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm run dev
```

### Access the application:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "patient|doctor|admin",
  "phone": "1234567890",
  "specialization": "Cardiology" // Only for doctors
}

Response:
{
  "message": "User registered successfully",
  "uid": "user-id",
  "token": "custom-token",
  "user": { ... }
}
```

#### Login User (via Frontend)
```
Frontend calls Firebase directly:
- signInWithEmailAndPassword(auth, email, password)
- Gets ID Token from Firebase
```

#### Verify Login
```
POST /api/auth/login
Content-Type: application/json

{
  "idToken": "firebase-id-token"
}

Response:
{
  "message": "Login successful",
  "user": { ... }
}
```

#### Get Current User Profile
```
GET /api/auth/me
Authorization: Bearer <id-token>

Response:
{
  "user": {
    "uid": "user-id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "patient",
    "phone": "1234567890"
  }
}
```

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer <id-token>
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phone": "9876543210",
  "specialization": "Surgery" // For doctors
}

Response:
{
  "message": "Profile updated successfully"
}
```

---

## ✨ Features

### Authentication Flow
1. **Login Page**: Users enter email and password
2. **Firebase Auth**: Email/password verified by Firebase
3. **Token Generation**: ID token obtained from Firebase
4. **Backend Verification**: Optional verification with backend
5. **Dashboard**: User redirected based on role

### Role-Based Access
- **Patient**: View appointments, medical records, find doctors
- **Doctor**: Manage patients, view appointments, issue prescriptions
- **Admin**: Manage users, hospital settings, view analytics

### Protected Routes
- Unauthenticated users are redirected to login
- Users trying to access wrong role page see "Unauthorized"
- All protected routes check authentication before rendering

### Authentication State Management
- React Context API (`AuthContext`) for global auth state
- Firebase SDK handles token refresh automatically
- Loading state during auth checks

---

## 🏗️ Architecture

### Frontend Structure
```
frontend/src/
├── components/
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page
│   ├── Dashboard.jsx      # Role-based dashboard
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   ├── Header.jsx         # Navigation with auth
│   ├── Home.jsx          # Home page with role buttons
│   ├── Patient.jsx       # Patient dashboard
│   ├── Doctor.jsx        # Doctor dashboard
│   └── admin.jsx         # Admin dashboard
├── context/
│   └── AuthContext.jsx    # Auth state management
├── config/
│   └── firebase.js        # Firebase config
└── css/                   # Stylesheets
```

### Backend Structure
```
backend/
├── config/
│   ├── firebase.js        # Firebase Admin SDK setup
│   └── firestore.js       # Firestore operations
├── controllers/
│   └── authController.js  # Auth logic
├── middleware/
│   └── authMiddleware.js  # Token verification
├── routes/
│   └── auth.js            # Auth endpoints
├── index.js               # Express server
├── package.json
└── .env                   # Environment variables
```

---

## 🔒 Security Notes

1. **Environment Variables**: Store all sensitive data in `.env` files
2. **Firestore Rules**: Use proper security rules in production
3. **CORS**: Configure CORS for your specific domains
4. **Token Expiry**: Implement token refresh logic for long sessions
5. **Password**: Minimum 6 characters (Firebase default)

---

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check Firebase credentials in `.env`
- Verify Firebase project is active
- Ensure Firestore database is created

### Login Not Working
- Check browser console for auth error messages
- Verify email/password are correct
- Ensure user exists in Firebase
- Check Firestore security rules

### Protected Routes Not Working
- Verify AuthProvider wraps entire App
- Check AuthContext is properly imported
- Verify user role matches route requirements

### CORS Errors
- Ensure backend is running on correct port
- Check CORS middleware is enabled in Express
- Verify frontend API URL in environment variables

---

## 📚 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)

---

## 📝 Next Steps

1. Set up production Firestore security rules
2. Implement password reset functionality
3. Add OAuth providers (Google, GitHub, etc.)
4. Set up email verification
5. Implement role management system
6. Add user profile pictures with Firebase Storage
7. Create admin user management panel

---

## 📞 Support

For issues or questions about the authentication system, refer to:
- Firebase Documentation
- React Documentation
- Project README files

---

**Last Updated:** February 26, 2026
