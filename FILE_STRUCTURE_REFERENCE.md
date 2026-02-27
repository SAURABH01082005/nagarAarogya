# Complete File Structure & References

## Backend Structure

### 📁 backend/index.js
**Main Express Server Entry Point**
- Initializes Express app
- Sets up middleware (CORS, JSON parsing)
- Mounts auth routes
- Starts server on port 5000

**Key Code:**
```javascript
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);
app.listen(PORT);
```

---

### 📁 backend/config/firebase.js
**Firebase Admin SDK Configuration**
- Initializes Firebase Admin SDK
- Sets up authentication service
- Configures Firestore database

**Exports:**
- `auth` - Firebase Auth instance
- `db` - Firestore database instance
- Default admin module

---

### 📁 backend/config/firestore.js
**Firestore Database Operations**
- User profile CRUD operations
- Query functions for users
- Database helper functions

**Key Functions:**
- `verifyIdToken()` - Verify Firebase tokens
- `getUserProfile()` - Get user data from Firestore
- `createUserProfile()` - Create new user profile
- `updateUserProfile()` - Update existing profile
- `getUsersByRole()` - Query users by role

---

### 📁 backend/middleware/authMiddleware.js
**Authentication Middleware**
- Verifies ID tokens from requests
- Extracts user info from tokens
- Role-based access control

**Exports:**
- `authMiddleware` - Verify token middleware
- `roleMiddleware` - Check user role

---

### 📁 backend/controllers/authController.js
**Authentication Logic & Endpoints**
- User registration handling
- Login verification
- Profile management
- Token verification

**Key Functions:**
- `register()` - Create new user
- `login()` - Verify login token
- `getCurrentUser()` - Get user profile
- `updateProfile()` - Update user info
- `logout()` - Logout handler

---

### 📁 backend/routes/auth.js
**API Route Definitions**
- Public routes: register, login
- Protected routes: profile, settings

**Routes:**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me (protected)
PUT    /api/auth/profile (protected)
POST   /api/auth/logout (protected)
```

---

### 📁 backend/package.json
**Backend Dependencies**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "firebase-admin": "^12.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

---

### 📁 backend/.env.example
**Environment Variable Template**
```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
PORT=5000
```

---

## Frontend Structure

### 📁 frontend/src/config/firebase.js
**Firebase Client Configuration**
- Initializes Firebase for web
- Sets up Auth service
- Sets up Firestore

**Exports:**
- `auth` - Firebase Auth instance
- `db` - Firestore instance
- `app` - Firebase app instance

---

### 📁 frontend/src/context/AuthContext.jsx
**Global Authentication State**
- React Context for auth state
- useAuth() hook for components
- Auth state management

**useAuth() Hook Returns:**
- `user` - Current user object
- `loading` - Loading state
- `error` - Error message
- `isAuthenticated` - Boolean
- `register()` - Registration function
- `login()` - Login function
- `logout()` - Logout function
- `getIdToken()` - Get auth token

---

### 📁 frontend/src/components/Login.jsx
**Login Page Component**
- Email/password input
- Error messages
- Loading state
- Links to register page

**Features:**
- Form validation
- Firebase authentication
- Error handling
- Responsive design
- Loading button state

---

### 📁 frontend/src/components/Login.css
**Login Page Styling**
- Gradient background
- Form styling
- Button animations
- Responsive layout
- Role badges

---

### 📁 frontend/src/components/Register.jsx
**Registration Page Component**
- Registration form with fields
- Role selection dropdown
- Role-specific fields
- Form validation
- Error handling

**Form Fields:**
- Full Name
- Email
- Phone
- Password
- Confirm Password
- Role (Patient/Doctor/Admin)
- Specialization (Doctor only)
- License Number (Doctor only)

---

### 📁 frontend/src/components/Register.css
**Registration Page Styling**
- Form styling
- Scrollable container
- Input styling
- Button animations
- Responsive layout

---

### 📁 frontend/src/components/Dashboard.jsx
**Role-Based Dashboard**
- Shows different content by role
- Patient: appointments, records
- Doctor: patients, schedule
- Admin: users, settings
- Logout functionality

**Features:**
- Role-specific cards
- Quick action buttons
- User information display
- Logout capability

---

### 📁 frontend/src/components/Dashboard.css
**Dashboard Styling**
- Header with gradient
- Grid layout for cards
- Card animations
- User info section
- Responsive design

---

### 📁 frontend/src/components/ProtectedRoute.jsx
**Route Protection Wrapper**
- Checks authentication status
- Checks user role
- Shows loading state
- Redirects unauthorized users

**Exports:**
- `<ProtectedRoute>` - General protection
- `<RoleBasedRoute>` - Role-specific protection

---

### 📁 frontend/src/components/Unauthorized.jsx
**Unauthorized Access Page**
- 403 error display
- Error message
- Navigation buttons
- Professional design

---

### 📁 frontend/src/components/Unauthorized.css
**Unauthorized Page Styling**
- Centered layout
- Error display
- Button styling
- Responsive design

---

### 📁 frontend/src/components/Header.jsx
**Navigation Header (Updated)**
- Logo with home link
- Auth state display
- Login/Register buttons
- Dashboard/Logout buttons
- User name display

**Features:**
- Dynamic navigation based on auth
- Role badge display
- Responsive design
- Logout functionality

---

### 📁 frontend/src/css/header.css
**Header Styling (Updated)**
- Header layout
- Navigation styling
- Button styles
- Auth-specific colors
- Responsive design

---

### 📁 frontend/src/components/Home.jsx
**Home Page (Updated)**
- Role cards with auth check
- Handles login redirect
- Shows user role status
- Register link for new users

**Features:**
- Authentication check
- Role-based button states
- Login redirect
- Register link

---

### 📁 frontend/src/App.jsx
**Main App Component (Updated)**
- AuthProvider setup
- Route definitions
- Protected routes
- Role-based routes
- Error handling

**Routes:**
```
/              - Home (public)
/login         - Login (public)
/register      - Register (public)
/dashboard     - Dashboard (protected)
/patient       - Patient page (protected, patient only)
/doctor        - Doctor page (protected, doctor only)
/admin         - Admin page (protected, admin only)
/unauthorized  - Unauthorized (public)
```

---

### 📁 frontend/.env.local
**Frontend Environment Variables**
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:5000/api
```

