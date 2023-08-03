import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={images.logo} alt=""></img>
                </Link>
                <div className={cx('items')}>
                    <button className={cx('button')}>Register</button>
                    <button className={cx('button')}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
