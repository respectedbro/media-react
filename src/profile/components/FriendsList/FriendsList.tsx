
import styles from './FriendsList.module.scss'
import type {UserData} from "@/types/types.ts";
import {useNavigate} from "react-router-dom";

interface  FriendsListProps {
    friends: UserData[],
    onRemoveFriend?: (targetId: string) => void
}

export const FriendsList = ({onRemoveFriend, friends}:FriendsListProps) => {
const navigate = useNavigate()
return (
    <div className={styles.friendsSection}>
        <div className={styles.friendsHeader}>
            <h3 className={styles.friendsTitle}>Друзья({friends.length})</h3>
        </div>

        <div className={styles.friendsList}>
            {friends.length === 0 ? (
                <div className={styles.empty}>
                    Друзей пока нет
                </div>
            ) : (friends.map(friend => (
                <div key={friend.uid} className={styles.friendCard} onClick={() => navigate(`/profile/${friend.uid}`)}>
                    <div className={styles.friendAvatar}>
                        <span className={styles.friendInitial}>{friend.fullName[0]}</span>
                    </div>
                    <div className={styles.friendInfo}>
                        <span className={styles.friendName}>{friend.fullName}</span>
                    </div>
                    {onRemoveFriend && (
                        <button className={styles.deleteBtn} onClick={(e) => {
                            e.stopPropagation()
                            onRemoveFriend?.(friend.uid)
                        }}>
                            Удалить
                        </button>
                    )}

                </div>
            )))}



        </div>
    </div>
)
}