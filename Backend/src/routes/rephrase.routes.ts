import Anthropic from '@anthropic-ai/sdk';
import { Router, Request, Response } from 'express';

const router = Router();

const MOCK_RESPONSE = 'This is an unnessesary rephrased comment, where the rephrasing does not add too much value, or?';

router.post('/', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'text is required' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log('[rephrase] No ANTHROPIC_API_KEY found — returning mocked result');
    res.json({ rephrasedText: MOCK_RESPONSE, model: 'claude-opus-4-7' });
    return;
  }

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Rephrase the following comment to be clear and polite. Return only the rephrased text, nothing else:\n\n${text}`,
        },
      ],
    });

    const rephrasedText =
      message.content[0].type === 'text' ? message.content[0].text : text;

    res.json({ rephrasedText, model: 'claude-opus-4-7' });
  } catch {
    res.json({ rephrasedText: MOCK_RESPONSE, model: 'claude-opus-4-7' });
  }
});

export default router;
