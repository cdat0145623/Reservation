import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Featured() {
    return (
        <div className={cx('featured')}>
            <div className={cx('item')}>
                <img src={images.danang} alt="" className={cx('featured-img')} />
                <div className={cx('title')}>
                    <h1>Đà nẵng</h1>
                </div>
            </div>
            <div className={cx('item')}>
                <img src={images.hcm} alt="" className={cx('featured-img')} />
                <div className={cx('title')}>
                    <h1>Hồ Chí Minh</h1>
                </div>
            </div>
            <div className={cx('item')}>
                <img src={images.hanoi} alt="" className={cx('featured-img')} />
                <div className={cx('title')}>
                    <h1>Hà Nội</h1>
                </div>
            </div>
        </div>
    );
}

export default Featured;
