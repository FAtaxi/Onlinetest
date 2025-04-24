// firebase-functions.js

import { db, storage, auth } from './firebase-config.js'; // Importeer Firebase-diensten
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Functie voor het toevoegen van een chauffeur aan Firestore
async function addChauffeur(chauffeurData) {
  try {
    const docRef = await addDoc(collection(db, "chauffeurs"), chauffeurData);
    console.log("Chauffeur toegevoegd met ID:", docRef.id);
  } catch (e) {
    console.error("Fout bij het toevoegen van chauffeur:", e);
  }
}

// Functie voor het uploaden van een afbeelding naar Firebase Storage
async function uploadFile(file) {
  const fileRef = ref(storage, 'chauffeur-afbeeldingen/' + file.name);
  try {
    await uploadBytes(fileRef, file);
    console.log("Bestand succesvol geüpload!");
  } catch (e) {
    console.error("Fout bij het uploaden van bestand:", e);
  }
}

// Functie voor het registreren van een gebruiker (chauffeur)
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Gebruiker geregistreerd:", userCredential.user);
  } catch (e) {
    console.error("Fout bij het registreren van gebruiker:", e);
  }
}

// Exporteer de functies voor gebruik in andere bestanden
export { addChauffeur, uploadFile, registerUser };
