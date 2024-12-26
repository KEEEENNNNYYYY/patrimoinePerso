import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCLbxqNQocmCWqHDbd9VDMPNPsbiM1eRM",
    authDomain: "mypatrimoineapi.firebaseapp.com",
    projectId: "mypatrimoineapi",
    storageBucket: "mypatrimoineapi.firebasestorage.app",
    messagingSenderId: "826361502787",
    appId: "1:826361502787:web:421a3e32b30e6d437748f6",
    measurementId: "G-LCY9MMYRRY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);