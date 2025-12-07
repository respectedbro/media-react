
import styles from './FriendsList.module.scss'

export const FriendsList = () => {

    return (
        <div className={styles.friendsSection}>
            <div className={styles.friendsHeader}>
                <h3 className={styles.friendsTitle}>Друзья (0)</h3>
            </div>

            <div className={styles.friendsList}></div>
        </div>
    )
}