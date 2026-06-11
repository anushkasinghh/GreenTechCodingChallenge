import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
  name: string;
  avatar: string;
  avatarBase64: string;
}

export interface ISeoMetadata {
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
}

export interface IRevision {
  editor: string;
  editedAt: Date;
  changeNote: string;
}

export interface IBlogEntry extends Document {
  img: string;
  tag: string;
  title: string;
  content: string;
  authors: IAuthor[];
  thumbnailBase64: string;
  seoMetadata: ISeoMetadata;
  revisionHistory: IRevision[];
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    avatarBase64: { type: String, required: true },
  },
  { _id: false },
);

const SeoMetadataSchema = new Schema<ISeoMetadata>(
  {
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    canonicalUrl: { type: String, required: true },
    ogTitle: { type: String, required: true },
    ogDescription: { type: String, required: true },
  },
  { _id: false },
);

const RevisionSchema = new Schema<IRevision>(
  {
    editor: { type: String, required: true },
    editedAt: { type: Date, required: true },
    changeNote: { type: String, required: true },
  },
  { _id: false },
);

const BlogEntrySchema = new Schema<IBlogEntry>(
  {
    img: { type: String, required: true },
    tag: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    authors: { type: [AuthorSchema], required: true },
    thumbnailBase64: { type: String, required: true },
    seoMetadata: { type: SeoMetadataSchema, required: true },
    revisionHistory: { type: [RevisionSchema], required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBlogEntry>('BlogEntry', BlogEntrySchema);
