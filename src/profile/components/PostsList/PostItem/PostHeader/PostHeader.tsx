import type {Timestamp} from 'firebase/firestore';

import styles from './PostHeader.module.scss';


interface PostHeaderProps {
    authorName: string;
    createdAt: Timestamp;
    onDelete: () => void;
    isMyProfile:boolean
}


export const PostHeader = ({isMyProfile, authorName, createdAt, onDelete}: PostHeaderProps) => {
    return (
        <>
            <div className={styles.postHeader}>
                <div className={styles.postAuthor}>
                    <div className={styles.postAuthorAvatar}>
                        {authorName[0]}
                    </div>

                    <div className={styles.postAuthorInfo}>
                        <h4 className={styles.postAuthorName}>
                            {authorName}
                        </h4>

                        <time className={styles.postDate}>
                            {createdAt.toDate().toLocaleString()}
                        </time>
                    </div>
                </div>
                {isMyProfile && (
                    <button
                        className={styles.deletePostBtn}
                        onClick={onDelete}
                    >
                        ×
                    </button>
                )}

            </div>



        </>
    );
};