import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBCRh0sM00Gsymp5Bg0IHMcqvZU1nreIMc",

  authDomain: "efmleague-eca9f.firebaseapp.com",

  databaseURL:
    "https://efmleague-eca9f-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "efmleague-eca9f",

  storageBucket: "efmleague-eca9f.appspot.com",

  messagingSenderId: "356121782448",

  appId: "1:356121782448:web:09d647356e0ebe24c37375",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
