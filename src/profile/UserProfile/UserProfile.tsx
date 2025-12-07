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
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error('Пользователь не авторизован');
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                } else {
                    console.error('Данные не найдены');
                }
                //TODO: нужно подтянуть из базы
                // const usersSnapshot = await getDocs(collection(db, 'users'))

                // console.log('Всего:', usersSnapshot.docs.length)
                // const usersList: UserData[] = []
                //
                // usersSnapshot.forEach((doc) => {
                //     console.log('Документ:', doc.id, '=>', doc.data());
                //
                //     usersList.push({
                //         id:doc.id,
                //         ...doc.data()
                //     } as UserData)
                // })


            } catch (error) {
                console.error('Ошибка загрузки', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
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
                    <FriendsList/>
                </div>

            </div>

        </>


    );
};

export default UserProfile;