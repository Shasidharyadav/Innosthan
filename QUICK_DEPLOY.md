# ⚡ Quick Deployment Guide

## 🎯 One-Click Deployment

### Backend to Render (Using render.yaml)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

2. **Deploy on Render:**
   - Go to https://dashboard.render.com
   - Click **"New +"** → **"Blueprint"**
   - Connect GitHub repo
   - Render auto-detects `render.yaml` ✅
   - Click **"Apply"**
   - Add environment variables (see below)
   - Done! 🎉

3. **Add Environment Variables in Render:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
   JWT_SECRET=your-generated-secret-key-32-chars-minimum
   CLIENT_URL=https://your-app.vercel.app
   ```

---

### Frontend to Vercel (Using vercel.json)

1. **Deploy on Vercel:**
   - Go to https://vercel.com/dashboard
   - Click **"Add New..."** → **"Project"**
   - Import GitHub repo
   - **Settings:**
     - Root Directory: `client`
     - Framework: Vite (auto-detected)
   - **Environment Variable:**
     - Key: `VITE_API_URL`
     - Value: `https://innosthan-backend.onrender.com`
   - Click **"Deploy"**
   - Done! 🎉

---

## 📁 Files Created

✅ `render.yaml` - Auto-configures Render backend  
✅ `vercel.json` - Auto-configures Vercel frontend  
✅ `client/vercel.json` - Alternative location  
✅ `.gitignore` - Updated to exclude env files  

---

## 🔄 After Deployment

**Backend URL:** `https://innosthan-backend.onrender.com`  
**Frontend URL:** `https://your-app.vercel.app`

**Test Backend:**
```
https://innosthan-backend.onrender.com/api/health
```

**Update Frontend API URL:**
- In Vercel Dashboard → Environment Variables
- Set `VITE_API_URL` to your Render backend URL
- Redeploy if needed

---

## ✅ That's It!

Both services now auto-deploy on every GitHub push! 🚀

For detailed instructions, see `AUTOMATED_DEPLOYMENT.md`

