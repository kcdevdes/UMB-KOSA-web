import { Timestamp } from 'firebase/firestore';

export default interface QueryMessage {
  id: string;
  sender: string; // email
  message: string; // written by user
  reply: string; // written by admin
  sentAt: Timestamp;
  isAnswered: boolean;
}
