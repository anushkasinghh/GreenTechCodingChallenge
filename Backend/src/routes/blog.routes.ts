import { Router, Request, Response } from 'express';
import BlogEntry from '../models/BlogEntry';

const router = Router();

// GET /api/blogs?page=1&limit=10
// Returns a paginated list of blog entries.
// Images are returned as URLs only — the browser fetches them directly and caches
// them independently. Embedding images as base64 in JSON bloats each response by
// ~1 MB per post (base64 inflates binary by 33%) and forces a sequential
// server-side fetch of every image on every request, with no caching benefit.
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip  = (page - 1) * limit;

    // Run the data query and count in parallel to avoid two sequential round-trips.
    const [blogs, total] = await Promise.all([
      BlogEntry.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      BlogEntry.countDocuments(),
    ]);

    // X-Total-Count lets the frontend know how many pages exist without a separate call.
    res.setHeader('X-Total-Count', String(total));
    res.json(blogs.map(b => b.toObject()));
  } catch {
    res.status(500).json({ error: 'Failed to fetch blog entries' });
  }
});

// GET /api/blogs/:id
// Returns a single blog entry by ID. Image URL is passed through as-is.
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogEntry.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: 'Blog entry not found' });
      return;
    }
    res.json(blog.toObject());
  } catch {
    res.status(500).json({ error: 'Failed to fetch blog entry' });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = new BlogEntry(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ error: 'Failed to create blog entry' });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      res.status(404).json({ error: 'Blog entry not found' });
      return;
    }
    res.json(blog);
  } catch {
    res.status(400).json({ error: 'Failed to update blog entry' });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogEntry.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ error: 'Blog entry not found' });
      return;
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete blog entry' });
  }
});

export default router;
