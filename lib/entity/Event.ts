import { Timestamp } from 'firebase/firestore';

export default interface Event {
  id: string;
  title: string;
  location: string;
  start_date: Timestamp;
  end_date: Timestamp;
  description: string;
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnails: string[];
  link: string;
}
