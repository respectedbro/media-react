import {ProfileHeader} from '@/profile/components/ProfileHeader/ProfileHeader.tsx';
import {ProfileInfo} from '@/profile/components/ProfileInfo/ProfileInfo.tsx';
import {ProfileDetails} from '@/profile/components/ProfileDetails/ProfileDetails.tsx';
import {AllUsersList} from '@/profile/components/AllUsersList/AllUsersList.tsx';
import {FriendsList} from '@/profile/components/FriendsList/FriendsList.tsx';
import {PostsForm} from '@/profile/components/PostsForm/PostsForm.tsx';
import {PostList} from '@/profile/components/PostsList/Posts/PostList.tsx';

import { useUserData } from '@/profile/hooks/useUserData';
import { usePosts } from '@/profile/hooks/usePosts';
import { useAllUsers } from '@/profile/hooks/useAllUsers';
import { useProfileUI } from '@/profile/hooks/useProfileUI';

import type { PostCreatePayload } from '@/types/types';

import styles from './UserProfile.module.scss';

// import {useEffect, useState} from 'react';
// import {doc, getDoc, getDocs, query, collection, where, Timestamp, addDoc, deleteDoc} from 'firebase/firestore';
// import {auth, db} from '@/firebase/config.ts';
// import {type Post, type UserData, type PostCreatePayload} from '@/types/types.ts';


const UserProfile = () => {
    // const [userData, setUserData] = useState<UserData | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [allUsers, setAllUsers] = useState<UserData[]>([]);
    // const [newPost, setNewPost] = useState({title: '', content: ''});
    // const [posts, setPosts] = useState<Post[]>([]);
    // const [creatingPost, setCreatingPost] = useState(false);

    const {user, loading} = useUserData()
    const {posts, createPost, deletePost} = usePosts(user?.uid)
    const {users: allUsers} = useAllUsers(user?.uid)

    const ui = useProfileUI()



    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка профиля...</p>
            </div>
        );
    }

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    const handleCreatePost = async (data: { title: string; content: string }) => {
        const payload: PostCreatePayload = {
            title: data.title,
            content: data.content,
            userId: user.uid,
            authorName: user.fullName,
            likes: 0,
            comments: 0,
        };

        await createPost(payload);
        ui.closeCreatePost();
    };

    return (
        <div className={styles.container}>
            <ProfileHeader />

            <div className={styles.profileWrapper}>
                <ProfileInfo userData={user} />
                <ProfileDetails userData={user} />
                <FriendsList />
                <AllUsersList allUsers={allUsers} />
            </div>

            <div className={styles.postsWrapper}>
                <div className={styles.postsHeader}>

                    <div className={styles.createPostToggle}>
                        <h2>Мои посты</h2>
                        <button className={styles.createPostButton} onClick={ui.toggleCreatePost}>
                            {ui.creatingPost ? 'Отмена' : '+ Создать пост'}
                        </button>
                    </div>


                </div>

                {ui.creatingPost && (
                    <PostsForm

                        onCreate={handleCreatePost}
                        onCancel={ui.closeCreatePost}
                    />
                )}

                <PostList posts={posts} onDelete={deletePost} />
            </div>
        </div>


    );
};

export default UserProfile;