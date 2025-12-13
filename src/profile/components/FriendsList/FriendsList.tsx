
import styles from './FriendsList.module.scss'

export const FriendsList = () => {

return (
    <div className={styles.friendsSection}>
        <div className={styles.friendsHeader}>
            <h3 className={styles.friendsTitle}>Друзья(0)</h3>
        </div>

        <div className={styles.friendsList}>

                <div className={styles.friendCard}>
                    <div className={styles.friendAvatar}>
                        <span className={styles.friendInitial}>F</span>
                        <div className={styles.friendStatus}></div>
                    </div>
                    <div className={styles.friendInfo}>
                        <span className={styles.friendName}></span>
                        <span className={styles.friendStatusText}></span>
                    </div>
                    <button className={styles.deleteBtn}>
                        Удалить
                    </button>
                </div>

        </div>
    </div>
)
}