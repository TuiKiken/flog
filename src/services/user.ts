import { collection, doc, setDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { firebaseFirestore } from 'services/firebase';

export const addUserItem = async () => {
  const user = getAuth().currentUser;

  if (user !== null) {
    const userDocRef = doc(firebaseFirestore, 'user', user.uid);

    await setDoc(userDocRef, {
      community: 'community_id',
      timestamp: serverTimestamp(),
    });

    return user.uid;
  }
};

export const getUserItem = async () => {
  const user = getAuth().currentUser;
  const userCollectionRef = collection(firebaseFirestore, 'user');
  const docsQuery = query(userCollectionRef, where('uid', '==', user?.uid))
  const docsRef = await getDocs(docsQuery);

  console.warn(docsRef.docs[0])

  // return docsRef.id;
};
