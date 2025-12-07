import {useEffect, useState} from 'react';
import {ProfileHeader} from '@/profile/ProfileHeader/ProfileHeader.tsx';
import {doc, getDoc} from 'firebase/firestore';
import styles from './UserProfile.module.scss';
import {auth, db} from '@/firebase/config.ts';
import {ProfileInfo} from '@/profile/ProfileInfo/ProfileInfo.tsx';

interface UserData {
    uid: string;
    email: string;
    fullName: string;
    age: number;
    city: string;
    createdAt: string;
}

const UserProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userDataLoading, setUserDataLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error('Пользователь не авторизован');
                setUserDataLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                } else {
                    console.error('Данные не найдены');
                }
            } catch (error) {
                console.error('Ошибка загрузки', error);
            } finally {
                setUserDataLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (userDataLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            <div className={styles.container}>
                <ProfileHeader/>
                <div className={styles.profileWrapper}>
                    <ProfileInfo userData={userData}/>
                </div>

            </div>

        </>


    );
};

export default UserProfile;