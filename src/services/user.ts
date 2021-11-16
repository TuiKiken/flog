import { collection, doc, setDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';

import { firebaseFirestore } from 'services/firebase';

export const getAuthUser = () => new Promise<User | null>((resolve) => {
  const user = getAuth().currentUser;

  if (user === null) {
    getAuth().onAuthStateChanged(resolve);
  }

  if (user !== null) {
    resolve(user);
  }
});

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
