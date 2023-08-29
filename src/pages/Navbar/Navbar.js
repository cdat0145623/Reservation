import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from '~/components/context/AuthContext';
import Tippy from '@tippyjs/react/headless';
import TippyReact from '@tippyjs/react';
import { LogoutIcon, NotifyIcon, PersonIcon, ReservationIcon, SupportIcon } from '~/components/Icons';
import 'tippy.js/dist/tippy.css';
import axios from '~/axios/axios';
import jwt_decode from 'jwt-decode';
import { NavbarContext } from '~/components/context/NavbarContext';
const cx = classNames.bind(styles);

function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const { navbar, dispatchNav } = useContext(NavbarContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);

    useLayoutEffect(() => {
        if (user !== 'null') {
            const { id } = jwt_decode(user);
            if (id) {
                const getUser = async () => {
                    setLoading(true);
                    try {
                        const data = await axios.get(`/api/users/${id}`, { withCredentials: true });
                        setData(data.data);
                    } catch (error) {
                        console.log(error);
                    }
                    setLoading(false);
                };
                getUser();
            }
        }
        // eslint-disable-next-line
    }, []);

    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const publicImage = 'http://localhost:3003/images/';
    const handleLogout = async () => {
        await axios.get('/api/auth/logout', { withCredentials: true });
        dispatch({
            type: 'LOGOUT',
        });
        window.location.reload();
    };
    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={images.logo} alt="" onClick={() => dispatchNav({ type: 'RESET_IS_USER' })}></img>
                </Link>

                {loading ? (
                    'Loading...'
                ) : data ? (
                    navbar === 'user' ? (
                        <>
                            <div className={cx('wrapper')}>
                                <TippyReact delay={[400, 300]} content="Chọn ngôn ngữ của bạn" placement="bottom">
                                    <div className={cx('country')}>
                                        <img src={publicImage + 'vn.png'} alt="" className={cx('country-image')} />
                                    </div>
                                </TippyReact>
                                <TippyReact delay={[400, 300]} content="Dịch vụ khách hàng" placement="bottom">
                                    <div className={cx('wrapper-icon')}>
                                        <SupportIcon className={cx('support-icon')} />
                                    </div>
                                </TippyReact>
                            </div>
                            <Tippy
                                placement="bottom-end"
                                offset={[-8, 0]}
                                interactive
                                visible={visible}
                                onClickOutside={hide}
                                render={(attrs) => (
                                    <div className={cx('account')} tabIndex="-1" {...attrs}>
                                        <ul className={cx('account-list')}>
                                            <Link to={`/mysettings/${data?._id}`} className={cx('account-link')}>
                                                <li className={cx('account-item')}>
                                                    <PersonIcon className={cx('account-icon')} />
                                                    <span className={cx('account-text')}>Quản lý tài khoản</span>
                                                </li>
                                            </Link>
                                            <li className={cx('account-item')}>
                                                <ReservationIcon className={cx('account-icon')} />
                                                <span className={cx('account-text')}>Đặt chỗ và chuyến đi</span>
                                            </li>
                                            <li className={cx('account-item')} onClick={handleLogout}>
                                                <LogoutIcon className={cx('account-icon')} />
                                                <span className={cx('account-text')}>Đăng xuất</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            >
                                <div className={cx('info')} onClick={visible ? hide : show}>
                                    <img
                                        src={
                                            data?.image === 'default.jpeg' ? publicImage + 'default.jpeg' : data?.image
                                        }
                                        alt=""
                                        className={cx('image')}
                                    />
                                    <span className={cx('name')}>{data.name}</span>
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <div className={cx('wrapper')}>
                                <TippyReact delay={[400, 300]} content="Chọn loại tiền tệ của bạn" placement="bottom">
                                    <span className={cx('vnd')}>VND</span>
                                </TippyReact>
                                <TippyReact delay={[400, 300]} content="Chọn ngôn ngữ của bạn" placement="bottom">
                                    <div className={cx('country')}>
                                        <img src={publicImage + 'vn.png'} alt="" className={cx('country-image')} />
                                    </div>
                                </TippyReact>
                                <TippyReact delay={[400, 300]} content="Dịch vụ khách hàng" placement="bottom">
                                    <div className={cx('wrapper-icon')}>
                                        <SupportIcon className={cx('support-icon')} />
                                    </div>
                                </TippyReact>
                                <TippyReact delay={[400, 300]} content="Xem các thông báo của bạn" placement="bottom">
                                    <div className={cx('wrapper-icon')}>
                                        <NotifyIcon className={cx('notify-icon')} />
                                    </div>
                                </TippyReact>
                                <div className={cx('wrapper-text')}>
                                    <span className={cx('text')}>Đăng chỗ nghỉ của quý vị</span>
                                </div>
                            </div>
                            <Tippy
                                placement="bottom-end"
                                offset={[-8, 0]}
                                interactive
                                visible={visible}
                                onClickOutside={hide}
                                render={(attrs) => (
                                    <div className={cx('account')} tabIndex="-1" {...attrs}>
                                        <ul className={cx('account-list')}>
                                            <Link to={`/mysettings/${data?._id}`}>
                                                <li className={cx('account-item')}>
                                                    <PersonIcon className={cx('account-icon')} />
                                                    <span className={cx('account-text')}>Quản lý tài khoản</span>
                                                </li>
                                            </Link>
                                            <li className={cx('account-item')}>
                                                <ReservationIcon className={cx('account-icon')} />
                                                <span className={cx('account-text')}>Đặt chỗ và chuyến đi</span>
                                            </li>
                                            <li className={cx('account-item')} onClick={handleLogout}>
                                                <LogoutIcon className={cx('account-icon')} />
                                                <span className={cx('account-text')}>Đăng xuất</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            >
                                <div className={cx('info')} onClick={visible ? hide : show}>
                                    <img
                                        src={
                                            data?.image === 'default.jpeg' ? publicImage + 'default.jpeg' : data?.image
                                        }
                                        alt=""
                                        className={cx('image')}
                                    />
                                    <span className={cx('name')}>{data?.name}</span>
                                </div>
                            </Tippy>
                        </>
                    )
                ) : (
                    <>
                        <div className={cx('wrapper')}>
                            <TippyReact delay={[400, 300]} content="Chọn loại tiền tệ của bạn" placement="bottom">
                                <span className={cx('vnd')}>VND</span>
                            </TippyReact>
                            <TippyReact delay={[400, 300]} content="Chọn ngôn ngữ của bạn" placement="bottom">
                                <div className={cx('country')}>
                                    <img src={publicImage + 'vn.png'} alt="" className={cx('country-image')} />
                                </div>
                            </TippyReact>
                            <TippyReact delay={[400, 300]} content="Dịch vụ khách hàng" placement="bottom">
                                <div className={cx('wrapper-icon')}>
                                    <SupportIcon className={cx('support-icon')} />
                                </div>
                            </TippyReact>
                            <TippyReact delay={[400, 300]} content="Xem các thông báo của bạn" placement="bottom">
                                <div className={cx('wrapper-icon')}>
                                    <NotifyIcon className={cx('notify-icon')} />
                                </div>
                            </TippyReact>
                            <div className={cx('wrapper-text')}>
                                <span className={cx('text')}>Đăng chỗ nghỉ của quý vị</span>
                            </div>
                        </div>
                        <div className={cx('items')}>
                            <Link to="/register">
                                <button className={cx('button')}>Đăng ký</button>
                            </Link>
                            <Link to="/login">
                                <button className={cx('button')}>Đăng nhập</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
