# Getting Started with Vibecode - Complete Setup Guide

## 🎯 Goal
By the end of this guide, you'll have:
1. A fully functional AI coding assistant mobile app
2. Integrated subscription payments
3. AI coding capabilities
4. A clear path to monetization

## ⏱️ Time Estimate
- Basic setup: 2-3 hours
- Full setup with payments: 1-2 days
- Launch ready: 1-2 weeks

---

## Step 1: Development Environment Setup (30 minutes)

### Install Required Software

1. **Install Node.js**
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Verify installation
node --version  # Should be v20.x.x
npm --version   # Should be 10.x.x
```

2. **Install Expo CLI**
```bash
npm install -g expo-cli
```

3. **Install Development Tools**

**For iOS Development (Mac only):**
- Install Xcode from Mac App Store
- Install Xcode Command Line Tools:
```bash
xcode-select --install
```

**For Android Development:**
- Download and install [Android Studio](https://developer.android.com/studio)
- Install Android SDK Platform 33
- Set up Android emulator

4. **Install Expo Go on Your Phone**
- iOS: Download from App Store
- Android: Download from Google Play Store

---

## Step 2: Project Setup (15 minutes)

1. **Navigate to the project directory**
```bash
cd Vibecode-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Start the development server**
```bash
npm start
```

You should see a QR code. Scan it with:
- iOS: Camera app (opens in Expo Go)
- Android: Expo Go app

🎉 **Congratulations!** Your app should now be running on your phone.

---

## Step 3: Supabase Setup (Backend) (30 minutes)

Supabase provides authentication, database, and storage for free.

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
   - Name: "Vibecode"
   - Database Password: (generate and save securely)
   - Region: Choose closest to your location
   - Pricing Plan: Free tier

4. Wait for project to initialize (~2 minutes)

### Get API Keys

1. Go to Project Settings → API
2. Copy:
   - Project URL → `SUPABASE_URL`
   - anon/public key → `SUPABASE_ANON_KEY`

3. Update your `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### Create Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Run this SQL to create tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('FREE', 'PRO', 'TEAM', 'ENTERPRISE')),
  status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'CANCELED', 'PAST_DUE', 'TRIALING')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  framework TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files table
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  content TEXT,
  language TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, path)
);

-- Usage tracking table
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('AI_REQUEST', 'CODE_COMPLETION', 'CODE_GENERATION', 'CHAT_MESSAGE', 'CODE_EXECUTION')),
  model TEXT,
  tokens INTEGER,
  cost DECIMAL(10, 6),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_files_project_id ON files(project_id);
CREATE INDEX idx_usage_user_id ON usage(user_id);
CREATE INDEX idx_usage_timestamp ON usage(timestamp);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own files" ON files FOR SELECT USING (
  auth.uid() = (SELECT user_id FROM projects WHERE id = project_id)
);
CREATE POLICY "Users can manage own files" ON files FOR ALL USING (
  auth.uid() = (SELECT user_id FROM projects WHERE id = project_id)
);
```

✅ **Database is now set up!**

---

## Step 4: AI API Setup (15 minutes)

### Option A: Anthropic Claude (Recommended)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for an account
3. Add payment method (no charges until you use it)
4. Go to API Keys
5. Create a new API key
6. Copy and add to `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**Pricing**: Pay-as-you-go
- Claude 3.5 Sonnet: $3 per million input tokens
- Very cost-effective for coding tasks

### Option B: OpenAI (Alternative)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up and add payment method
3. Go to API Keys
4. Create new key
5. Add to `.env`:
```env
OPENAI_API_KEY=sk-proj-xxxxx
```

**Pricing**: Pay-as-you-go
- GPT-4 Turbo: $10 per million input tokens
- More expensive but powerful

### Cost Estimation

For 1000 users with 50 requests/month each:
- Total requests: 50,000/month
- Average tokens per request: 2,000
- Total tokens: 100M/month
- **Cost with Claude**: ~$300/month
- **Cost with OpenAI**: ~$1,000/month

💡 **Tip**: Start with Claude. It's cheaper and better for code.

---

## Step 5: Payment Setup - Stripe (45 minutes)

### Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete business verification
4. Enable your account

### Set Up Products

1. Go to Products → Create Product
2. Create these products:

**Pro Plan**
- Name: "Vibecode Pro"
- Price: $20/month
- Recurring: Monthly
- Copy the Price ID (starts with `price_`)

**Team Plan**
- Name: "Vibecode Team"
- Price: $49/month per user
- Recurring: Monthly
- Copy the Price ID

3. Add to `.env`:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_PRO=price_xxxxx
STRIPE_PRICE_TEAM=price_xxxxx
```

### Set Up Webhooks

