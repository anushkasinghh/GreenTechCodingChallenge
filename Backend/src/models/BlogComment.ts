import mongoose, { Document, Schema } from 'mongoose';

export interface ICommentMetadata {
  sentiment: string;
  flagged: boolean;
  moderatedAt: Date | null;
  source: string;
  ipRegion: string;
}

export interface IBlogComment extends Document {
  blogEntryId: mongoose.Types.ObjectId;
  content: string;
  author: string;
  authorAvatarBase64: string;
  metadata: ICommentMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const CommentMetadataSchema = new Schema<ICommentMetadata>(
  {
    sentiment: { type: String, required: true },
    flagged: { type: Boolean, required: true },
    moderatedAt: { type: Date, default: null },
    source: { type: String, required: true },
    ipRegion: { type: String, required: true },
  },
  { _id: false },
);

const BlogCommentSchema = new Schema<IBlogComment>(
  {
    blogEntryId: { type: Schema.Types.ObjectId, ref: 'BlogEntry', required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatarBase64: { type: String, required: true },
    metadata: { type: CommentMetadataSchema, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBlogComment>('BlogComment', BlogCommentSchema);
