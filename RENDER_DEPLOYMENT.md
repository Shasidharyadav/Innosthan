# 🚀 Quick Render Deployment Checklist

## 1️⃣ Required Environment Variables (Minimum)

Add these 5 variables in Render Dashboard → Environment:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
JWT_SECRET=your-very-long-random-secret-key-minimum-32-characters-long
PORT=10000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

## 2️⃣ Render Service Settings

```
Name: innosthan-backend
Region: [Choose closest]
Root Directory: server
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
```

## 3️⃣ MongoDB Atlas Setup

1. Create free M0 cluster
2. Create user: `innosthan-user` with password
3. Network Access: Add `0.0.0.0/0` (allow all)
4. Copy connection string and replace `<password>`

## 4️⃣ Where to Add Env Vars

### Render:
- Dashboard → Your Service → Environment → Add Variable

### Local (.env in root):
- Create `.env` file in project root
- Copy from `env.example`
- Fill in your values

## 5️⃣ Test Deployment

```
https://your-service.onrender.com/api/auth/register
```

---

**Quick Start:**
1. Get MongoDB Atlas connection string
2. Generate JWT secret: `openssl rand -base64 32`
3. Create Render Web Service
4. Add 5 env vars above
5. Deploy!

