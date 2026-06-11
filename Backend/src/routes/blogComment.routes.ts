import { Router, Request, Response } from 'express';
import BlogComment from '../models/BlogComment';

// mergeParams gives access to :blogId from the parent router
const router = Router({ mergeParams: true });

// GET /api/blogs/:blogId/comments
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await BlogComment.find({ blogEntryId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// GET /api/blogs/:blogId/comments/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await BlogComment.findOne({
      _id: req.params.id,
      blogEntryId: req.params.blogId,
    });
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.json(comment);
  } catch {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
});

// POST /api/blogs/:blogId/comments
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = new BlogComment({
      ...req.body,
      blogEntryId: req.params.blogId,
      authorAvatarBase64: req.body.authorAvatarBase64 ?? 'none',
      metadata: req.body.metadata ?? {
        sentiment: 'neutral',
        flagged: false,
        moderatedAt: null,
        source: 'web',
        ipRegion: 'unknown',
      },
    });
    await comment.save();
    res.status(201).json(comment);
  } catch {
    res.status(400).json({ error: 'Failed to create comment' });
  }
});

// PUT /api/blogs/:blogId/comments/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await BlogComment.findOneAndUpdate(
      { _id: req.params.id, blogEntryId: req.params.blogId },
      req.body,
      { new: true, runValidators: true },
    );
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.json(comment);
  } catch {
    res.status(400).json({ error: 'Failed to update comment' });
  }
});

// DELETE /api/blogs/:blogId/comments/:id
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await BlogComment.findOneAndDelete({
      _id: req.params.id,
      blogEntryId: req.params.blogId,
    });
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
