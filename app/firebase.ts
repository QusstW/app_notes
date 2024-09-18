import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDmzftndXj0kswrQKPlPcDK7gmzFDY-2XA",
    authDomain: "react-native-notes-5abc9.firebaseapp.com",
    databaseURL: "https://react-native-notes-5abc9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-native-notes-5abc9",
    storageBucket: "react-native-notes-5abc9.appspot.com",
    messagingSenderId: "844378307689",
    appId: "1:844378307689:web:9c238abfdb0e22077ef6f8",
    measurementId: "G-CQF98BLLMX"
  }

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };