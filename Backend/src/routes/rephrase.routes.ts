import Anthropic from '@anthropic-ai/sdk';
import { Router, Request, Response } from 'express';

const router = Router();

const MOCK_RESPONSE = 'This is an unnessesary rephrased comment, where the rephrasing does not add too much value, or?';

// Single shared client — instantiating Anthropic() on every request creates a new
// HTTP agent and re-reads env vars unnecessarily.
const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

router.post('/', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'text is required' });
    return;
  }

  if (!client) {
    console.log('[rephrase] No ANTHROPIC_API_KEY found — returning mocked result');
    res.json({ rephrasedText: MOCK_RESPONSE, model: 'claude-haiku-4-5' });
    return;
  }

  try {
    const message = await client.messages.create({
      // Haiku is the smallest, fastest, least energy-intensive Claude model.
      // Rephrasing a short comment does not need Opus-level reasoning.
      model: 'claude-haiku-4-5',
      // A rephrased comment is at most a few sentences — 256 tokens is plenty.
      // Setting max_tokens too high wastes the compute budget the model reserves.
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Rephrase the following comment to be clear and polite. Return only the rephrased text, nothing else:\n\n${text}`,
        },
      ],
    });

    const rephrasedText =
      message.content[0].type === 'text' ? message.content[0].text : text;

    res.json({ rephrasedText, model: 'claude-haiku-4-5' });
  } catch {
    res.json({ rephrasedText: MOCK_RESPONSE, model: 'claude-haiku-4-5' });
  }
});

export default router;
