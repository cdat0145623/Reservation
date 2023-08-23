import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

function Skeleton({ type }) {
    console.log(type);
    const count = 7;
    const NavbarSkeleton = () => {
        return (
            <div className={cx('wrapper')}>
                <span className={cx('name')}></span>
                <span className={cx('vnd')}></span>
                <div className={cx('country')}></div>
                <div className={cx('wrapper-icon')}></div>
                <div className={cx('wrapper-icon')}></div>
                <div className={cx('wrapper-text')}></div>
            </div>
        );
    };
    if (type === 'navbar') return Array(count).fill(<NavbarSkeleton />);
}

export default Skeleton;
