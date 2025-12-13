import {auth} from '@/firebase/config.ts';
import {signOut} from 'firebase/auth'
import styles from './ProfileHeader.module.scss'

export const ProfileHeader = () => {
    const handleLogout =async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err, 'Что-то пошло не так');
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
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