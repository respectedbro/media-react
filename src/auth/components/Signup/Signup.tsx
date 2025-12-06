import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/firebase/config.ts';

import styles from './Singup.module.scss';

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');

    const [error, setError] = useState('');


    const singUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Не совпадают');
            return;
        }

        if (!fullName) {
            setError('Введите имя');
            return;
        }

        if (!age || parseInt(age) < 0 || parseInt(age) > 100) {
            setError('ВВедите корректный возраст');
        }

        setAuthing(true);
        setError('');

        try {
            //криейтим пользователя в Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

//данныее в Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                fullName: fullName.trim(),
                age: parseInt(age),
                city: city.trim(),
                createAt: new Date().toISOString()
            });
            // .then(res => {
            //     console.log(res.user.uid);
            //     navigate('/');
            // })
            // .catch(err => {
            //     console.log(err.message);
            //     setError(err.message);
            //     setAuthing(false);
            // });

            console.log('user создан -', user.uid);
            navigate('/');
        } catch (err: any) {
            console.log(err.message);
            setError(err.message);
            setAuthing(false);
        }

    };
    return (
        <div className={styles.container}>

            <div className={styles.signup}>
                <div className={styles.formWrapper}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>Регистрация</h3>
                        <p className={styles.subtitle}>Введите данные для регистрации</p>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Имя"
                            className={styles.input}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Возраст"
                            className={styles.input}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="0"
                            max="100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Город"
                            className={styles.input}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Повтрите пароль"
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                    </div>


                    <div className={styles.buttonGroup}>
                        <button
                            className={`${styles.button} ${authing ? styles.buttonDisabled : ''}`}
                            onClick={singUpWithEmail}
                            disabled={authing}>
                            {authing ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </div>

                    <div className={styles.divider}>
                        <div className={styles.dividerLine}></div>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.footer}>
                        <p className={styles.footerText}>
                            Уже есть аккаунт?
                            <span className={styles.footerLink}>
                                <a href="/login">Войти</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;