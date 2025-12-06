import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';


import styles from './Singup.module.scss'

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');



    const singUpWithEmail = async () => {
        if (password !==confirmPassword) {
            setError('Не совпадают')
            return
        }

        setAuthing(true)
        setError('')

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user.uid);
                navigate('/')
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message)
                setAuthing(false)
            })
    }
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
                            type='email'
                            placeholder='Email'
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Re-Enter Password'
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                <a href='/login'>Войти</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;