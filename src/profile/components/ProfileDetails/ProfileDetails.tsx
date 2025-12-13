import styles from './ProfileDetails.module.scss';
import {type UserData} from '@/types/types.ts';

interface ProfileDetailsProps {
    userData: UserData | null;
}

export const ProfileDetails = ({userData}: ProfileDetailsProps) => {
    return (
        <div className={styles.profileDetails}>
            <div className={styles.detailsCard}>
                <h3 className={styles.detailsTitle}>Информация о профиле</h3>


                <div className={styles.detailsList}>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Возраст:</span>
                        <span
                            className={styles.detailValue}>{userData?.age ?? 'Не указано'}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Город:</span>
                        <span className={styles.detailValue}>{userData?.city ?? 'Не указано'}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Статус:</span>
                        <span className={styles.detailValueOnline}>Online</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>На сайте с:</span>
                        <span className={styles.detailValue}>{userData?.createAt ? new Date(userData.createAt).toLocaleDateString('ru-RU') : 'Недавно'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};