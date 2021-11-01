import { connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import { firebaseFirestore } from 'services/firebase';


// auth
const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');

// firestore
connectFirestoreEmulator(firebaseFirestore, 'localhost', 8080);
