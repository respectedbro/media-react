import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import App from './App.tsx';
import Login from './auth/components/Login/Login.tsx';
import Signup from './auth/components/Signup/Signup.tsx';
import AuthRoute from './auth/components/AuthRoute/AuthRoute.tsx';

import './index.scss'


const firebaseConfig = {
    apiKey: "AIzaSyBggp5ScfXt-4nXdY-wUScRCXguJ_-p0F0",
    authDomain: "social-m-af08b.firebaseapp.com",
    projectId: "social-m-af08b",
    storageBucket: "social-m-af08b.firebasestorage.app",
    messagingSenderId: "567079209522",
    appId: "1:567079209522:web:6f8a11e91f9cc532bd0a2b"
};

initializeApp(firebaseConfig);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthRoute><App/></AuthRoute>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)