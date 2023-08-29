import styles from './MailList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MailList() {
    return (
        <div className={cx('mail')}>
            <h2 className={cx('mail-title')}>Tiết kiệm thời gian và tiền bạc!</h2>
            <span className={cx('mail-description')}>
                Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn
            </span>
            <div className={cx('input-container')}>
                <input className={cx('input-mail')} type="text" placeholder="Địa chỉ email của bạn" />
                <button className={cx('mail-btn')}>Đăng ký</button>
            </div>
        </div>
    );
}

export default MailList;
