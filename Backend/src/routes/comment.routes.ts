import { Router, Request, Response } from 'express';
import BlogComment from '../models/BlogComment';

const router = Router();

// GET /api/comments — returns ALL comments across all blog entries
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const comments = await BlogComment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

export default router;
