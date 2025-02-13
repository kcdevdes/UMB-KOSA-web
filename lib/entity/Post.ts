import { Timestamp } from 'firebase/firestore';

export default interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  thumbnails: string[]; // up to 5 URLs
  author: string; // User ID
}
