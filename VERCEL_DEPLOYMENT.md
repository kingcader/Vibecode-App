# Deploying Vibecode to Vercel

This guide will help you deploy both the marketing website and backend API to Vercel.

## 🎯 What You're Deploying

1. **Marketing Website** (`/web`) - Next.js landing page
2. **Backend API** (`/api`) - Serverless functions for the mobile app

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your API keys ready:
  - Supabase URL and keys
  - Anthropic API key
  - Stripe keys (optional, for payments)

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push to GitHub

```bash
# Make sure all changes are committed
git add -A
git commit -m "Add Vercel deployment files"
git push origin claude/ai-coding-agent-app-CdAh5
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub account
5. Find and select **"Vibecode-App"** repository
6. Click **"Import"**

#### Step 3: Configure Project

Vercel will auto-detect the Next.js app. Configure:

**Framework Preset:** Next.js
**Root Directory:** `web`
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)

#### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... (for API only)

# AI APIs
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-proj-... (optional)

# Stripe (optional, for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Important:** Add these to all environments (Production, Preview, Development)

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://vibecode-app.vercel.app`

✅ **Done!** Your website is live!

---

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Navigate to Web Directory

```bash
cd web
```

#### Step 4: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Step 5: Add Environment Variables

```bash
# Add environment variables
vercel env add SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add SUPABASE_ANON_KEY
# Paste your Supabase anon key

vercel env add ANTHROPIC_API_KEY
# Paste your Anthropic API key

# Repeat for other variables
```

#### Step 6: Redeploy with Environment Variables

```bash
vercel --prod
```

---

## 🔧 Configure API Endpoints

### Update Mobile App API URL

After deployment, update your mobile app to use the Vercel API:

1. Edit `/app/.env`:
```env
API_BASE_URL=https://your-app.vercel.app/api
```

2. Your API endpoints will be:
```
https://your-app.vercel.app/api/health
https://your-app.vercel.app/api/ai/chat
https://your-app.vercel.app/api/ai/generate
https://your-app.vercel.app/api/webhooks/stripe
https://your-app.vercel.app/api/users/me
```

---

## 🧪 Test Your Deployment

### Test the Website

Visit your Vercel URL: `https://your-app.vercel.app`

You should see the Vibecode landing page!

### Test the API

#### Health Check
```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T...",
  "service": "vibecode-api",
  "version": "1.0.0"
}
```

#### Test AI Chat
```bash
curl -X POST https://your-app.vercel.app/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write a hello world function in JavaScript"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "message": "function helloWorld() {\n  console.log('Hello, World!');\n}",
    "usage": {
      "input_tokens": 15,
      "output_tokens": 20
    }
  }
}
```

---

## 🔐 Set Up Stripe Webhooks

If you're using Stripe for payments:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL:
   ```
   https://your-app.vercel.app/api/webhooks/stripe
   ```
4. Select events to listen to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. Copy the **Webhook Signing Secret** (starts with `whsec_`)
6. Add it to Vercel environment variables:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET
   ```

---

## 📊 Monitor Your Deployment

### Vercel Dashboard

View deployment status, logs, and analytics:
- Deployments: See all deployments and their status
- Analytics: View page views and performance
- Logs: Real-time function logs
- Speed Insights: Performance metrics

### View Logs

```bash
# View real-time logs
vercel logs --follow

# View logs for specific deployment
vercel logs [deployment-url]
```

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click **"Add"**
3. Enter your domain (e.g., `vibecode.app`)
4. Follow DNS configuration instructions:
   - Add A record: `76.76.21.21`
   - Or CNAME record: `cname.vercel-dns.com`

5. Wait for DNS propagation (5-60 minutes)
6. Your site will be live at your custom domain!

**SSL Certificate:** Vercel automatically provides free SSL certificates.

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

### Production Deployments
- **Trigger:** Push to `main` or `master` branch
- **URL:** Your production domain

### Preview Deployments
- **Trigger:** Push to any other branch or PR
- **URL:** Unique preview URL for each deployment

### Example Workflow

```bash
# Make changes
git add .
git commit -m "Add new feature"

# Push to feature branch (creates preview)
git push origin feature-branch

# Merge to main (deploys to production)
git checkout main
git merge feature-branch
git push origin main
```

---

## ⚡ Performance Optimization

### Enable Edge Functions

For faster global response times, convert API functions to Edge:

Edit any API file (e.g., `api/health.ts`):
```typescript
export const config = {
  runtime: 'edge',
};
```

### Enable ISR (Incremental Static Regeneration)

For the landing page, add to `web/app/page.tsx`:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

### Image Optimization

Vercel automatically optimizes images. Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={800}
  height={600}
/>
```

---

## 🐛 Troubleshooting

### Build Fails

**Error:** Module not found
```bash
# Solution: Install dependencies in correct directory
cd web
npm install
```

**Error:** Environment variables missing
```bash
# Solution: Add environment variables in Vercel Dashboard
# Settings → Environment Variables
```

### API Not Working

**Error:** 500 Internal Server Error
```bash
# Check logs
vercel logs --follow

# Common issues:
# 1. Missing environment variables
# 2. Wrong API key format
# 3. Supabase connection failed
```

**Error:** CORS issues
```bash
# Solution: API already has CORS headers
# Verify mobile app is using correct API URL
```

### Deployment Stuck

```bash
# Cancel deployment
vercel cancel

# Redeploy
vercel --prod --force
```

---

## 💰 Costs

### Vercel Pricing

**Hobby Plan** (Free)
- ✅ Perfect for getting started
- 100GB bandwidth/month
- Serverless functions (100GB-hrs)
- Automatic HTTPS
- **Cost: $0**

**Pro Plan** ($20/month)
- 1TB bandwidth/month
- More serverless function execution time
- Password protection
- Advanced analytics
- **Upgrade when:** You get 10,000+ monthly visitors

### Cost Estimates

**For 100 users:**
- Vercel: **$0** (Hobby plan)
- Total: **$0/month**

**For 1,000 users:**
- Vercel: **$0-20** (may need Pro plan)
- AI API (Anthropic): **$50-100**
- Total: **$50-120/month**

**For 10,000 users:**
- Vercel: **$20** (Pro plan)
- AI API: **$300-500**
- Total: **$320-520/month**

---

## 📚 Additional Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Discord](https://nextjs.org/discord)

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Website is accessible at Vercel URL
- [ ] API health check returns 200
- [ ] AI chat endpoint works
- [ ] Environment variables are set
- [ ] Stripe webhooks configured (if using)
- [ ] Custom domain added (optional)
- [ ] Analytics enabled
- [ ] Mobile app updated with API URL
- [ ] Test mobile app with production API
- [ ] Monitor logs for errors

---

## 🎉 You're Live!

Congratulations! Your Vibecode marketing site and API are now deployed on Vercel.

### What's Next?

1. **Share your URL** on social media
2. **Monitor analytics** in Vercel Dashboard
3. **Set up monitoring** (Sentry, LogRocket)
4. **Launch mobile app** and point it to your API
5. **Start marketing** to get users!

### Support

Need help?
- Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Ask in Vercel Discord
- Open an issue on GitHub

**Your live URLs:**
- Website: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/*`

Good luck with your launch! 🚀
