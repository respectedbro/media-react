import {type UserData} from '@/types/user.ts'
import styles from './FriendsList.module.scss'

interface FriendsListProps {
    allUsers: UserData[]
}

export const FriendsList = ({allUsers}:FriendsListProps) => {

    return (
        <div className={styles.friendsSection}>
            <div className={styles.friendsHeader}>
                <h3 className={styles.friendsTitle}>Пользователи: {allUsers.length}</h3>
            </div>
            <div className={styles.friendsList}>
                {allUsers.slice(0, 4).map((user) => (
                    <div className={styles.friendCard} key={user.uid}>
                        <div className={styles.friendAvatar}>
                            <span className={styles.friendsInitial}>Аватар</span>
                        </div>
                        <div className={styles.friendInfo}>
                            <span className={styles.friendName}>{user.fullName}</span>
                            <span className={styles.friendStatusText}>
                                {/*TODO:Добавить статус к пользователям*/}
                                Не в сети /
                            </span>

                        </div>
                        <button className={styles.messageBtn}>Добавить</button>
                    </div>
                ))}
            </div>

        </div>
    )
}