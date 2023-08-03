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
                    <h1>Da nag</h1>
                </div>
            </div>
            <div className={cx('item')}>
                <img src={images.hcm} alt="" className={cx('featured-img')} />
                <div className={cx('title')}>
                    <h1>HoChiMinh</h1>
                </div>
            </div>
            <div className={cx('item')}>
                <img src={images.hanoi} alt="" className={cx('featured-img')} />
                <div className={cx('title')}>
                    <h1>Ha noi</h1>
                </div>
            </div>
        </div>
    );
}

export default Featured;
