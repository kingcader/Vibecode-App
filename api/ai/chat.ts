import { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [], model = 'claude-3-5-sonnet-20241022' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const anthropic = new Anthropic({ apiKey });

    // Build messages array
    const messages = [
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      messages,
      system: 'You are a helpful AI coding assistant. Help users write better code, debug issues, and learn programming concepts.',
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      data: {
        message: assistantMessage,
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        },
        model: response.model,
      },
    });
  } catch (error: any) {
    console.error('AI chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat request',
    });
  }
}
