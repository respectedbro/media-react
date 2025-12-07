import {ProfileHeader} from '@/profile/ProfileHeader/ProfileHeader.tsx';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
    return (
        <>
            <div className={styles.container}>
                <ProfileHeader/>
            </div>

        </>


    );
};

export default UserProfile;