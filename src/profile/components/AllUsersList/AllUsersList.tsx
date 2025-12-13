import {type UserData} from '@/types/types.ts';
import styles from './AllUsersList.module.scss';

interface AllUsersListProps {
    allUsers: UserData[];
}

export const AllUsersList = ({allUsers}: AllUsersListProps) => {

    return (
        <div className={styles.usersSection}>
            <div className={styles.usersHeader}>
                <h3 className={styles.usersTitle}>Все пользователи: ({allUsers.length})</h3>
            </div>

            <div className={styles.usersList}>
                {allUsers.slice(0, 4).map(user => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            <span className={styles.userInitial}>{user.fullName[0]}</span>
                            <div className={styles.userStatus}></div>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.fullName}</span>
                            <span className={styles.userStatusText}>
                                        {user.status === 'online' ? 'В сети' : 'Не в сети'}
                                    </span>
                        </div>
                        <button className={styles.addBtn}>
                            Добавить
                        </button>
                    </div>
                ))}
            </div>
        </div>

    )}