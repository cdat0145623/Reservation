import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import { PersonalInfoIcon, SecurityIcon } from '~/components/Icons';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { NavbarContext } from '~/components/context/NavbarContext';
import useAxiosPrivate from '~/components/hooks/useAxiosPrivate';
import { AuthContext } from '~/components/context/AuthContext';
import jwt_decode from 'jwt-decode';
import useFetchUser from '~/components/hooks/useFetchUser';
import axios from '~/axios/axios';

const cx = classNames.bind(styles);

function Settings() {
    const { dispatchNav } = useContext(NavbarContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { data, loading, error } = useFetchUser(`/api/users/${id}`);
    console.log(data);

    console.log(id);

    console.log(data);
    console.log(loading);

    useEffect(() => {
        console.log(2222);
        dispatchNav({ type: 'IS_USER', payload: { navbar: 'user' } });
        if (user !== 'null') {
            const { id } = jwt_decode(user);
            if (id) {
                setLoading(true);
                const getUser = async () => {
                    const fetchUser = await axios.get(`/api/users/${id}`, { withCredentials: true });
                    console.log(fetchUser.data);
                    setData(fetchUser.data);
                };
                setLoading(false);
                getUser();
            }
        }

        // eslint-disable-next-line
    }, []);
    console.log(data);

    return (
        <>
            {loading ? (
                'loading...'
            ) : data ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('settings')}>
                            <h1 className={cx('title')}>Cài đặt tài khoản</h1>
                            <span className={cx('sub-title')}>Quản lý trải nghiệm booking của bạn</span>
                        </div>
                        <div className={cx('inner')}>
                            <Link
                                to={`/mysettings/personal/${data?._id}`}
                                className={cx('personal-link')}
                                onClick={() => dispatchNav({ type: 'IS_USER', payload: { navbar: 'user' } })}
                            >
                                <div className={cx('wrapper-personal')}>
                                    <div className={cx('wrapper-icon')}>
                                        <PersonalInfoIcon className={cx('icon')} />
                                    </div>
                                    <div className={cx('details')}>
                                        <h2 className={cx('details-title')}>Thông tin cá nhân</h2>
                                        <span className={cx('details-subtitle')}>
                                            Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra
                                            sao.
                                        </span>
                                        <br />
                                        <span className={cx('details-text')}>Quản lý thông tin cá nhân</span>
                                    </div>
                                </div>
                            </Link>
                            <div className={cx('wrapper-security')}>
                                <div className={cx('wrapper-icon')}>
                                    <SecurityIcon className={cx('icon')} />
                                </div>
                                <div className={cx('details')}>
                                    <h2 className={cx('details-title')}>An toàn và bảo mật</h2>
                                    <span className={cx('details-subtitle')}>
                                        Thiết lập các cài đặt bảo mật và xác thực 2 yếu tố
                                    </span>
                                    <br />
                                    <span className={cx('details-text')}>Quản lý bảo mật tài khoản</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default Settings;
