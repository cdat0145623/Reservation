import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '~/components/context/AuthContext';
import Navbar from '../Navbar/Navbar';
import FormInput from '~/components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const { loading, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('api/auth/login', credentials);
            console.log(res.data);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/');
        } catch (err) {
            console.log(err);
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };

    return (
        <>
            <Navbar />
            <div className={cx('login')}>
                <form className={cx('wrapper')} onSubmit={handleSubmit}>
                    <span className={cx('title')}>Đăng nhập</span>

                    <label htmlFor="username" className={cx('form-label')}>
                        Tên đăng nhập
                    </label>
                    <FormInput
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        className="form-input"
                        pattern="^[A-Za-z][A-Za-z0-9_]{2,16}$"
                        errormessage="Username shoud be 3-16 characters, only start with letter and shouldn't include any special
                        characters"
                        required={true}
                    />
                    <label htmlFor="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <FormInput
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="form-input"
                        pattern="^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,20}$"
                        errormessage="Password shout be 4-20 characters and include at least one letter and one number"
                        required={true}
                    />
                    <button disabled={loading} type="submit" className={cx('btn-login')}>
                        Đăng nhập
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
