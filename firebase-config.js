// firebase-config.js

// Importeer de benodigde Firebase SDK's
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase-configuratie
const firebaseConfig = {
  apiKey: "AIzaSyBjFUbm21-liv94pgMf9W0a1LHC7mpdN1E",
  authDomain: "taxi-calculator-452223.firebaseapp.com",
  projectId: "taxi-calculator-452223",
  storageBucket: "taxi-calculator-452223.firebasestorage.app",
  messagingSenderId: "560317385944",
  appId: "1:560317385944:web:bc0e369d7593792065dbad",
  measurementId: "G-THG64RYL7K"
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

// Initialiseer de verschillende Firebase-diensten
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Exporteer de diensten voor gebruik in andere bestanden
export { db, storage, auth };
