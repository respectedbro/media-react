import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

interface UserData {
    uid: string;
    email: string;
    fullName: string;
    age: number;
    city: string;
    createdAt: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp;
    likes: number;
    comments: number;
    userId: string;
}

interface Friend {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;

            if (currentUser) {
                try {
                    // Загрузка профиля пользователя
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                    if (userDoc.exists()) {
                        setUserData(userDoc.data() as UserData);

                        // Загрузка постов пользователя
                        const postsQuery = query(
                            collection(db, 'posts'),
                            where('userId', '==', currentUser.uid)
                        );
                        const postsSnapshot = await getDocs(postsQuery);
                        const userPosts = postsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        } as Post));
                        setPosts(userPosts);
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }

            // Тестовые данные друзей (в реальном приложении загружались бы из БД)
            setFriends([
                { id: '1', name: 'Александр Иванов', avatar: 'A', status: 'online' },
                { id: '2', name: 'Мария Петрова', avatar: 'M', status: 'online' },
                { id: '3', name: 'Иван Сидоров', avatar: 'И', status: 'offline' },
                { id: '4', name: 'Елена Козлова', avatar: 'Е', status: 'online' },
                { id: '5', name: 'Дмитрий Смирнов', avatar: 'Д', status: 'offline' },
            ]);

            setLoading(false);
        };

        fetchUserData();
    }, []);

    // Выход из аккаунта
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    // Создание нового поста
    const handleCreatePost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) return;

        const currentUser = auth.currentUser;
        if (!currentUser || !userData) return;

        try {
            const newPostData = {
                title: newPost.title.trim(),
                content: newPost.content.trim(),
                userId: currentUser.uid,
                likes: 0,
                comments: 0,
                createdAt: Timestamp.now(),
                authorName: userData.fullName
            };

            const docRef = await addDoc(collection(db, 'posts'), newPostData);

            // Добавляем пост в локальное состояние
            setPosts([{
                id: docRef.id,
                ...newPostData
            }, ...posts]);

            // Очищаем форму
            setNewPost({ title: '', content: '' });
            setIsCreatingPost(false);

        } catch (error) {
            console.error('Ошибка при создании поста:', error);
        }
    };

    // Лайк поста
    const handleLikePost = async (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, likes: post.likes + 1 }
                : post
        ));

        // В реальном приложении здесь был бы вызов Firestore
        console.log('Лайк поста:', postId);
    };

    // Удаление поста
    const handleDeletePost = async (postId: string) => {
        setPosts(posts.filter(post => post.id !== postId));
        console.log('Удаление поста:', postId);
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
            {/* Шапка профиля */}
            <div className={styles.header}>
                <div className={styles.headerLogo}>
                    <img src="/vite.svg" alt="Логотип" className={styles.logoImage} />
                    <span className={styles.logoText}>Social Network</span>
                </div>

                <div className={styles.headerActions}>
                    <button
                        className={styles.editProfileButton}
                        onClick={() => console.log('Редактировать профиль')}
                    >
                        Редактировать профиль
                    </button>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>
            </div>

            {/* Основная информация профиля */}
            <div className={styles.profileWrapper}>
                {/* Аватар и базовая информация */}
                <div className={styles.profileSection}>
                    <div className={styles.profileAvatar}>
                        <div className={styles.avatarImage}>
                            {userData?.fullName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className={styles.avatarStatus}></div>
                    </div>

                    <div className={styles.profileBasicInfo}>
                        <h1 className={styles.profileName}>
                            {userData?.fullName || 'Не указано'}
                        </h1>
                        <p className={styles.profileEmail}>
                            {userData?.email || 'Не указано'}
                        </p>

                        <div className={styles.profileStats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>{posts.length}</span>
                                <span className={styles.statLabel}>Постов</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>{friends.length}</span>
                                <span className={styles.statLabel}>Друзей</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>0</span>
                                <span className={styles.statLabel}>Подписок</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Детальная информация профиля */}
                <div className={styles.profileDetails}>
                    <div className={styles.detailsCard}>
                        <h3 className={styles.detailsTitle}>Информация о профиле</h3>

                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Возраст:</span>
                                <span className={styles.detailValue}>
                                    {userData?.age ? `${userData.age} лет` : 'Не указано'}
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Город:</span>
                                <span className={styles.detailValue}>
                                    {userData?.city || 'Не указано'}
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Статус:</span>
                                <span className={styles.detailValueOnline}>Online</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>На сайте с:</span>
                                <span className={styles.detailValue}>
                                    {userData?.createdAt
                                        ? new Date(userData.createdAt).toLocaleDateString('ru-RU')
                                        : 'Недавно'
                                    }
                                </span>
                            </div>
                        </div>

                        <button className={styles.editDetailsButton}>
                            Изменить информацию
                        </button>
                    </div>
                </div>

                {/* Список друзей */}
                <div className={styles.friendsSection}>
                    <div className={styles.friendsHeader}>
                        <h3 className={styles.friendsTitle}>Друзья ({friends.length})</h3>
                        <Link to="/friends" className={styles.viewAllLink}>
                            Все друзья →
                        </Link>
                    </div>

                    <div className={styles.friendsList}>
                        {friends.slice(0, 4).map(friend => (
                            <div key={friend.id} className={styles.friendCard}>
                                <div className={styles.friendAvatar}>
                                    <span className={styles.friendInitial}>{friend.avatar}</span>
                                    <div className={`${styles.friendStatus} ${styles[friend.status]}`}></div>
                                </div>
                                <div className={styles.friendInfo}>
                                    <span className={styles.friendName}>{friend.name}</span>
                                    <span className={styles.friendStatusText}>
                                        {friend.status === 'online' ? 'В сети' : 'Не в сети'}
                                    </span>
                                </div>
                                <button className={styles.messageButton}>
                                    💬
                                </button>
                            </div>
                        ))}
                    </div>

                    {friends.length > 4 && (
                        <div className={styles.moreFriends}>
                            и еще {friends.length - 4} друзей
                        </div>
                    )}
                </div>
            </div>

            {/* Блок постов */}
            <div className={styles.postsWrapper}>
                <div className={styles.postsHeader}>
                    <h2 className={styles.postsTitle}>Мои посты</h2>

                    <div className={styles.createPostToggle}>
                        <button
                            className={styles.createPostButton}
                            onClick={() => setIsCreatingPost(!isCreatingPost)}
                        >
                            {isCreatingPost ? 'Отмена' : '+ Создать пост'}
                        </button>
                    </div>
                </div>

                {/* Форма создания нового поста */}
                {isCreatingPost && (
                    <div className={styles.newPostForm}>
                        <input
                            type="text"
                            placeholder="Заголовок поста"
                            className={styles.postTitleInput}
                            value={newPost.title}
                            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        />
                        <textarea
                            placeholder="Что у вас нового?"
                            className={styles.postContentInput}
                            value={newPost.content}
                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                            rows={4}
                        />
                        <div className={styles.postActions}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => {
                                    setIsCreatingPost(false);
                                    setNewPost({ title: '', content: '' });
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                className={styles.publishButton}
                                onClick={handleCreatePost}
                                disabled={!newPost.title.trim() || !newPost.content.trim()}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                )}

                {/* Список постов */}
                <div className={styles.postsBox}>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className={styles.postCard}>
                                <div className={styles.postHeader}>
                                    <div className={styles.postAuthor}>
                                        <div className={styles.postAuthorAvatar}>
                                            {userData?.fullName?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div className={styles.postAuthorInfo}>
                                            <h4 className={styles.postAuthorName}>
                                                {userData?.fullName || 'Пользователь'}
                                            </h4>
                                            <span className={styles.postDate}>
                                                {post.createdAt?.toDate().toLocaleDateString('ru-RU') || 'Сегодня'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.deletePostButton}
                                        onClick={() => handleDeletePost(post.id)}
                                    >
                                        ×
                                    </button>
                                </div>

                                <h3 className={styles.postCardTitle}>{post.title}</h3>
                                <p className={styles.postCardContent}>{post.content}</p>

                                <div className={styles.postStats}>
                                    <button
                                        className={styles.likeButton}
                                        onClick={() => handleLikePost(post.id)}
                                    >
                                        ❤️ {post.likes}
                                    </button>
                                    <button className={styles.commentButton}>
                                        💬 {post.comments}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noPosts}>
                            <div className={styles.noPostsIcon}>📝</div>
                            <p className={styles.noPostsText}>У вас пока нет постов</p>
                            <p className={styles.noPostsSubtext}>
                                Создайте первый пост, чтобы поделиться своими мыслями!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;