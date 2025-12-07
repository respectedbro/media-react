import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Login from './auth/components/Login/Login.tsx';
import Signup from './auth/components/Signup/Signup.tsx';
import {Friends} from '@/friends/components/Friends.tsx';
import AuthRoute from './auth/components/AuthRoute/AuthRoute.tsx';
import '@/firebase/config.ts'

import './index.scss'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthRoute><App/></AuthRoute>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/friends' element={<Friends/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)