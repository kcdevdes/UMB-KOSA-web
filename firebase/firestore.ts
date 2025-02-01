import app from '../firebase/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const firestore = getFirestore(app);
export default firestore;
