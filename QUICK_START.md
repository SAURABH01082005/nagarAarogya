# Quick Start Guide - NagarArogya Authentication

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Firebase Credentials
1. Go to https://console.firebase.google.com/
2. Create a new project or select existing one
3. For Backend: Project Settings → Service Accounts → Generate Private Key
4. For Frontend: Project Settings → Your Apps → Copy Firebase Config

### Step 2: Configure Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

### Step 3: Configure Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
npm run dev
```

### Step 4: Test the Application
- Open http://localhost:5173
- Click "Register" to create a new account
- Choose role (Patient, Doctor, or Admin)
- Login with your credentials
- See role-based dashboard

---

## 🎯 Key Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Home page with role cards |
| `/login` | Public | Login page |
| `/register` | Public | Registration page |
| `/dashboard` | Protected | User dashboard (role-based) |
| `/patient` | Protected | Patient-only page |
| `/doctor` | Protected | Doctor-only page |
| `/admin` | Protected | Admin-only page |
| `/unauthorized` | Public | Unauthorized access page |

---

## 🔑 Test Accounts

After registration, you can login with:
- **Email**: any email address
- **Password**: any password (minimum 6 characters)
- **Role**: choose during registration

---

## 📁 Project Structure

```
nagarArogya/
├── backend/              # Express server with Firebase
│   ├── config/          # Firebase configuration
│   ├── controllers/      # Auth logic
│   ├── middleware/       # Auth middleware
│   ├── routes/          # API routes
│   ├── index.js         # Main server file
│   └── package.json
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── config/      # Firebase config
│   │   ├── css/         # Stylesheets
│   │   └── App.jsx      # Main app
│   ├── package.json
│   └── vite.config.js
└── AUTHENTICATION_SETUP.md  # Detailed setup guide
```

---

## 🔄 Authentication Flow

```
User Registration/Login
        ↓
Facebook/Email Password
        ↓
Firebase Auth
        ↓
Get ID Token
        ↓
Send to Backend (optional)
        ↓
Backend Verifies Token
        ↓
Store User in Firestore
        ↓
Create User Session
        ↓
Redirect to Dashboard
```

---

## 🚫 Protected Route Behavior

### When accessing a protected route:
1. **Not Logged In** → Redirect to `/login`
2. **Logged In + Correct Role** → Show page
3. **Logged In + Wrong Role** → Redirect to `/unauthorized`

---

## 🆘 Common Issues & Fixes

### Firebase not connecting?
```bash
# Check your .env variables
# Verify Firebase project is active
# Ensure Firestore database exists
```

### Can't login?
```
- Check email/password are correct
- Verify user exists in Firebase
- Check browser console for errors
- Clear browser cache and try again
```

### Routes not protected?
```
- Make sure AuthProvider wraps App.jsx
- Check AuthContext is imported correctly
- Verify user.role is set in Firestore
```

---

## 📚 File Reference

**Backend Files:**
- `backend/index.js` - Main server
- `backend/config/firebase.js` - Firebase setup
- `backend/controllers/authController.js` - Auth endpoints
- `backend/middleware/authMiddleware.js` - Token verification

**Frontend Files:**
- `frontend/src/App.jsx` - Routes setup
- `frontend/src/context/AuthContext.jsx` - Auth state
- `frontend/src/config/firebase.js` - Firebase config
- `frontend/src/components/Login.jsx` - Login page
- `frontend/src/components/Register.jsx` - Registration page
- `frontend/src/components/Dashboard.jsx` - Main dashboard
- `frontend/src/components/ProtectedRoute.jsx` - Route protection

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend server runs on port 5000
- [ ] Frontend app runs on port 5173
- [ ] Can navigate to home page
- [ ] Can register new account
- [ ] Can login with registered account
- [ ] Dashboard shows after login
- [ ] Logout button works
- [ ] Can't access protected routes without login
- [ ] Role-based access control works

---

## 🎓 Next Learning Steps

1. Explore `/api` endpoints in `backend/routes/auth.js`
2. Study auth flow in `AuthContext.jsx`
3. Check protected route logic in `ProtectedRoute.jsx`
4. Review Firestore rules in Firebase Console
5. Customize user profiles in Firestore

---

## 💡 ProTips

- Use Firebase Console to see real-time database updates
- Check browser DevTools → Network tab to see API calls
- Use Firestore Console to manage user data
- Check backend console for detailed error logs
- Enable "Show Performance Metrics" in Firebase Console

---

## 📞 Need Help?

Refer to detailed guide: `AUTHENTICATION_SETUP.md`

---

**Happy Coding! 🚀**
