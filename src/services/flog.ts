import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { geohashForLocation } from 'geofire-common';

import { FlogData } from 'types/flog';
import { firebaseFirestore } from 'services/firebase';

export const addFlogItem = async (data: FlogData) => {
  const user = getAuth().currentUser;
  const flogCollectionRef = collection(firebaseFirestore, 'fishing_log');

  const geohash = geohashForLocation([data.position.latitude, data.position.longitude]);
  const docRef = await addDoc(flogCollectionRef, {
    ...data,
    position: {
      ...data.position,
      geohash,
    },
    author_uid: user?.uid,
    timestamp: serverTimestamp(),
  });

  return docRef.id;
};

export const getFlogList = async () => {
  const user = getAuth().currentUser;
  const flogCollectionRef = collection(firebaseFirestore, 'fishing_log');
  const docsQuery = query(flogCollectionRef, where('author_uid', '==', user?.uid))
  const docsRef = await getDocs(docsQuery);

  return docsRef.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};
