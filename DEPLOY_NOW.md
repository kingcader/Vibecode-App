# 🚀 Deploy to Vercel - Ultra Simple Guide

## Option 1: One Click Deploy (EASIEST - 2 minutes)

### Step 1: Click this button (I'll create it for you)

1. Go to: **https://vercel.com/new**
2. Click "**Import Git Repository**"
3. Select your GitHub account
4. Find "**Vibecode-App**"
5. Click "**Import**"

### Step 2: Configure

```
Framework: Next.js (auto-detected)
Root Directory: web
```

Click "**Deploy**"

### Step 3: Add API Keys After First Deploy

Go to your project → Settings → Environment Variables

Add these:

```
ANTHROPIC_API_KEY = sk-ant-your-key
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-key
```

Then click "**Redeploy**" from Deployments tab.

**Done! Your site is live!** 🎉

---

## Option 2: Use My Deploy Script (1 command)

I've created a script that does everything for you:

```bash
cd /home/user/Vibecode-App
./deploy.sh
```

This will:
1. Install Vercel CLI
2. Login to Vercel (opens browser)
3. Deploy your app
4. Give you the live URL

Then just add your API keys in the Vercel dashboard.

---

## Option 3: Manual CLI (if you prefer)

```bash
# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login

# Deploy
cd web
vercel --prod
```

---

## 🔑 Where to Get API Keys

### Anthropic (Required)
1. Go to: https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-ant-`)

### Supabase (Required)
1. Go to: https://supabase.com/dashboard
2. Create new project (or use existing)
3. Settings → API
4. Copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key

---

## 🎯 Recommended: Option 1 (Click Deploy)

This is the **easiest and fastest** way:

1. **Open**: https://vercel.com/new
2. **Login** with GitHub
3. **Import** your Vibecode-App repo
4. **Root directory**: `web`
5. **Deploy** (green button)
6. **Wait** 2 minutes
7. **Add API keys** in Settings → Environment Variables
8. **Redeploy** from Deployments tab

**That's it!** Your app is live.

---

## ⚡ I've Set Up Everything For You

✅ Landing page ready to deploy
✅ API endpoints configured
✅ Vercel config file created
✅ All dependencies listed
✅ TypeScript configured
✅ One-command deploy script

All you need to do is authenticate with Vercel (I can't do this for security).

---

## 🆘 Still Need Help?

Tell me which option you want to use:
- **Option 1**: I'll walk you through the clicks
- **Option 2**: I'll help you run the script
- **Option 3**: I'll guide you through CLI commands

What works best for you?
