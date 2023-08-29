import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '~/components/context/AuthContext';
import FormInput from '~/components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';
import axios from '~/axios/axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('api/auth/login', credentials, { withCredentials: true });
            console.log(res);
            if (res?.status === 200) {
                const decodedToken = jwt_decode(res?.data?.access_token);
                if (!decodedToken?.isAdmin) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res?.data?.access_token,
                    });
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Login successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    dispatch({
                        type: 'LOGIN_FAILURE',
                        payload: { message: 'You are not allowed!' },
                    });
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'You are not allowed access to this page!',
                        color: '#fe2c55',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.response.data,
            });
            if (error?.response?.status === 404) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: `${error?.response?.data?.message}`,
                    color: '#fe2c55',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            if (error?.response?.status === 401) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: `${error?.response?.data?.message}`,
                    color: '#fe2c55',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
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
                <button type="submit" className={cx('btn-login')}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
