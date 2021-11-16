import { collection, doc, getDoc, addDoc, getDocs, query, where, serverTimestamp, FirestoreDataConverter } from 'firebase/firestore';

import { FlogData, FlogGeneratedData, FlogId } from 'types/flog';
import { firebaseFirestore } from 'services/firebase';
import { getAuthUser } from 'services/user';

const flogConverter: FirestoreDataConverter<Omit<FlogData, 'id'>> = {
  toFirestore: (data) => ({
    ...data,
    timestamp: serverTimestamp(),
  }),
  fromFirestore: (snapshot, options) => {
    const { timestamp, ...data } = snapshot.data(options);

    return { ...data, id: snapshot.id } as FlogData;
  }
};

const flogCollectionRef = collection(firebaseFirestore, 'fishing_log').withConverter(flogConverter);

export const addFlogItem = async (data: Omit<FlogData, FlogGeneratedData>) => {
  const user = await getAuthUser();
  const docRef = await addDoc(flogCollectionRef, { ...data, author_uid: user?.uid });

  return docRef.id;
};

export const getFlogItems = async () => {
  const user = await getAuthUser();
  const docsQuery = query(
    flogCollectionRef,
    where('author_uid', '==', user?.uid),
  );
  const docsRef = await getDocs(docsQuery);

  return docsRef.docs.map(doc => doc.data());
};

export const getFlogItem = async (id: FlogId) => {
  const docRef = doc(flogCollectionRef, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
