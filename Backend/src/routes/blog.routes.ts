import { Router, Request, Response } from 'express';
import BlogEntry from '../models/BlogEntry';

const router = Router();

// Proxy images through the backend and embed them as base64 so the browser
// does not need a separate cross-origin request to the image host.
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch {
    return null;
  }
}

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip  = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      BlogEntry.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      BlogEntry.countDocuments(),
    ]);

    res.setHeader('X-Total-Count', String(total));
    const blogsWithImages = await Promise.all(
      blogs.map(async (blog) => {
        const obj = blog.toObject();
        const imgData = await fetchImageAsBase64(blog.img);
        return imgData ? { ...obj, imgData } : obj;
      }),
    );
    res.json(blogsWithImages);
  } catch {
    res.status(500).json({ error: 'Failed to fetch blog entries' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await BlogEntry.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: 'Blog entry not found' });
      return;
    }
    const obj = blog.toObject();
    const imgData = await fetchImageAsBase64(blog.img);
    res.json(imgData ? { ...obj, imgData } : obj);
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
