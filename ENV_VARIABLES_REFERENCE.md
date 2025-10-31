# 🔐 Complete Environment Variables Reference

## 📍 Where to Add Environment Variables

### 1. **Local Development** (`.env` in project root)
Create a file named `.env` in the root directory of your project (same level as `package.json`)

### 2. **Render Dashboard** (Web Service → Environment)
Go to your Render Web Service → Click "Environment" → Add each variable

---

## ✅ REQUIRED Variables (Minimum for Deployment)

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=your-very-long-random-secret-key-minimum-32-characters-long-make-it-very-secure

# Server Port (Render sets this automatically, but include as fallback)
PORT=10000

# Environment
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=https://your-frontend-app.vercel.app
```

---

## 🔧 OPTIONAL Variables (Add if you need these features)

```bash
# OpenAI API (For AI Mentor Chat)
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# AWS S3 (For file uploads)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=innosthan-storage

# Email Service (SMTP - For notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Stripe (For payments)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

---

## 📝 Detailed Explanation

### 1. MONGODB_URI
- **Required**: ✅ YES
- **Where to get**: MongoDB Atlas → Connect → Get connection string
- **Format**: `mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority`
- **Example**: `mongodb+srv://innosthan-user:MyPassword123@cluster0.abc123.mongodb.net/innosthan?retryWrites=true&w=majority`
- **Note**: Replace `<password>` with your actual database password (URL-encode special characters)

### 2. JWT_SECRET
- **Required**: ✅ YES
- **Generate**: Run `openssl rand -base64 32` in terminal or use online generator
- **Length**: Minimum 32 characters (longer is better)
- **Example**: `a7f8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9`
- **Security**: Never commit to Git, keep it secret!

### 3. PORT
- **Required**: ⚠️ Render sets automatically, but good to have as fallback
- **Local Dev**: `5000`
- **Render**: `10000` (or let Render set it automatically)
- **Note**: Render provides `$PORT` environment variable automatically

### 4. NODE_ENV
- **Required**: ✅ YES
- **Local Dev**: `development`
- **Production (Render)**: `production`
- **Purpose**: Enables production optimizations and hides error details

### 5. CLIENT_URL
- **Required**: ✅ YES (for CORS)
- **Local Dev**: `http://localhost:3000`
- **Production**: `https://your-frontend.vercel.app` or `https://your-frontend.netlify.app`
- **Purpose**: Allows frontend to make API requests (CORS configuration)

---

## 🎯 Quick Setup Steps

### Step 1: MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user (save username/password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Get connection string → Replace `<password>`

### Step 2: Generate JWT Secret
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Step 3: Render Setup
1. Create Web Service on Render
2. Connect GitHub repository
3. Root Directory: `server`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add all 5 required environment variables

---

## 🔍 Verification Checklist

After adding env vars, verify:

- [ ] MONGODB_URI starts with `mongodb+srv://`
- [ ] Password in MONGODB_URI is URL-encoded (no spaces or special chars)
- [ ] JWT_SECRET is at least 32 characters long
- [ ] CLIENT_URL matches your frontend deployment URL exactly
- [ ] NODE_ENV is set to `production` on Render
- [ ] All required vars are added (5 minimum)

---

## 🐛 Common Issues

### Issue: "MongoDB connection failed"
**Solution**: 
- Check password doesn't contain special characters (or URL-encode them)
- Verify IP whitelist includes `0.0.0.0/0`
- Test connection string in MongoDB Compass

### Issue: "JWT_SECRET missing"
**Solution**: 
- Generate new secret: `openssl rand -base64 32`
- Add to Render environment variables
- Redeploy service

### Issue: "CORS error"
**Solution**: 
- Verify CLIENT_URL matches frontend URL exactly
- Check URL has `https://` not `http://`
- No trailing slash in CLIENT_URL

---

## 📞 Need Help?

1. Check Render logs: Dashboard → Your Service → Logs
2. Test health endpoint: `https://your-service.onrender.com/api/health`
3. Verify env vars: Dashboard → Environment (should see all 5+ vars)

---

**Quick Copy-Paste Template for Render:**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
JWT_SECRET=your-generated-secret-key-32-chars-minimum
PORT=10000
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- `cluster` with your cluster name
- `your-generated-secret-key-32-chars-minimum` with generated secret
- `your-frontend.vercel.app` with your actual frontend URL

