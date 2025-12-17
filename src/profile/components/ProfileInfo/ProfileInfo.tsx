import styles from './ProfileInfo.module.scss'
import {type UserData} from '@/types/types.ts';

interface ProfileInfoProps {
    userData: UserData | null
    postsCount: number
}


export const ProfileInfo = ({userData, postsCount}:ProfileInfoProps) => {
    return (
        <div className={styles.profileSection}>
            <div className={styles.profileAvatar}>
                <div className={styles.avatarImage}>
                    {userData?.fullName?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className={styles.avatarStatus}></div>
            </div>


            <div className={styles.profileBasicInfo}>
                <h1 className={styles.profileName}>{userData?.fullName ?? 'Не указано'}</h1>
                <p className={styles.profileEmail}>{userData?.email ?? 'Не указано'}</p>


                <div className={styles.profileStats}>

                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>{postsCount}</span>
                        <span className={styles.statLabel}>Постов</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>0</span>
                        <span className={styles.statLabel}>Друзей</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>0</span>
                        <span className={styles.statLabel}>Подписок</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

