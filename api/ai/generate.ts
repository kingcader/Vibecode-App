import { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, language = 'javascript', context = '' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const anthropic = new Anthropic({ apiKey });

    const systemPrompt = `You are an expert ${language} programmer. Generate clean, efficient, and well-commented code based on user requirements. Only output the code, no explanations unless asked.`;

    const userPrompt = context
      ? `Context:\n${context}\n\nTask: ${prompt}`
      : prompt;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        { role: 'user', content: userPrompt },
      ],
      system: systemPrompt,
    });

    const generatedCode = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      data: {
        code: generatedCode,
        language,
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        },
      },
    });
  } catch (error: any) {
    console.error('Code generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate code',
    });
  }
}
