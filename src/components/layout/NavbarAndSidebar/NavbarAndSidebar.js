import Navbar from '~/pages/Navbar/Navbar';
import styles from './NavbarAndSidebar.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '~/pages/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function NavbarAndSidebar({ children }) {
    return (
        <>
            <Navbar />
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default NavbarAndSidebar;
