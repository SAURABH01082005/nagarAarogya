# Firebase Web SDK Configuration - Update Summary

## 📋 What Changed

Your backend has been successfully updated to use **Firebase Web SDK** (same as frontend) instead of Admin SDK. This provides a unified, simpler Firebase configuration across your entire application.

---

## 🔄 Configuration Update

### Before (Admin SDK):
```env
FIREBASE_PROJECT_ID=nagararogya
FIREBASE_PRIVATE_KEY=""
FIREBASE_CLIENT_EMAIL=your-client-email
PORT=5000
```

### After (Web SDK):
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

---

## 📁 Updated Files

### Backend Files

#### 1. `.env.example`
- ✅ Updated to use web Firebase config format
- ✅ Same format as frontend `.env.example`

#### 2. `config/firebase.js`
- ✅ Changed from Admin SDK to Web SDK
- ✅ Uses `initializeApp()`, `getAuth()`, `getFirestore()`
- ✅ Initializes from web config credentials

#### 3. `config/firestore.js`
- ✅ Updated all imports to use web SDK
- ✅ Uses `doc()`, `getDoc()`, `setDoc()`, `updateDoc()`
- ✅ Uses `collection()`, `query()`, `where()`, `getDocs()`

#### 4. `controllers/authController.js`
- ✅ `register()` - Now expects `uid` from frontend (user pre-created in Firebase)
- ✅ `login()` - Takes `uid` instead of `idToken`
- ✅ All functions use Firestore web SDK methods

#### 5. `middleware/authMiddleware.js`
- ✅ Updated token decoding for web SDK
- ✅ Removes auth from imports
- ✅ Uses `getUserProfile()` from firestore.js

#### 6. `package.json`
- ✅ Removed `firebase-admin` dependency
- ✅ Kept `firebase` web SDK
- ✅ Simplified dependencies

### Frontend Files

#### 1. `src/context/AuthContext.jsx`
- ✅ Updated `register()` function
- ✅ Now calls backend `/auth/register` after Firebase auth
- ✅ Removed direct Firestore writes
- ✅ Updated imports (removed `setDoc`)

---

## 🔄 Authentication Flow Changes

### User Registration (New Flow):

```
1. User submits form
   ↓
2. Frontend creates account with Firebase
   (createUserWithEmailAndPassword)
   ↓
3. Get user ID from Firebase
   ↓
4. Call backend POST /api/auth/register
   (with uid, email, fullName, role, etc.)
   ↓
5. Backend creates user profile in Firestore
   ↓
6. User logged in and redirected to dashboard
```

### User Login (Similar):
```
1. Frontend authenticates with Firebase
   (signInWithEmailAndPassword)
   ↓
2. Get user ID from Firebase
   ↓
3. Backend loads profile from Firestore
   (via login endpoint or direct fetch)
   ↓
4. Dashboard displayed with user data
```

---

## 📞 API Endpoints Updated

### Register Endpoint
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "uid": "firebase-user-id",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "patient",
  "phone": "1234567890",
  "specialization": "optional-for-doctor"
}

Response: 201 Created
{
  "message": "User profile created successfully",
  "user": {
    "uid": "...",
    "email": "...",
    "fullName": "...",
    "role": "..."
  }
}
```

### Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "uid": "firebase-user-id"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": {
    "uid": "...",
    "email": "...",
    "fullName": "...",
    "role": "...",
    "phone": "..."
  }
}
```

---

## ✨ Key Advantages

### 1. Unified Configuration ✅
- Same Firebase credentials everywhere
- No separate Admin SDK service account
- Consistent across frontend & backend

### 2. Simpler Setup ✅
- Just copy web config from Firebase Console
- Add to `.env` file
- No JSON file management

### 3. Better Code Consistency ✅
- Frontend and backend use same SDK
- Same API patterns
- Easier to maintain

### 4. Smaller Package Size ✅
- Removed Admin SDK (larger library)
- Uses same firebase package for both

---

## 🔧 Setup Checklist

- [ ] Update `backend/.env` with Firebase web config
- [ ] Run `npm install` in backend (to remove firebase-admin)
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Verify profiles in Firestore Console
- [ ] Check browser console for errors

---

## 🐛 Common Issues & Fixes

### Issue: "API URL not found"
**Solution**: Make sure `.env.local` has `VITE_API_URL=http://localhost:5000/api`

### Issue: "Profile creation failed"
**Solution**: 
1. Check backend is running
2. Check Firestore security rules
3. Check console errors for details

### Issue: "User not found on login"
**Solution**: 
1. Make sure registration called backend
2. Check Firestore has user document
3. Verify UID matches

### Issue: Backend won't start
**Solution**: 
1. Run `npm install` to update dependencies
2. Check `.env` file has all required variables
3. Check port 5000 is not in use

---

## 📚 Reference Files

- **Backend Setup Guide**: `FIREBASE_WEB_SDK_SETUP.md` (in backend folder)
- **Main Authentication Guide**: `AUTHENTICATION_SETUP.md`
- **Quick Start**: `QUICK_START.md`
- **File References**: `FILE_STRUCTURE_REFERENCE.md`

---

## 🚀 Next Steps

1. **Get Firebase Web Config**:
   - Go to Firebase Console → Project Settings
   - Click "Your Apps" → Select your app
   - Copy the config object

2. **Update backend/.env**:
   ```bash
   VITE_FIREBASE_API_KEY=<your_api_key>
   VITE_FIREBASE_AUTH_DOMAIN=<your_domain>
   # ... add all other fields
   ```

3. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

4. **Start backend**:
   ```bash
   npm run dev
   ```

5. **Test the system**:
   - Register new user
   - Check Firestore for new profile
   - Login with same credentials
   - See dashboard

---

## 📊 File Dependencies

### Backend Dependencies (Updated)
```json
{
  "firebase": "^12.9.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### Removed
- ❌ `firebase-admin` (no longer needed)

---

## 🔒 Security Considerations

1. **Token Verification**: For production, implement proper JWT verification
2. **Firestore Rules**: Set appropriate security rules for your data
3. **CORS**: Configure CORS for your frontend domain
4. **Environment Variables**: Keep `.env` file secure, never commit to Git

---

## 💡 Firebase Console Setup

Make sure you have:
- ✅ Firebase Project created
- ✅ Authentication enabled (Email/Password)
- ✅ Firestore Database created (test mode)
- ✅ Web app registered in project
- ✅ Web config copied to `.env` files

---

## 📞 Support Resources

- [Firebase Web SDK Docs](https://firebase.google.com/docs/web)
- [Firestore Web SDK](https://firebase.google.com/docs/firestore/client/start)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Backend Setup Guide](./FIREBASE_WEB_SDK_SETUP.md)

---

**Configuration Type**: Firebase Web SDK (Client)  
**Backend Framework**: Node.js + Express  
**Database**: Cloud Firestore  
**Authentication**: Firebase Authentication  
**Last Updated**: February 26, 2026

---

✅ **Your Firebase Web SDK setup is complete!**

The system now uses a unified Firebase configuration across frontend and backend, making it simpler to manage and deploy.
