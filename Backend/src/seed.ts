import mongoose from 'mongoose';
import BlogEntry from './models/BlogEntry';
import BlogComment from './models/BlogComment';

const DEFAULT_AUTHOR_AVATAR_B64 = 'data:image/bmp;base64,Qk3mHQAAAAAAADYAAAAoAAAAMgAAADIAAAABABgAAAAAALAdAAATCwAAEwsAAAAAAAAAAAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tAAAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAAA==';

const DEFAULT_THUMBNAIL_B64 = 'data:image/bmp;base64,Qk1mKgAAAAAAADYAAAAoAAAAUAAAAC0AAAABABgAAAAAADAqAAATCwAAEwsAAAAAAAAAAAAAoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCg';

const seedData = [
  {
    img: 'https://picsum.photos/id/1/5000/3000',
    tag: 'Engineering',
    title: `Revolutionizing software development with cutting-edge tools`,
    content:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/2/5000/3000',
    tag: 'Product',
    title: `Innovative product features that drive success`,
    content:
      'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/3/5000/3000',
    tag: 'Design',
    title: `Designing for the future: trends and insights`,
    content:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/4/5000/3000',
    tag: 'Company',
    title: `Our company's journey: milestones and achievements`,
    content:
      'Take a look at our company\'s journey and the milestones we\'ve achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.',
    authors: [
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/5/5000/3000',
    tag: 'Engineering',
    title: `Pioneering sustainable engineering solutions`,
    content:
      'Learn about our commitment to sustainability and the innovative engineering solutions we\'re implementing to create a greener future. Discover the impact of our eco-friendly initiatives.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/6/5000/3000',
    tag: 'Product',
    title: `Maximizing efficiency with our latest product updates`,
    content:
      'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/7/5000/3000',
    tag: 'Engineering',
    title: `The rise of microservices: building scalable architectures`,
    content:
      'Microservices have fundamentally changed how we build and deploy software. This post explores best practices for decomposing monoliths, managing inter-service communication, and handling distributed failures gracefully.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/8/5000/3000',
    tag: 'Design',
    title: `Color theory in modern UI: beyond aesthetics`,
    content:
      'Color is one of the most powerful tools in a designer\'s arsenal. We break down how to use color psychology, contrast ratios, and accessible palettes to build interfaces that are both beautiful and inclusive.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/9/5000/3000',
    tag: 'Product',
    title: `From idea to launch: our product development playbook`,
    content:
      'Shipping a product on time without cutting corners requires a disciplined process. We walk through the discovery, scoping, and iteration phases that have helped our team consistently deliver high-quality releases.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' },
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/10/5000/3000',
    tag: 'Company',
    title: `Building a remote-first culture that actually works`,
    content:
      'Remote work is more than sending people home with laptops. We share the rituals, tools, and communication norms that keep our fully distributed team aligned, engaged, and productive across time zones.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/11/5000/3000',
    tag: 'Engineering',
    title: `Deep dive into WebAssembly: performance on the web`,
    content:
      'WebAssembly is unlocking near-native performance in the browser. We explore real-world use cases, benchmarks against JavaScript, and how to integrate Wasm modules into an existing React application.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/12/5000/3000',
    tag: 'Design',
    title: `Prototyping at the speed of thought with Figma`,
    content:
      'Great design is iterative. This post covers our Figma workflow — from low-fidelity wireframes to interactive prototypes — and how rapid prototyping has cut our design review cycles in half.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/13/5000/3000',
    tag: 'Product',
    title: `Using data to prioritize your product backlog`,
    content:
      'Gut feel only takes you so far. We discuss the quantitative frameworks — RICE, ICE, and opportunity scoring — our product team uses to rank features and align stakeholders around what ships next.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/14/5000/3000',
    tag: 'Company',
    title: `How we run effective all-hands meetings`,
    content:
      'All-hands meetings can easily become death by PowerPoint. We share the format, pre-read habits, and live Q&A practices that have turned our quarterly all-hands into a genuine highlight for the whole company.',
    authors: [
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/15/5000/3000',
    tag: 'Engineering',
    title: `Observability in production: logs, metrics, and traces`,
    content:
      'When something breaks in production you need answers fast. This guide covers how we structured our observability stack using OpenTelemetry, and how correlated logs, metrics, and distributed traces cut our mean time to resolution.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/16/5000/3000',
    tag: 'Design',
    title: `Motion design principles for responsive interfaces`,
    content:
      'Animation should inform, not distract. We cover the principles of duration, easing, and choreography that guide our motion design system, and how we keep animations performant on low-powered devices.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/17/5000/3000',
    tag: 'Product',
    title: `Writing product specs that engineers actually read`,
    content:
      'A vague spec is a silent tax on your engineering team. We break down the anatomy of a great product requirements document and the habits that keep specs concise, unambiguous, and actionable.',
    authors: [
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/18/5000/3000',
    tag: 'Company',
    title: `Our approach to sustainable business growth`,
    content:
      'Hyper-growth at all costs is a trap. We outline the metrics we track, the growth levers we pull, and why we deliberately chose a slower path that prioritizes customer retention over vanity acquisition numbers.',
    authors: [
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/19/5000/3000',
    tag: 'Engineering',
    title: `Test-driven development in the real world`,
    content:
      'TDD looks elegant in tutorials and messy in practice. We share the pragmatic approach our teams have settled on — what to test, what to skip, and how to keep a test suite fast enough that people actually run it.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/20/5000/3000',
    tag: 'Design',
    title: `Accessible design is just good design`,
    content:
      'Accessibility is not a checklist — it is a design philosophy. We explore WCAG 2.2 criteria through the lens of real user needs and show how accessibility improvements almost always benefit all users, not just those with disabilities.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' },
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/21/5000/3000',
    tag: 'Product',
    title: `The art of saying no: managing feature requests`,
    content:
      'Every \"yes\" to a new feature is a \"no\" to focus. We discuss the empathetic but firm frameworks our PMs use to decline requests, redirect energy, and keep the product vision coherent as the company scales.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/22/5000/3000',
    tag: 'Engineering',
    title: `CI/CD pipelines that ship with confidence`,
    content:
      'A slow or flaky pipeline erodes trust and slows delivery. This post details the pipeline architecture — parallel jobs, canary deploys, and automated rollbacks — that lets our teams merge to production dozens of times a day.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/23/5000/3000',
    tag: 'Company',
    title: `Hiring for culture add, not culture fit`,
    content:
      'Culture fit hiring quietly homogenizes teams. We explain how shifting to culture-add interviews — where candidates are evaluated on what new perspectives they bring — has improved team performance and reduced churn.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/24/5000/3000',
    tag: 'Design',
    title: `Dark mode done right: more than flipping colors`,
    content:
      'A true dark mode is not just an inverted light mode. We cover elevation, shadow handling, image treatment, and the token-based theming system that makes our dark mode feel polished across every surface.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/25/5000/3000',
    tag: 'Engineering',
    title: `GraphQL vs REST: choosing the right API style`,
    content:
      'GraphQL and REST each shine in different contexts. We compare the two across flexibility, caching, tooling, and team expertise, and share the decision framework we use when starting a new service.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/26/5000/3000',
    tag: 'Product',
    title: `Customer interviews that uncover real pain points`,
    content:
      'Most customer interviews confirm what you already believe. We share the questioning techniques, silence tactics, and follow-up probes that help us surface insights we never would have thought to ask about.',
    authors: [
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/27/5000/3000',
    tag: 'Company',
    title: `Transparent salaries: what we learned after going public`,
    content:
      'Publishing salary bands internally was uncomfortable and then liberating. We walk through the process, the objections we heard, and the measurable improvements in trust and retention that followed.',
    authors: [
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/28/5000/3000',
    tag: 'Engineering',
    title: `Managing technical debt without stopping feature work`,
    content:
      'Technical debt is not the enemy — unmanaged debt is. We describe the debt register, the 20% refactor budget, and the \"boy scout rule\" commits that keep our codebase healthy without grinding feature delivery to a halt.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/29/5000/3000',
    tag: 'Design',
    title: `Designing empty states that delight new users`,
    content:
      'Empty states are the first impression for new users and the last impression for churned ones. We look at how to turn blank screens into invitations, using illustration, copy, and clear calls to action.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/30/5000/3000',
    tag: 'Product',
    title: `A/B testing at scale: lessons from 200 experiments`,
    content:
      'Running experiments sounds simple until you do it at scale. We share the statistical pitfalls, novelty effects, and organizational anti-patterns we encountered — and the processes we put in place to run cleaner tests.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/31/5000/3000',
    tag: 'Engineering',
    title: `Zero-downtime database migrations in PostgreSQL`,
    content:
      'Schema changes on a live database are high-stakes. We walk through the expand-contract pattern, online index builds, and feature flags that let us migrate multi-terabyte tables without a maintenance window.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/32/5000/3000',
    tag: 'Company',
    title: `Lessons from our first acquisition`,
    content:
      'Acquiring a company tests every part of your organization. We reflect on the due diligence process, the cultural integration challenges, and the three things we would do differently if we were doing it again.',
    authors: [
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/33/5000/3000',
    tag: 'Design',
    title: `Typography systems that scale across platforms`,
    content:
      'Ad-hoc type choices accumulate into visual chaos. We explain how we built a cross-platform typography system with defined scales, responsive fluid sizing, and semantic tokens that work from mobile app to marketing site.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/34/5000/3000',
    tag: 'Product',
    title: `Onboarding flows that turn signups into active users`,
    content:
      'Most signups never reach the activation moment. We dissect the onboarding funnel, share the personalization triggers that doubled our activation rate, and explain why we removed half our onboarding steps.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/35/5000/3000',
    tag: 'Engineering',
    title: `Building a design system with React and TypeScript`,
    content:
      'A design system is only as good as its developer experience. We cover the component API patterns, Storybook setup, and automated visual regression tests that keep our shared component library trustworthy and easy to adopt.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/36/5000/3000',
    tag: 'Company',
    title: `Open sourcing our internal tools: why and how`,
    content:
      'We open-sourced three internal tools this year and learned a lot about the hidden costs of maintenance, community management, and documentation. Here is an honest post-mortem on what we would do again and what we would not.',
    authors: [
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/37/5000/3000',
    tag: 'Design',
    title: `Icon design at scale: from pixel to system`,
    content:
      'Inconsistent icons erode interface quality in ways users feel but cannot name. We share the grid system, stroke rules, and export pipeline behind our 400-icon library and the governance process that keeps it coherent.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/38/5000/3000',
    tag: 'Product',
    title: `How we define and measure product-market fit`,
    content:
      'Product-market fit is easy to declare and hard to prove. We share the leading indicators — retention curves, NPS cohorts, and qualitative signals — we use to assess whether we have genuinely found it.',
    authors: [
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/39/5000/3000',
    tag: 'Engineering',
    title: `Securing APIs: OAuth 2.0, JWTs, and beyond`,
    content:
      'Authentication and authorization mistakes are the most common source of security breaches. We review the token patterns, scoping strategies, and rotation policies that keep our APIs secure without sacrificing developer ergonomics.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/40/5000/3000',
    tag: 'Company',
    title: `Measuring engineering productivity without micromanaging`,
    content:
      'Lines of code is a terrible metric. We discuss the DORA metrics, developer experience surveys, and deployment health indicators we use to understand team throughput and identify systemic blockers.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/41/5000/3000',
    tag: 'Design',
    title: `Responsive layout patterns for complex data tables`,
    content:
      'Data tables on mobile are notoriously difficult. We walk through the scroll, stack, and progressive-disclosure patterns we evaluated and explain why different strategies suit different data densities and use cases.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/42/5000/3000',
    tag: 'Product',
    title: `Pricing strategy: what we got wrong the first time`,
    content:
      'Our original pricing was chosen by gut feel and repriced twice in eighteen months. We share the customer research, competitive analysis, and willingness-to-pay interviews that finally led us to a model that works.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/43/5000/3000',
    tag: 'Engineering',
    title: `Event-driven architecture with Kafka`,
    content:
      'Moving to an event-driven model decoupled our services and unlocked replay capabilities we could not have imagined with synchronous calls. We cover topic design, consumer group patterns, and the schema registry that keeps producers and consumers in sync.',
    authors: [
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/44/5000/3000',
    tag: 'Company',
    title: `What we learned running a bug bounty program`,
    content:
      'Running a bug bounty program exposed vulnerabilities we never would have found internally. We share the scope decisions, triage process, and payout structure behind our program, plus the cultural shift it sparked in how we think about security.',
    authors: [
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/45/5000/3000',
    tag: 'Design',
    title: `Designing for low-bandwidth and offline-first experiences`,
    content:
      'A billion users access the internet on slow or unreliable connections. We cover the caching strategies, skeleton screens, and sync queues behind our offline-first redesign and the empathy mapping that motivated it.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' },
      { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/46/5000/3000',
    tag: 'Product',
    title: `Building a feedback loop between support and product`,
    content:
      'Support tickets are a goldmine of product intelligence that most companies ignore. We describe the tagging taxonomy, weekly review ritual, and escalation path that turns customer pain into prioritized roadmap items.',
    authors: [
      { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/47/5000/3000',
    tag: 'Engineering',
    title: `Container security: hardening Docker images in production`,
    content:
      'A default Docker image is not a secure Docker image. We walk through the multi-stage build patterns, non-root users, read-only filesystems, and vulnerability scanning steps we apply to every image before it reaches production.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/48/5000/3000',
    tag: 'Company',
    title: `The reality of scaling from 10 to 100 engineers`,
    content:
      'The practices that work for ten engineers break at a hundred. We document the coordination models, platform investments, and organizational changes we made as we grew — and the mistakes that taught us the most.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/id/49/5000/3000',
    tag: 'Design',
    title: `Form design: reducing friction in complex workflows`,
    content:
      'Forms are where users give up. We analyze the field grouping, inline validation, smart defaults, and progress indicators that cut our multi-step form abandonment rate by 40% without removing a single required field.',
    authors: [
      { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }
    ],
  },
];

const commentPool = [
  { content: 'Artificial intelligence is truly transforming how we approach engineering. Great insights!', author: 'Remy Sharp' },
  { content: "User-centric design is the future. This really resonates with our team's approach.", author: 'Travis Howard' },
  { content: 'Minimalism in design has been a game-changer. Love the practical examples shared here.', author: 'Erica Johns' },
  { content: 'Cultivating innovation requires intentional effort. These initiatives are really inspiring.', author: 'Kate Morrison' },
  { content: 'Cybersecurity is more critical than ever. Next-gen solutions are absolutely the way forward.', author: 'Cindy Baker' },
  { content: 'Enhancing customer experience through innovation keeps us consistently ahead of the competition.', author: 'Agnes Walker' },
  { content: 'Sustainability in engineering is something we should all be actively striving for.', author: 'Trevor Henderson' },
  { content: 'These product updates address exactly the pain points our team has been facing for months.', author: 'Remy Sharp' },
  { content: 'Design trends are evolving rapidly. Staying informed is essential for any design team.', author: 'Travis Howard' },
  { content: 'Every milestone in a company journey teaches something new. A great retrospective post.', author: 'Erica Johns' },
  { content: 'This is exactly the kind of content I look for. Very detailed and well-written.', author: 'Kate Morrison' },
  { content: 'Thanks for sharing these insights. Our team will definitely be applying these principles.', author: 'Cindy Baker' },
  { content: 'Really appreciate the depth of analysis here. Looking forward to more posts like this.', author: 'Agnes Walker' },
  { content: 'The practical examples make this much easier to understand and implement in real projects.', author: 'Trevor Henderson' },
  { content: 'This aligns perfectly with what we have been working on. Glad to see the industry validation.', author: 'Remy Sharp' },
  { content: 'A thoughtful and comprehensive overview. Already shared this with my entire team.', author: 'Travis Howard' },
  { content: 'The case studies mentioned here are particularly valuable for benchmarking our own work.', author: 'Erica Johns' },
  { content: 'I have been following this topic for years and this is one of the best write-ups I have seen.', author: 'Kate Morrison' },
  { content: 'Bookmarked for future reference. Incredibly useful breakdown of all the key concepts.', author: 'Cindy Baker' },
  { content: 'Would love to see a follow-up post with more technical details on the implementation side.', author: 'Agnes Walker' },
];

function generateComments(blogEntryIds: mongoose.Types.ObjectId[]) {
  const sentiments = ['positive', 'neutral', 'constructive'];
  const regions    = ['EU-West', 'US-East', 'AP-Southeast'];
  const comments = [];
  for (let i = 0; i < blogEntryIds.length; i++) {
    for (let j = 0; j < 8; j++) {
      const pool = commentPool[(i * 8 + j) % commentPool.length];
      comments.push({
        blogEntryId: blogEntryIds[i],
        content: pool.content,
        author: pool.author,
        authorAvatarBase64: DEFAULT_AUTHOR_AVATAR_B64,
        metadata: {
          sentiment: sentiments[(i * 2 + j) % sentiments.length],
          flagged: false,
          moderatedAt: null,
          source: 'web',
          ipRegion: regions[(i + j) % regions.length],
        },
      });
    }
  }
  return comments;
}

export async function seedDatabase(): Promise<void> {
  const blogCount = await BlogEntry.countDocuments();
  if (blogCount === 0) {
    const enriched = seedData.map((entry) => ({
      ...entry,
      thumbnailBase64: DEFAULT_THUMBNAIL_B64,
      seoMetadata: {
        description: entry.content.substring(0, 160),
        keywords: [entry.tag.toLowerCase(), 'blog', 'greentech', 'sustainability', 'technology'],
        canonicalUrl: `https://greentech.example.com/blog/${entry.title.toLowerCase().replace(/[\s/]+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
        ogTitle: entry.title,
        ogDescription: entry.content.substring(0, 200),
      },
      revisionHistory: [
        { editor: entry.authors[0].name, editedAt: new Date('2024-01-15'), changeNote: 'Initial publish' },
        { editor: 'Editorial Team',      editedAt: new Date('2024-02-01'), changeNote: 'Minor grammar corrections' },
        { editor: entry.authors[0].name, editedAt: new Date('2024-03-10'), changeNote: 'Updated statistics and references' },
      ],
      authors: entry.authors.map((a) => ({ ...a, avatarBase64: DEFAULT_AUTHOR_AVATAR_B64 })),
    }));

    await BlogEntry.insertMany(enriched);
  }

  const commentCount = await BlogComment.countDocuments();
  if (commentCount === 0) {
    const blogEntries = await BlogEntry.find({}, '_id');
    const comments = generateComments(
      blogEntries.map((e) => e._id as mongoose.Types.ObjectId),
    );
    await BlogComment.insertMany(comments);
  }
}
