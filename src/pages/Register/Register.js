import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '~/components/context/AuthContext';
import FormInput from '~/components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';
import axios from '~/axios/axios';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const inputsRegister = [
        {
            id: 'name',
            className: 'form-input',
            name: 'name',
            type: 'text',
            placeholder: 'Tên của bạn',
            errormessage: 'Tên bắt đầu bằng ký tự thường, cách nhau bởi dấu phẩy và không có ký tự đặc biệt.',
            label: 'Tên',
            pattern: '^[a-zA-Z ]{2,50}$',
            required: true,
        },
        {
            id: 'username',
            className: 'form-input',
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errormessage: 'Tên đăng nhập bắt đầu bằng chữ cái, tối đa 16 ký tự và không có ký tự đặc biệt',
            label: 'Tên đăng nhập',
            pattern: '^[A-Za-z][A-Za-z0-9_]{2,16}$',
            required: true,
        },
        {
            id: 'email',
            className: 'form-input',
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            errormessage: 'Email hợp lệ phải có dấu @',
            label: 'Email',
            pattern: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
            required: true,
        },
        {
            id: 'password',
            className: 'form-input',
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errormessage: 'Mật khẩu có ít nhất 4 ký tự và có ít nhất là 1 số',
            label: 'Mật khẩu',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,20}$`,
            required: true,
        },
        {
            id: 'confirmPassword',
            className: 'form-input',
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errormessage: 'Mật khẩu chưa khớp!',
            label: 'Nhập lại mật khẩu',
            pattern: credentials.password,
            required: true,
        },
    ];

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('api/auth/register', credentials, { withCredentials: true });
            if (res?.status === 200) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
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
            if (error?.response?.status === 409) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: `${error?.response?.data?.message}`,
                    color: '#fe2c55',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
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
        <>
            <div className={cx('register')}>
                <form className={cx('wrapper')} onSubmit={handleSubmit}>
                    <span className={cx('title')}>Đăng ký</span>

                    {inputsRegister.map((input, index) => (
                        <div className={cx('form-item')} key={index}>
                            <label htmlFor={input.id} className={cx('form-label')} key={index}>
                                {input.label}
                            </label>
                            <FormInput {...input} onChange={handleChange} value={credentials[input.name]} />
                        </div>
                    ))}

                    <button type="submit" className={cx('btn-login')}>
                        Đăng ký
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;
