import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from 'configs/firebase';

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseFirestore = getFirestore();
