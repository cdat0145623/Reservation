import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Countries</li>
                    <li className={cx('item')}>Regions</li>
                    <li className={cx('item')}>Citys</li>
                    <li className={cx('item')}>Districts</li>
                    <li className={cx('item')}>Airports</li>
                    <li className={cx('item')}>Hotels</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Countries</li>
                    <li className={cx('item')}>Regions</li>
                    <li className={cx('item')}>Citys</li>
                    <li className={cx('item')}>Districts</li>
                    <li className={cx('item')}>Airports</li>
                    <li className={cx('item')}>Hotels</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Countries</li>
                    <li className={cx('item')}>Regions</li>
                    <li className={cx('item')}>Citys</li>
                    <li className={cx('item')}>Districts</li>
                    <li className={cx('item')}>Airports</li>
                    <li className={cx('item')}>Hotels</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Countries</li>
                    <li className={cx('item')}>Regions</li>
                    <li className={cx('item')}>Citys</li>
                    <li className={cx('item')}>Districts</li>
                    <li className={cx('item')}>Airports</li>
                    <li className={cx('item')}>Hotels</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Countries</li>
                    <li className={cx('item')}>Regions</li>
                    <li className={cx('item')}>Citys</li>
                    <li className={cx('item')}>Districts</li>
                    <li className={cx('item')}>Airports</li>
                    <li className={cx('item')}>Hotels</li>
                </ul>
            </div>
            <div className={cx('text')}>Copyright © 2023 Booking. All rights reserved.</div>
        </div>
    );
}

export default Footer;