1. Go to Developers → Webhooks
2. Add endpoint: `https://your-api-domain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy webhook signing secret to `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Step 6: Subscription Management - RevenueCat (30 minutes)

RevenueCat simplifies subscription management across iOS and Android.

### Set Up RevenueCat

1. Go to [revenuecat.com](https://www.revenuecat.com)
2. Sign up and create a new app
3. Go to Projects → Create New Project
   - Name: "Vibecode"

### Connect Stripe

1. In RevenueCat Dashboard → Integrations
2. Click Stripe
3. Connect your Stripe account
4. Map Stripe products to RevenueCat products

### Configure Entitlements

1. Go to Entitlements
2. Create entitlement: "pro"
   - Description: "Pro features"
   - Products: Link to your Pro product

### Get API Keys

1. Go to API keys
2. Copy public SDK key
3. Add to `.env`:
```env
REVENUECAT_API_KEY=xxxxx
```

### Install SDK

```bash
npm install react-native-purchases
```

---

## Step 7: App Store Preparation (1-2 days)

### iOS Setup

1. **Join Apple Developer Program**
   - Cost: $99/year
   - Go to [developer.apple.com](https://developer.apple.com)
   - Enroll as individual or organization

2. **Create App ID**
   - Go to Certificates, Identifiers & Profiles
   - Create new identifier
   - Bundle ID: `com.vibecode.app`
   - Enable In-App Purchase capability

3. **Configure In-App Purchases**
   - Go to App Store Connect
   - My Apps → Create New App
   - In-App Purchases → Create
   - Add Pro and Team subscriptions

### Android Setup

1. **Create Google Play Console Account**
   - Cost: $25 one-time
   - Go to [play.google.com/console](https://play.google.com/console)

2. **Create New App**
   - App name: "Vibecode"
   - Package name: `com.vibecode.app`

3. **Set Up Billing**
   - Go to Monetize → Products → Subscriptions
   - Create Pro and Team subscriptions
   - Link to RevenueCat

---

## Step 8: Deploy Backend (1-2 hours)

### Option A: Vercel (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Create `api/` directory in your project
4. Deploy:
```bash
npm install -g vercel
vercel
```

### Option B: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Add environment variables
5. Deploy

**Cost**: Free for first $5/month usage

### Backend Code

Create a simple Express server:

```bash
mkdir backend
cd backend
npm init -y
npm install express @supabase/supabase-js stripe anthropic
```

Create `backend/index.js`:
```javascript
// See backend implementation in ARCHITECTURE.md
// This would be a full Express server with routes for:
// - /api/auth/*
// - /api/projects/*
// - /api/ai/*
// - /api/webhooks/stripe
```

---

## Step 9: Testing (2-3 hours)

### Test User Flow

1. **Authentication**
   - [ ] Sign up with email
   - [ ] Log in
   - [ ] Log out

2. **Projects**
   - [ ] Create project
   - [ ] Edit project
   - [ ] Delete project

3. **AI Features**
   - [ ] Send chat message
   - [ ] Generate code
   - [ ] Code completion

4. **Subscription**
   - [ ] View plans
   - [ ] Subscribe to Pro (test mode)
   - [ ] Verify features unlock
   - [ ] Cancel subscription

### Test Stripe Integration

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

---

## Step 10: Launch Preparation (1 week)

### Create App Store Assets

1. **Screenshots** (required)
   - iPhone: 6.7", 6.5", 5.5"
   - iPad: 12.9", 11"
   - Use simulator to capture

2. **App Icon**
   - 1024x1024 px
   - No transparency
   - No rounded corners

3. **App Description**
   - Short description (80 chars)
   - Full description (4000 chars)
   - Keywords
   - Category: Developer Tools

### Legal Documents

Create these pages:

1. **Privacy Policy**
   - What data you collect
   - How you use it
   - Third-party services
   - User rights

2. **Terms of Service**
   - Usage terms
   - Subscription terms
   - Refund policy
   - Liability limitations

Use templates from:
- [getterms.io](https://getterms.io)
- [termly.io](https://termly.io)

### Marketing Website

Create landing page with:
- Hero section with demo video
- Features overview
- Pricing table
- FAQ
- Sign up button

Quick setup with:
- Vercel + Next.js
- Carrd.co (easiest)
- Webflow (no code)

---

## Step 11: Soft Launch (Week 1)

### Beta Testing

1. Use TestFlight (iOS) and Google Play Internal Testing
2. Invite 20-50 users
3. Collect feedback
4. Fix critical bugs

### Community Building

1. **Create Discord Server**
   - #announcements
   - #feedback
   - #bug-reports
   - #general

2. **Start Twitter/X Account**
   - Post daily updates
   - Share coding tips
   - Build in public

3. **Product Hunt Preparation**
   - Create maker account
   - Prepare assets
   - Schedule launch

---

## Step 12: Public Launch

### Launch Checklist

- [ ] App approved on App Store
- [ ] App approved on Google Play
- [ ] Stripe webhooks working
- [ ] AI API working
- [ ] Analytics set up
- [ ] Privacy policy live
- [ ] Terms of service live
- [ ] Landing page live
- [ ] Support email set up
- [ ] Discord server ready

### Launch on Product Hunt

1. Schedule for Tuesday-Thursday (best days)
2. Launch at 12:01 AM PST
3. Prepare:
   - Maker intro comment
   - Demo video
   - Screenshots
   - Promo code for hunters

### Other Launch Platforms

- Hacker News (Show HN)
- Reddit (r/SideProject, r/reactnative)
- Indie Hackers
- Dev.to
- Twitter/X

---

## Step 13: Growth & Monetization

### Week 1-2: Validation
- Target: 100 signups
- Monitor analytics
- Fix critical issues
- Collect feedback

### Month 1: Product-Market Fit
- Target: 1,000 signups
- Conversion rate: 2-5% to paid
- First $1K MRR

### Month 3: Growth
- Target: 5,000 signups
- $10K MRR
- Start paid marketing

### Month 6: Scale
- Target: 20,000 signups
- $50K MRR
- Team expansion

---

## 💰 How to Make Money - Action Plan

### Phase 1: Free Users (Month 1-3)

**Focus**: User acquisition
- Generous free tier (50 requests/month)
- Viral features (sharing, referrals)
- Content marketing
- Community building

**Goal**: 1,000-5,000 free users

### Phase 2: Conversion (Month 4-6)

**Focus**: Free → Pro conversion
- Optimize onboarding
- Add power user features
- Email campaigns
- In-app upgrade prompts

**Tactics**:
- "You've used 45/50 requests" notification
- "Upgrade to Pro" banner
- Limited-time discounts
- Feature comparison table

**Goal**: 2-5% conversion rate

### Phase 3: Retention (Month 7-12)

**Focus**: Keep paid users
- Excellent support
- Regular feature updates
- Community engagement
- User feedback loops

**Tactics**:
- Monthly newsletter
- Feature requests voting
- Beta testing program
- Success stories

**Goal**: <5% monthly churn

### Phase 4: Expansion (Year 2)

**Focus**: Increase revenue per user
- Team tier promotion
- Annual plans (2 months free)
- Add-ons and upsells
- Enterprise sales

**Goal**: $100K+ MRR

---

## 📊 Success Metrics

### Key Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| Signups | 100/week | Mixpanel |
| Activation Rate | >40% | Mixpanel |
| Free → Pro | 3-5% | RevenueCat |
| Monthly Churn | <5% | RevenueCat |
| LTV:CAC | 3:1 | Spreadsheet |
| NPS Score | >50 | Delighted |

### Weekly Review

Every Monday, review:
1. New signups
2. Conversions
3. Churn
4. Revenue
5. Support tickets
6. App crashes

---

## 🆘 Troubleshooting

### App won't start
```bash
# Clear cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Supabase connection failed
- Check API keys in .env
- Verify project URL
- Check network connection

### Stripe webhook not working
- Use Stripe CLI for local testing
- Verify webhook secret
- Check endpoint URL

### AI API errors
- Check API key validity
- Verify account has credits
- Check rate limits

---

## 📚 Additional Resources

### Learning
- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Stripe Integration Guide](https://stripe.com/docs)
- [RevenueCat Docs](https://docs.revenuecat.com)

### Communities
- [Expo Discord](https://discord.gg/expo)
- [Reactiflux Discord](https://www.reactiflux.com)
- [Indie Hackers](https://www.indiehackers.com)

### Tools
- [App Icon Generator](https://appicon.co)
- [Screenshot Frames](https://screenshots.pro)
- [Privacy Policy Generator](https://getterms.io)

---

## 🎉 Next Steps

1. ⚡ **Quick Win**: Get the app running on your phone (Steps 1-2)
2. 🔧 **Set Up Backend**: Supabase + AI API (Steps 3-4)
3. 💳 **Enable Payments**: Stripe + RevenueCat (Steps 5-6)
4. 🚀 **Prepare Launch**: App stores + marketing (Steps 7-11)
5. 📈 **Grow & Scale**: Execute growth plan (Steps 12-13)

**You got this! Start with Step 1 and work your way through. Each step brings you closer to launch!** 🚀

---

## Questions?

This is a comprehensive guide, but you may have questions. Here's how to get help:

1. Check the troubleshooting section above
2. Read the detailed docs (ARCHITECTURE.md, BUSINESS_MODEL.md)
3. Search the issue on Stack Overflow
4. Ask in the Expo or Reactiflux Discord
5. Open an issue on GitHub

**Good luck with your launch!** 🎊
