import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { PersonalInfoIcon, SecurityIcon, NotifyIcon, OptionsIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('side-bar')}>
            <ul className={cx('list')}>
                <li className={cx('item', 'active')}>
                    <div className={cx('wrapper-icon')}>
                        <PersonalInfoIcon className={cx('icon')} />
                    </div>
                    <span className={cx('text')}>Thông tin cá nhân</span>
                </li>
                <li className={cx('item')}>
                    <div className={cx('wrapper-icon')}>
                        <SecurityIcon className={cx('icon')} />
                    </div>
                    <span className={cx('text')}>An toàn và bảo mật</span>
                </li>
                <li className={cx('item')}>
                    <div className={cx('wrapper-icon')}>
                        <OptionsIcon className={cx('icon')} />
                    </div>
                    <span className={cx('text')}>Các tuỳ chọn</span>
                </li>
                <li className={cx('item')}>
                    <div className={cx('wrapper-icon')}>
                        <NotifyIcon className={cx('icon')} />
                    </div>
                    <span className={cx('text')}>Thông báo email</span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
