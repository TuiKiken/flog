import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { FlogData } from 'types/flog';
import { firebaseFirestore } from 'services/firebase';

export const addFlogItem = async (data: FlogData) => {
  const user = getAuth().currentUser;
  const flogCollectionRef = collection(firebaseFirestore, 'fishing_log');
  const docRef = await addDoc(flogCollectionRef, {
    ...data,
    author_uid: user?.uid,
    timestamp: serverTimestamp(),
  });

  return docRef.id
};

export const getFlogList = async () => {
  const user = getAuth().currentUser;
  const flogCollectionRef = collection(firebaseFirestore, 'fishing_log');
  const docsQuery = query(flogCollectionRef, where('author_uid', '==', user?.uid))
  const docsRef = await getDocs(docsQuery);

  return docsRef.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};
