import * as React from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import styles from '@/profile/screens/UserProfile.module.scss';

export interface IAuthRouteProps {
    children:React.ReactNode
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> =(props) => {
    const {children} = props
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    if (!auth) {
        console.log('err');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false)
            } else {
                console.log('не авторизован');
                setLoading(false)
                navigate('/login')
            }
        })
        return () => unsubscribe()
    }, [auth, navigate]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка профиля...</p>
            </div>
        )
    }

    return <div>{children}</div>
}

export default AuthRoute