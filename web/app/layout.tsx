import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vibecode - AI Coding Agent for Mobile',
  description: 'Code anywhere with AI-powered assistance. Build apps faster with Claude and GPT-4 on your mobile device.',
  keywords: 'AI coding, mobile development, code editor, AI assistant, Claude, GPT-4',
  authors: [{ name: 'Vibecode Team' }],
  openGraph: {
    title: 'Vibecode - AI Coding Agent for Mobile',
    description: 'Code anywhere with AI-powered assistance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibecode - AI Coding Agent for Mobile',
    description: 'Code anywhere with AI-powered assistance',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
