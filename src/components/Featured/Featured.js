import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
import images from '~/assets/images';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const cx = classNames.bind(styles);
function Featured() {
    // const [data, setdata] = useState([]);
    // useEffect(() => {
    //     const getCount = async () => {
    //         try {
    //             const res = await axios.get('/api/hotels/countByCity?cities=berlin,marok,london');
    //             setdata(res.data);
    //         } catch (err) {}
    //     };
    //     getCount();
    // }, []);
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
