import {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.scss'


const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user.uid);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setAuthing(false);
            });
    };
    return (
        <div className={styles.container}>

            <div className={styles.login}>
                <div className={styles.form}>
                    <div className={styles.header}>
                        <h3>Вход</h3>
                        <p>Введите данные для входа</p>
                    </div>

                    <div>
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
                    </div>

                    <div>
                        <button
                            className={styles.button}
                            onClick={signInWithEmail}
                            disabled={authing}>
                            {authing ? 'Вход...' : 'Войти'}
                        </button>
                    </div>

                    <div className={styles.divider}>
                        <div className={styles.dividerLine}></div>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.footer}>
                        <p>
                            Нет аккаунта?
                        </p>
                        <a href='/signup'>Зарегистрироваться</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

