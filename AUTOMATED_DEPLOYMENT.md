# 🚀 Automated Deployment Guide

This guide will help you deploy your app automatically using `render.yaml` and `vercel.json` configuration files.

## 📋 Prerequisites

- GitHub account with your repository
- Render account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

---

## 🎯 Quick Start

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add deployment configs"
git push origin main
```

### Step 2: Deploy Backend to Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Click **"Apply"**
6. Render will create the service automatically!

#### Option B: Using Render CLI

```bash
# Install Render CLI
npm install -g @render/cli

# Login to Render
render login

# Deploy from render.yaml
render deploy
```

#### After Deployment:

1. Go to your service → **Environment** tab
2. Add these **required** environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
   JWT_SECRET=your-generated-secret-key-32-chars-minimum
   CLIENT_URL=https://your-frontend.vercel.app
   ```

3. Get your backend URL (e.g., `https://innosthan-backend.onrender.com`)

---

### Step 3: Deploy Frontend to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. **Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   - Add environment variable:
     ```
     Key: VITE_API_URL
     Value: https://innosthan-backend.onrender.com
     ```

6. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? innosthan-frontend
# - Directory? ./
# - Override settings? N
```

#### Update Environment Variable:

After deployment, update `VITE_API_URL`:

```bash
# Via Dashboard: Project → Settings → Environment Variables
# Or via CLI:
vercel env add VITE_API_URL production
# Enter: https://innosthan-backend.onrender.com
```

---

## 📝 Configuration Files Explained

### `render.yaml` (Backend - Render)

This file automatically configures your Render backend service:

- **Service Type**: Web service
- **Root Directory**: `server`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check**: `/api/health`
- **Auto-deploy**: Enabled

**To customize:**
- Change `region` (oregon, frankfurt, singapore, sydney, mumbai)
- Change `plan` (free, starter, standard)
- Add more environment variables in `envVars` section

### `vercel.json` (Frontend - Vercel)

This file configures your Vercel frontend:

- **Framework**: Vite
- **Build Directory**: `client/dist`
- **SPA Routing**: Rewrites all routes to `index.html`
- **Security Headers**: XSS protection, frame options

**Location Options:**
- `vercel.json` in root (for monorepo)
- `client/vercel.json` (if deploying from client directory)

---

## 🔧 Environment Variables Setup

### Backend (Render)

Add these in Render Dashboard → Environment:

**Required:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innosthan?retryWrites=true&w=majority
JWT_SECRET=your-generated-secret-key-min-32-chars
CLIENT_URL=https://your-frontend.vercel.app
```

**Auto-set by Render:**
```
PORT=10000 (or auto-assigned)
NODE_ENV=production
```

### Frontend (Vercel)

Add these in Vercel Dashboard → Project Settings → Environment Variables:

**Required:**
```
VITE_API_URL=https://innosthan-backend.onrender.com
```

**Note**: Vite requires `VITE_` prefix for client-side env vars!

---

## 🔄 Continuous Deployment

Both Render and Vercel automatically deploy when you push to GitHub:

### Automatic Deployments:

1. **Push to `main` branch** → Auto-deploys to production
2. **Push to other branches** → Creates preview deployments
3. **Pull Requests** → Creates preview deployments

### Manual Deployments:

- **Render**: Dashboard → Service → Manual Deploy
- **Vercel**: Dashboard → Project → Deployments → Redeploy

---

## 🧪 Testing Deployment

### Test Backend:

```bash
# Health check
curl https://innosthan-backend.onrender.com/api/health

# Test registration
curl -X POST https://innosthan-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123","role":"student"}'
```

### Test Frontend:

1. Visit your Vercel URL
2. Check browser console for API calls
3. Test login/register functionality

---

## 🔍 Troubleshooting

### Backend Issues:

**Issue: Build fails**
- ✅ Check `render.yaml` root directory is `server`
- ✅ Verify `package.json` has `build` and `start` scripts
- ✅ Check Render logs for specific errors

**Issue: MongoDB connection fails**
- ✅ Verify MONGODB_URI is correct
- ✅ Check password is URL-encoded
- ✅ Verify IP whitelist includes `0.0.0.0/0`

**Issue: CORS errors**
- ✅ Update CLIENT_URL to match Vercel URL exactly
- ✅ Check CORS config in `server/src/index.ts`

### Frontend Issues:

**Issue: API calls fail**
- ✅ Verify `VITE_API_URL` is set correctly
- ✅ Check API URL in browser Network tab
- ✅ Ensure backend is running and accessible

**Issue: Routes not working (404)**
- ✅ Verify `vercel.json` has rewrites rule
- ✅ Check `outputDirectory` is `dist`

**Issue: Environment variables not working**
- ✅ Ensure variable starts with `VITE_` prefix
- ✅ Redeploy after adding env vars
- ✅ Check Vercel dashboard → Environment Variables

---

## 📊 Deployment Checklist

### Before First Deployment:

- [ ] Code pushed to GitHub
- [ ] `render.yaml` created and committed
- [ ] `vercel.json` created and committed
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string ready
- [ ] JWT secret generated

### Backend (Render):

- [ ] Blueprint created from `render.yaml`
- [ ] MONGODB_URI added
- [ ] JWT_SECRET added
- [ ] CLIENT_URL added
- [ ] Service deployed successfully
- [ ] Health check endpoint works
- [ ] Backend URL copied

### Frontend (Vercel):

- [ ] Project created from GitHub
- [ ] Root directory set to `client`
- [ ] VITE_API_URL environment variable added
- [ ] Project deployed successfully
- [ ] Frontend accessible
- [ ] API calls working

---

## 🎉 Success!

Your app should now be live!

- **Backend**: `https://innosthan-backend.onrender.com`
- **Frontend**: `https://your-app.vercel.app`

**Next Steps:**
1. Test all features end-to-end
2. Update README with live URLs
3. Set up custom domains (optional)
4. Monitor logs for errors

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Test on preview URLs before merging to main
2. **Monitor Logs**: Check both Render and Vercel logs regularly
3. **Set Up Alerts**: Configure error notifications
4. **Custom Domains**: Add your own domain after initial deployment
5. **Environment Parity**: Keep dev/staging/prod environments consistent

---

**Happy Deploying! 🚀**

