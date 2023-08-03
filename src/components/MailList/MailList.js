import styles from './MailList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MailList() {
    return (
        <div className={cx('mail')}>
            <h2 className={cx('mail-title')}>Save time, save money!</h2>
            <span className={cx('mail-description')}>Sign up and we'll send the best deals to you</span>
            <div className={cx('input-container')}>
                <input className={cx('input-mail')} type="text" placeholder="Your email address" />
                <button className={cx('mail-btn')}>Subcribe</button>
            </div>
        </div>
    );
}

export default MailList;
