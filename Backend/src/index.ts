import express, { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from './db-connection';
import { seedDatabase } from './seed';
import blogRoutes from './routes/blog.routes';
import blogCommentRoutes from './routes/blogComment.routes';
import commentRoutes from './routes/comment.routes';
import rephraseRoutes from './routes/rephrase.routes';

const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  if (_req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/:blogId/comments', blogCommentRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/rephrase', rephraseRoutes);

app.listen(PORT, async () => {
  await connectToDatabase();
  await seedDatabase();

});
