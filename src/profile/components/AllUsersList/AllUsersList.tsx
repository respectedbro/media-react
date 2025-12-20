import {type UserData} from '@/types/types.ts';
import styles from './AllUsersList.module.scss';

interface AllUsersListProps {
    allUsers: UserData[];
    currentUserId:string,
    friendsIds:string[],
    onAddFriend: (userId:string) => void
    isMyProfile:boolean
}

export const AllUsersList = ({isMyProfile, allUsers, currentUserId, friendsIds, onAddFriend}: AllUsersListProps) => {

    return (
        <div className={styles.usersSection}>
            <div className={styles.usersHeader}>
                <h3 className={styles.usersTitle}>
                    Все пользователи: ({allUsers.length})
                </h3>
            </div>

            <div className={styles.usersList}>
                {allUsers
                    .filter(u => u.uid !== currentUserId)
                    .slice(0, 4)
                    .map(user => {
                        const isFriend = friendsIds.includes(user.uid)

                        return (
                            <div key={user.uid} className={styles.userCard}>
                                <div className={styles.userAvatar}>
                                    <span className={styles.userInitial}>
                                        {user.fullName[0]}
                                    </span>
                                </div>

                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>
                                        {user.fullName}
                                    </span>
                                </div>
                                {isMyProfile && (
                                    <button
                                        className={styles.addBtn}
                                        disabled={isFriend}
                                        onClick={() => onAddFriend(user.uid)}
                                    >
                                        {isFriend ? 'В друзьях' : 'Добавить'}
                                    </button>
                                )}

                            </div>
                        )
                    })}
            </div>
        </div>
    )}