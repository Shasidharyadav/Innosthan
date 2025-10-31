# 🚀 Deployment Guide - Render Backend Deployment

This guide will help you deploy your Innosthan backend to Render and connect everything properly.

## 📋 Table of Contents
1. [Environment Variables](#environment-variables)
2. [Render Setup](#render-setup)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Frontend Configuration](#frontend-configuration)
5. [Testing the Deployment](#testing-the-deployment)

---

## 🔐 Environment Variables

### Required Environment Variables

#### **1. MongoDB Connection**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
```
- **Where to get**: MongoDB Atlas → Connect → Connection String
- **Format**: Replace `username`, `password`, and `cluster` with your Atlas credentials

#### **2. JWT Secret Key**
```
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long-random-string
```
- **Generate**: Use a long random string (minimum 32 characters)
- **Example**: `openssl rand -base64 32` or use an online generator

#### **3. Server Port**
```
PORT=10000
```
- **Render Note**: Render automatically sets PORT, but include it as fallback
- **Default**: 5000 (local), 10000 (Render)

#### **4. Node Environment**
```
NODE_ENV=production
```
- **Values**: `development` (local) or `production` (Render)

#### **5. Client URL (Frontend URL)**
```
CLIENT_URL=https://your-frontend-app.onrender.com
```
- **For Vercel/Netlify**: `https://your-app.vercel.app` or `https://your-app.netlify.app`
- **For Local Dev**: `http://localhost:3000`

---

### Optional Environment Variables

#### **6. OpenAI API Key (For AI Features)**
```
OPENAI_API_KEY=sk-your-openai-api-key-here
```
- **Required**: Only if using AI mentor chat features
- **Get from**: https://platform.openai.com/api-keys

#### **7. AWS S3 (For File Storage)**
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=innosthan-storage
```
- **Required**: Only if uploading files/images
- **Skip if**: Not using file uploads

#### **8. Email Service (SMTP)**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```
- **Required**: Only for email notifications
- **Gmail**: Use App Password (not regular password)

#### **9. Stripe (Payment Processing)**
```
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```
- **Required**: Only if using payments
- **Skip if**: Not using payment features

---

## 🎯 Render Setup Instructions

### Step 1: Create MongoDB Atlas Database

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create Free Cluster** (M0 Sandbox)
3. **Create Database User**:
   - Database Access → Add New Database User
   - Username: `innosthan-user`
   - Password: Generate secure password (save it!)
   - Role: `Atlas admin`
4. **Whitelist IP Address**:
   - Network Access → Add IP Address
   - For Render: `0.0.0.0/0` (allow all IPs)
   - For Local: Add your current IP
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your user password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority`

### Step 2: Create Render Web Service

1. **Go to Render**: https://dashboard.render.com
2. **New + → Web Service**
3. **Connect Repository**:
   - Connect your GitHub/GitLab repository
   - Select the repository
4. **Configure Service**:
   - **Name**: `innosthan-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` or `develop`
   - **Root Directory**: `server` (important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Set Environment Variables** (Click "Advanced" → "Environment"):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
   JWT_SECRET=your-very-long-random-secret-key-min-32-chars
   PORT=10000
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```
   **For minimum deployment, only these 5 are required!**
6. **Click "Create Web Service"**

### Step 3: Get Your Backend URL

- Render will provide: `https://innosthan-backend.onrender.com`
- **Note**: Free tier services spin down after 15 minutes of inactivity
- Consider upgrading for production use

---

## 📝 Environment Variables Location

### On Render Dashboard:

1. Go to your **Web Service**
2. Click **"Environment"** in the sidebar
3. Click **"Add Environment Variable"**
4. Add each variable one by one

### Complete Render Environment Variables List:

```bash
# REQUIRED - Minimum for deployment
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
JWT_SECRET=your-very-long-random-secret-key-at-least-32-characters
PORT=10000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app

# OPTIONAL - Add if needed
OPENAI_API_KEY=sk-your-openai-key-here
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=innosthan-storage
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_your-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
```

---

## 🌐 Frontend Configuration

### Update Frontend API URL

After deploying to Render, update your frontend to use the Render backend URL:

**Option 1: Update `vite.config.ts` for production:**

```typescript
// client/vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

**Option 2: Create `.env` file in `client/` directory:**

```bash
# client/.env
VITE_API_URL=https://innosthan-backend.onrender.com
```

**Option 3: Use absolute URLs in axios calls:**

Update axios baseURL in your frontend code:

```typescript
// client/src/stores/authStore.ts or create api.ts
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

axios.defaults.baseURL = API_URL
```

---

## 🧪 Testing the Deployment

### 1. Check Backend Health

Visit: `https://innosthan-backend.onrender.com/api/health` (if you have health endpoint)

Or test: `https://innosthan-backend.onrender.com/api/auth/register`

### 2. Test API Endpoints

```bash
# Test registration
curl -X POST https://innosthan-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"student"}'
```

### 3. Check Logs

- Go to Render Dashboard → Your Service → **Logs**
- Watch for connection errors or startup issues

### 4. Common Issues & Solutions

#### **Issue: "MongoDB connection failed"**
- ✅ Check MONGODB_URI is correct
- ✅ Verify password is URL-encoded (replace special chars)
- ✅ Check Network Access in Atlas includes `0.0.0.0/0`

#### **Issue: "Port already in use"**
- ✅ Remove PORT from env vars (Render sets it automatically)
- ✅ Or use PORT=10000 as fallback

#### **Issue: "CORS errors"**
- ✅ Update CLIENT_URL in backend env vars
- ✅ Check CORS config in `server/src/index.ts`

#### **Issue: "Build failed"**
- ✅ Check Root Directory is set to `server`
- ✅ Verify package.json has build script
- ✅ Check Node version compatibility

---

## 📦 Build Scripts Check

Ensure your `server/package.json` has:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## 🔒 Security Checklist

- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Never commit .env files
- ✅ Use MongoDB Atlas IP whitelisting
- ✅ Enable HTTPS (Render provides automatically)
- ✅ Don't expose sensitive keys in frontend

---

## 📞 Quick Reference

### Render Dashboard Links:
- **Dashboard**: https://dashboard.render.com
- **Your Service**: https://dashboard.render.com/web/[your-service-name]

### MongoDB Atlas:
- **Dashboard**: https://cloud.mongodb.com
- **Connection String**: In Atlas → Connect → Get connection string

### Backend URL Format:
```
https://[service-name].onrender.com
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelisted (0.0.0.0/0 for Render)
- [ ] Connection string copied and password replaced
- [ ] Render Web Service created
- [ ] Root directory set to `server`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] All environment variables added to Render
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] Frontend configured to use backend URL
- [ ] API endpoints tested
- [ ] CORS configured correctly

---

## 🎉 You're Done!

Your backend should now be live on Render! 

**Next Steps:**
1. Deploy frontend to Vercel/Netlify
2. Update frontend to use Render backend URL
3. Test all features end-to-end

**Need Help?**
- Check Render logs for errors
- Verify all env vars are set correctly
- Test API endpoints with Postman/curl

