import { collection, addDoc } from 'firebase/firestore';

import { FlogData } from 'types/flog';
import { firebaseFirestore } from 'services/firebase';

export const addFlog = async (data: FlogData) => {
  const preparedDate = JSON.parse(JSON.stringify(data));
  const docRef = await addDoc(collection(firebaseFirestore, 'fishing_log'), preparedDate);

  return docRef.id
};
