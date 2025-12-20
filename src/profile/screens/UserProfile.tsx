import {ProfileHeader} from '@/profile/components/ProfileHeader/ProfileHeader.tsx';
import {ProfileInfo} from '@/profile/components/ProfileInfo/ProfileInfo.tsx';
import {ProfileDetails} from '@/profile/components/ProfileDetails/ProfileDetails.tsx';
import {AllUsersList} from '@/profile/components/AllUsersList/AllUsersList.tsx';
import {FriendsList} from '@/profile/components/FriendsList/FriendsList.tsx';
import {PostsForm} from '@/profile/components/PostsForm/PostsForm.tsx';
import {PostList} from '@/profile/components/PostsList/PostList/PostList.tsx';

import {useUserData} from '@/profile/hooks/useUserData';
import {usePosts} from '@/profile/hooks/usePosts';
import {useAllUsers} from '@/profile/hooks/useAllUsers';
import {useProfileUI} from '@/profile/hooks/useProfileUI';
import {useFriends} from '@/profile/hooks/useFriends';
import {removeFriend} from '@/profile/hooks/friendsApi';
import {addFriend} from '@/profile/hooks/friendsApi';


import styles from './UserProfile.module.scss';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';


const UserProfile = () => {
    const {uid} = useParams();
    const isMyProfile = !uid;
    const {user, loading} = useUserData(uid);
    const {posts, createPost, deletePost} = usePosts(user?.uid, user?.fullName);
    const {users: allUsers} = useAllUsers(user?.uid);

    const ui = useProfileUI();

    const friendIds = useMemo(() => {
        return user?.friends ?? [];
    }, [user?.friends]);

    const {friends} = useFriends(friendIds);


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

    return (
        <div className={styles.container}>
            <ProfileHeader/>

            <div className={styles.profileWrapper}>
                <ProfileInfo
                    userData={user}
                    postsCount={posts.length}
                    friendsCount={user.friends?.length ?? 0}
                />
                <ProfileDetails userData={user}/>
                <FriendsList
                    friends={friends}
                    onRemoveFriend={
                        isMyProfile ? async (targetId) => {
                            await removeFriend(user.uid, targetId);
                        } : undefined
                    }
                />

                    <AllUsersList
                        allUsers={allUsers}
                        currentUserId={user.uid}
                        friendsIds={user.friends ?? []}
                        onAddFriend={async (targetId) => {
                            await addFriend(user.uid, targetId);
                        }}
                        isMyProfile={isMyProfile}
                    />


            </div>

            <div className={styles.postsWrapper}>
                {isMyProfile && (<>
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

                            onCreate={async (data) => {
                                await createPost(data);
                                ui.closeCreatePost();
                            }}
                            onCancel={ui.closeCreatePost}
                        />
                    )}
                </>)}


                <PostList posts={posts} onDelete={deletePost} isMyProfile={isMyProfile}/>
            </div>
        </div>


    );
};

export default UserProfile;