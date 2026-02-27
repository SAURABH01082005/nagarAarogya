# Firebase Web SDK Configuration - Backend Setup

Your backend is now configured to use Firebase Web SDK (same as frontend) instead of Admin SDK. This provides a unified Firebase configuration across your entire application.

---

## 📋 Key Changes

### ✅ Simplified Configuration
- **Old**: Required separate Admin SDK service account JSON
- **New**: Uses standard Firebase Web Config (same as frontend)

### ✅ Updated .env Format
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

PORT=5000
```

### ✅ Register: Now Called from Frontend
**Frontend registers user with Firebase, backend creates profile:**

```javascript
// Frontend: Register & create auth user
const user = await register(email, password, userData);

// Then call backend to create profile
const response = await fetch('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify({
    uid: user.uid,
    email: user.email,
    fullName: userData.fullName,
    role: userData.role,
    phone: userData.phone
  })
});
```

### ✅ Backend Endpoints Updated

#### Register (Create Profile)
```
POST /api/auth/register
Content-Type: application/json

{
  "uid": "user-uid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "patient",
  "phone": "1234567890"
}

Response: 201 Created
{
  "message": "User profile created successfully",
  "user": { ... }
}
```

#### Login (Get Profile)
```
POST /api/auth/login
Content-Type: application/json

{
  "uid": "user-uid"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": { ... }
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <id-token>

Response: 200 OK
{
  "user": { ... }
}
```

---

## 🔄 Updated Authentication Flow

### New Flow (Web SDK):
```
Frontend Input
    ↓
Firebase Auth (Frontend)
    ↓
User Created in Firebase
    ↓
Call Backend /register (create profile)
    ↓
Profile Stored in Firestore
    ↓
Login (get profile from backend)
    ↓
Dashboard
```

### Old Flow (Admin SDK):
```
Frontend Input
    ↓
Call Backend /register
    ↓
Backend creates user in Firebase
    ↓
Backend creates profile
```

---

## 💾 Updated Database Operations

All Firestore operations now use Web SDK methods:

```javascript
// Import from firebase/firestore
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Get document
const userDocRef = doc(db, 'users', uid);
const userDoc = await getDoc(userDocRef);
const data = userDoc.data();

// Set document
await setDoc(userDocRef, { ...data });

// Update document
await updateDoc(userDocRef, { fullName: 'New Name' });

// Query
const q = query(collection, where('role', '==', 'patient'));
const results = await getDocs(q);
```

---

## 🔐 Security Notes

### Frontend-Side Registration
- User creates account directly with Firebase
- Backend only creates profile in Firestore
- This is secure because Firebase handles password encryption

### Token Verification
- Frontend handles token refresh automatically
- Backend receives the ID token in Authorization header
- Token is decoded to extract user UID
- For production, consider adding proper JWT verification

---

## 📦 Dependencies

Updated backend dependencies:
```json
{
  "firebase": "^12.9.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

**Removed:** `firebase-admin` (no longer needed)

---

## 🚀 Setup Instructions

### 1. Copy Firebase Config
From Firebase Console (Project Settings → Your Apps → Copy config):
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### 2. Add to backend/.env
```bash
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. Install Dependencies
```bash
cd backend
npm install
npm run dev
```

### 4. Update Frontend Context
Update `frontend/src/context/AuthContext.jsx` register function:

```javascript
const register = async (email, password, userData) => {
  try {
    // 1. Create auth user with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;

    // 2. Create profile in Firestore via backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        email,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone,
        specialization: userData.specialization
      })
    });

    if (!response.ok) throw new Error('Profile creation failed');
    
    return userCredential.user;
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
};
```

---

## 🧪 Testing

### Test Registration:
```bash
# 1. Frontend registers user with Firebase
# 2. Check backend logs for profile creation
# 3. Verify in Firestore Console → users collection

curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test-uid",
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "patient",
    "phone": "1234567890"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "uid": "test-uid" }'
```

---

## 📊 File Structure

```
backend/
├── config/
│   ├── firebase.js           # Firebase client config
│   └── firestore.js          # Firestore operations
├── controllers/
│   └── authController.js     # Auth endpoints
├── middleware/
│   └── authMiddleware.js     # Token verification
├── routes/
│   └── auth.js               # Route definitions
├── index.js                  # Server entry
├── package.json              # Dependencies
└── .env                      # Firebase config
```

---

## ✅ Advantages of Web SDK for Backend

1. **Unified Configuration** - Same credentials for frontend and backend
2. **Simpler Setup** - No service account JSON needed
3. **Less Overhead** - Smaller package size
4. **Consistent Code** - Same Firebase SDK across app
5. **Easy Migration** - Both frontend and backend use same SDK

---

## ⚠️ Important Notes

1. **Registration is now split**:
   - Frontend: Firebase Auth (user creation)
   - Backend: Firestore (profile creation)

2. **Token Verification**: For production, implement proper JWT verification using `jsonwebtoken` library

3. **User Creation**: No longer possible from backend. Users must be created from frontend.

4. **Initial Firestore Rules**: Make sure your Firestore security rules allow backend access

---

## 🔄 Migration from Admin SDK

If you were using Admin SDK before:

1. ✅ Changed `.env.example` format
2. ✅ Updated `config/firebase.js` to use web SDK
3. ✅ Updated `config/firestore.js` with web SDK methods
4. ✅ Updated `controllers/authController.js` 
5. ✅ Updated `middleware/authMiddleware.js`
6. ✅ Removed `firebase-admin` dependency

---

## 📚 Related Files

- [Frontend Firebase Config](../frontend/src/config/firebase.js)
- [Frontend Auth Context](../frontend/src/context/AuthContext.jsx)
- [Backend Routes](./routes/auth.js)
- [Main Setup Guide](../AUTHENTICATION_SETUP.md)

---

**Last Updated:** February 26, 2026
