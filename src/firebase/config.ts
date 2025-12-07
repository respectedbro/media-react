import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBggp5ScfXt-4nXdY-wUScRCXguJ_-p0F0",
    authDomain: "social-m-af08b.firebaseapp.com",
    projectId: "social-m-af08b",
    storageBucket: "social-m-af08b.firebasestorage.app",
    messagingSenderId: "567079209522",
    appId: "1:567079209522:web:6f8a11e91f9cc532bd0a2b"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
