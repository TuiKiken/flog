import { collection, addDoc } from 'firebase/firestore';

import { FlogData } from 'types/flog';
import { firebaseFirestore } from 'services/firebase';

export const addFlog = async (data: FlogData) => {
  const docRef = await addDoc(collection(firebaseFirestore, 'fishing_log'), data);

  return docRef.id
};
