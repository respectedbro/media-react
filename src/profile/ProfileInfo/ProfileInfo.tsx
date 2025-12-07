import styles from './ProfileInfo.module.scss'

interface ProfileInfoProps {
    userData: {
        uid:string,
        email:string,
        fullName: string;
        age: number;
        city: string;
        createdAt: string;
    } | null
}

export const ProfileInfo = ({userData}:ProfileInfoProps) => {
    if (!userData) {
        return <div>Данные не найдены</div>
    }
    return (
        <div className={styles.profileSection}>
            <div className={styles.profileAvatar}>
                <div className={styles.avatarImage}>
                    {userData.fullName[0].toUpperCase()}
                </div>
                <div className={styles.avatarStatus}></div>
            </div>


            <div className={styles.profileBasicInfo}>
                <h1 className={styles.profileName}>{userData.fullName}</h1>
                <p className={styles.profileEmail}>{userData.email}</p>


                <div className={styles.profileStats}>

                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>0</span>
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

