#!/bin/bash

echo "🚀 Vibecode Vercel Deployment Script"
echo "====================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is already installed"
fi

echo ""
echo "🔐 Please login to Vercel (will open browser)..."
vercel login

echo ""
echo "📂 Navigating to web directory..."
cd web

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "When prompted:"
echo "  - Set up and deploy? → YES"
echo "  - Which scope? → (select your account)"
echo "  - Link to existing project? → NO"
echo "  - What's your project's name? → vibecode-app"
echo "  - In which directory is your code located? → ./"
echo "  - Want to override settings? → NO"
echo ""

vercel --prod

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "⚠️  IMPORTANT: Add environment variables in Vercel Dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "Required variables:"
echo "  - ANTHROPIC_API_KEY"
echo "  - SUPABASE_URL"
echo "  - SUPABASE_ANON_KEY"
echo "  - SUPABASE_SERVICE_KEY"
echo ""
echo "After adding variables, redeploy with: vercel --prod"
echo ""
echo "🎉 Your app will be live at the URL shown above!"
