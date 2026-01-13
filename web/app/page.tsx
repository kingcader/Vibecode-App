'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gradient">Vibecode</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
              <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Code Anywhere with{' '}
              <span className="text-gradient">AI Power</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Your mobile AI coding assistant. Build apps faster with Claude and GPT-4
              right on your phone or tablet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
                Download for iOS
              </button>
              <button className="bg-dark-lighter hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition border border-gray-700">
                Download for Android
              </button>
            </div>
            <p className="text-gray-500 mt-4">
              Free tier available • No credit card required
            </p>
          </motion.div>

          {/* App Screenshot Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800">
              <div className="aspect-video bg-dark-lighter rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-lg">App Demo Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Coding',
                description: 'Generate code, debug errors, and get instant suggestions with Claude and GPT-4',
              },
              {
                icon: '📱',
                title: 'Mobile-First',
                description: 'Full-featured code editor optimized for mobile with syntax highlighting',
              },
              {
                icon: '💬',
                title: 'Chat Assistant',
                description: 'Conversational AI that understands your code and helps you build faster',
              },
              {
                icon: '🚀',
                title: 'Code Execution',
                description: 'Test your code instantly with built-in sandbox environment',
              },
              {
                icon: '📂',
                title: 'Project Management',
                description: 'Organize your projects and sync across devices seamlessly',
              },
              {
                icon: '🔌',
                title: 'GitHub Integration',
                description: 'Push directly to GitHub and manage your repositories',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Start free, upgrade when you need more
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                features: [
                  '50 AI requests/month',
                  'Basic code editor',
                  'Up to 3 projects',
                  'Community support',
                ],
                cta: 'Get Started',
                popular: false,
              },
              {
                name: 'Pro',
                price: '$20',
                features: [
                  'Unlimited AI requests',
                  'Advanced code editor',
                  'Unlimited projects',
                  'Code execution',
                  'Priority AI processing',
                  'Email support',
                  'GitHub integration',
                ],
                cta: 'Start Free Trial',
                popular: true,
              },
              {
                name: 'Team',
                price: '$49',
                features: [
                  'Everything in Pro',
                  'Team workspaces',
                  'Collaborative coding',
                  'Team analytics',
                  'Custom AI training',
                  'SSO integration',
                  'Priority support',
                ],
                cta: 'Contact Sales',
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-dark-lighter p-8 rounded-xl border-2 ${
                  plan.popular ? 'border-primary' : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-dark hover:bg-gray-800 text-white border border-gray-700'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I really code on my phone?',
                a: 'Absolutely! Vibecode is optimized for mobile with a custom code editor, smart autocomplete, and gesture controls.',
              },
              {
                q: 'Which AI models are supported?',
                a: 'We support Claude 3.5 Sonnet, GPT-4 Turbo, and more. You can switch between models based on your needs.',
              },
              {
                q: 'Is my code stored securely?',
                a: 'Yes. All code is encrypted in transit and at rest. We never use your code for training AI models.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time with no questions asked.',
              },
              {
                q: 'Do you offer student discounts?',
                a: 'Yes! Students get 50% off Pro plans with a valid .edu email address.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark p-6 rounded-xl border border-gray-800"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Code Anywhere?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of developers building with AI assistance
            </p>
            <button className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
              Start Building for Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gradient">Vibecode</h3>
              <p className="text-gray-400">
                AI-powered coding assistant for mobile developers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Vibecode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