---

### 📁 frontend/package.json
**Frontend Dependencies (Updated)**
```json
{
  "dependencies": {
    "firebase": "^10.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.10.1",
    "tailwindcss": "^4.2.1"
  }
}
```

---

## Documentation Files

### 📋 AUTHENTICATION_SETUP.md
**Detailed Setup & Configuration Guide**
- Complete setup instructions
- Firebase configuration steps
- Backend & frontend setup
- API endpoint documentation
- Security notes
- Troubleshooting guide

---

### 📋 QUICK_START.md
**Quick Reference Guide**
- 5-minute quick setup
- Key routes reference
- Test accounts info
- Common issues & fixes
- ProTips for development

---

### 📋 IMPLEMENTATION_SUMMARY.md
**Overview of Implementation**
- Files created listing
- Features implemented
- Configuration required
- Testing instructions
- Next steps

---

## Configuration Files

### 🔐 .env (Backend)
```
FIREBASE_PROJECT_ID=your-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email
FIREBASE_CLIENT_ID=your-client-id
PORT=5000
```

---

### 🔐 .env.local (Frontend)
```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5000/api
```

---

## Component Import Structure

### AuthContext Usage
```javascript
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// In components:
const { user, login, register, logout, isAuthenticated } = useAuth();
```

---

### Protected Routes Usage
```javascript
import { ProtectedRoute, RoleBasedRoute } from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor"
  element={
    <RoleBasedRoute allowedRoles={["doctor"]}>
      <Doctor />
    </RoleBasedRoute>
  }
/>
```

---

## Data Flow Diagram

```
User Input (Login/Register)
         ↓
   React Component
         ↓
   Firebase Auth (Client)
         ↓
   Firebase Servers
         ↓
   ID Token Generated
         ↓
   AuthContext Updated
         ↓
   Protected Routes Check Auth
         ↓
   Dashboard / Role Page Rendered
```

---

## Complete File Tree

```
nagarArogya/
├── backend/
│   ├── config/
│   │   ├── firebase.js
│   │   └── firestore.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Register.jsx
│   │   │   ├── Register.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Unauthorized.jsx
│   │   │   ├── Unauthorized.css
│   │   │   ├── Header.jsx (updated)
│   │   │   ├── Home.jsx (updated)
│   │   │   ├── Doctor.jsx
│   │   │   ├── Patient.jsx
│   │   │   └── admin.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── config/
│   │   │   └── firebase.js
│   │   ├── css/
│   │   │   ├── header.css (updated)
│   │   │   ├── Footer.css
│   │   │   └── common.css
│   │   ├── App.jsx (updated)
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json (updated)
│   ├── vite.config.js
│   └── index.html
│
├── AUTHENTICATION_SETUP.md
├── QUICK_START.md
├── IMPLEMENTATION_SUMMARY.md
└── FILE_STRUCTURE_REFERENCE.md (this file)
```

---

## Quick Reference Commands

### Start Backend
```bash
cd backend
npm install
npm run dev
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Check Logs
```bash
# Backend console shows Firebase operations
# Frontend DevTools shows auth state changes
```

---

**Last Updated:** February 26, 2026
