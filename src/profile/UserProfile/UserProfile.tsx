import {useEffect, useState} from 'react';
import {ProfileHeader} from '@/profile/ProfileHeader/ProfileHeader.tsx';
import {doc, getDoc, getDocs, query, collection, where, Timestamp, addDoc, deleteDoc} from 'firebase/firestore';
import styles from './UserProfile.module.scss';
import {auth, db} from '@/firebase/config.ts';
import {ProfileInfo} from '@/profile/ProfileInfo/ProfileInfo.tsx';
import {ProfileDetails} from '@/profile/ProfileDetails/ProfileDetails.tsx';
import {AllUsersList} from '@/profile/AllUsersList/AllUsersList.tsx';
import {FriendsList} from '@/profile/FriendsList/FriendsList.tsx';
import {type Post, type UserData, type PostCreatePayload} from '@/types/types.ts';
import {PostsForm} from '@/profile/PostsForm/PostsForm.tsx';
import {PostList} from '@/profile/PostsList/PostList.tsx';


const UserProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<UserData[]>([]);
    const [newPost, setNewPost] = useState({title: '', content: ''});
    const [posts, setPosts] = useState<Post[]>([]);
    const [creatingPost, setCreatingPost] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.log('Пользователь не авторизован');
                setLoading(false);
                return;
            }

            try {
                // Загружаем данные текущего пользователя
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                }
//Посты
                const postsQuery = query(
                    collection(db, 'posts'),
                    where('userId', '==', currentUser.uid)
                );

                const postsSnapshot = await getDocs(postsQuery);
                const userPosts: Post[] = postsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Post, 'id'>)
                }));

                setPosts(userPosts);

                //  Загружаем ВСЕХ пользователей из Firebase
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersList = usersSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as UserData))
                    .filter(user => user.uid !== currentUser.uid); // Исключаем себя

                setAllUsers(usersList);
                console.log('Все пользователи:', usersList);


            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateNewPost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) return;
        if (!auth.currentUser || !userData) return;

        const payload: PostCreatePayload = {
            title: newPost.title,
            content: newPost.content,
            userId: auth.currentUser.uid,
            likes: 0,
            comments: 0,
            createdAt: Timestamp.now(),
            authorName: userData.fullName
        };

        const docRef = await addDoc(collection(db, 'posts'), payload);

        setPosts(prev => [{ id: docRef.id, ...payload }, ...prev]);

        setNewPost({ title: '', content: '' });
        setCreatingPost(false);
    };

    const handleDeletePost = async (id: string) => {
        setPosts(prev => prev.filter(post => post.id !== id));
        await deleteDoc(doc(db, 'posts', id));

    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка профиля...</p>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <ProfileHeader />

            <div className={styles.profileWrapper}>
                <ProfileInfo userData={userData} />
                <ProfileDetails userData={userData} />
                <FriendsList />
                <AllUsersList allUsers={allUsers} />
            </div>

            <div className={styles.postsWrapper}>
                <div className={styles.postsHeader}>

                    <div className={styles.createPostToggle}>
                        <h2>Мои посты</h2>
                        <button className={styles.createPostButton} onClick={() => setCreatingPost(!creatingPost)}>
                            {creatingPost ? 'Отмена' : '+ Создать пост'}
                        </button>
                    </div>


                </div>

                {creatingPost && (
                    <PostsForm
                        newPost={newPost}
                        setNewPost={setNewPost}
                        onCreate={handleCreateNewPost}
                        onCancel={() => setCreatingPost(false)}
                    />
                )}

                <PostList posts={posts} onDelete={handleDeletePost} />
            </div>
        </div>


    );
};

export default UserProfile;