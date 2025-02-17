import { Timestamp } from 'firebase/firestore';

export default interface Forum {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnails: string[];
  category: string;
  language: string;
  view: number;
  comments: string;
}
