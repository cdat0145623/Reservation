import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '~/components/context/AuthContext';

const cx = classNames.bind(styles);

function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={images.logo} alt=""></img>
                </Link>

                {user ? (
                    user.username
                ) : (
                    <div className={cx('items')}>
                        <button className={cx('button')}>Register</button>
                        <Link to="/login">
                            <button className={cx('button')}>Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
