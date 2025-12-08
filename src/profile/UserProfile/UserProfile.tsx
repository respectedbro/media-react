import {useEffect, useState} from 'react';
import {ProfileHeader} from '@/profile/ProfileHeader/ProfileHeader.tsx';
import {doc, getDoc, getDocs, collection} from 'firebase/firestore';
import styles from './UserProfile.module.scss';
import {type UserData} from '@/types/user.ts';
import {auth, db} from '@/firebase/config.ts';
import {ProfileInfo} from '@/profile/ProfileInfo/ProfileInfo.tsx';
import {ProfileDetails} from '@/profile/ProfileDetails/ProfileDetails.tsx';
import {FriendsList} from '@/profile/FriendsList/FriendsList.tsx';


const UserProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<UserData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.log('Пользователь не авторизован');
                setLoading(false);
                return;
            }

            try {
                // 1. Загружаем данные текущего пользователя
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                }

                // 2. Загружаем ВСЕХ пользователей из Firebase
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

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка профиля...</p>
            </div>
        );
    }
    return (
        <>
            <div className={styles.container}>
                <ProfileHeader/>
                <div className={styles.profileWrapper}>
                    <ProfileInfo userData={userData}/>
                    <ProfileDetails userData={userData}/>
                    <FriendsList allUsers={allUsers}/>
                </div>

            </div>

        </>


    );
};

export default UserProfile;