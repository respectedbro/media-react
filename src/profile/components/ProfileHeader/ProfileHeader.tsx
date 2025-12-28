import {auth} from '@/firebase/config.ts';
import {signOut} from 'firebase/auth'
import styles from './ProfileHeader.module.scss'
import {useNavigate} from 'react-router-dom';

export const ProfileHeader = () => {
    const navigate = useNavigate()

    const handleLogout =async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err, 'Что-то пошло не так');
        }
    }


    return (
        <div className={styles.header}>
            <div className={styles.headerLogo} onClick={() => navigate('/')}>
                <img className={styles.logoImage} src="/vite.svg" alt="logo"/>
                <span className={styles.logoText}>Social Network</span>
            </div>

            <div className={styles.headerExit}>
                <button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                >
                    Выйти
                </button>
            </div>
        </div>
    )
}