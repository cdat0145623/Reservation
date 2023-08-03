import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import classNames from 'classnames/bind';
import styles from './Hotel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import imagesHotel from '~/assets/images/hotels/imagesHotel';
import MailList from '~/components/MailList/MailList';
import Footer from '~/components/Footer/Footer';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Hotel() {
    const [open, setOpen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 8 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 8 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className={cx('hotel')}>
                {open && (
                    <div className={cx('slider')}>
                        <FontAwesomeIcon icon={faXmark} className={cx('close')} onClick={() => setOpen(false)} />
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className={cx('arrow')}
                            onClick={() => handleMove('l')}
                        />
                        <div className={cx('slider-wrapper')}>
                            <img src={imagesHotel[slideNumber].apart} alt="" className={cx('slider-img')} />
                        </div>
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className={cx('arrow')}
                            onClick={() => handleMove('r')}
                        />
                    </div>
                )}
                <div className={cx('wrapper')}>
                    <button className={cx('bookNow')}>Đặt căn hộ của bạn</button>
                    <h1 className={cx('title')}>Villa Bãi Sau Gần Biển ** Free Karaoke ** Bida - 7C</h1>
                    <div className={cx('address')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>36 Lạc Long Quân, Vũng Tàu, Việt Nam </span>
                    </div>
                    <span className={cx('distance')}>Nghinh Phong Cape is 4.3 km from the apartment</span>
                    <span className={cx('price')}>
                        Book a stay over VND 5.750.000 at this property and get a free airport taxi
                    </span>
                    <div className={cx('images')}>
                        {imagesHotel.map((image, index) => (
                            <div className={cx('images-wrapper')} key={index}>
                                <img
                                    onClick={() => handleOpen(index)}
                                    src={image.apart}
                                    alt=""
                                    className={cx('image-hotel')}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={cx('hotel-details')}>
                        <div className={cx('detail-text')}>
                            <h1 className={cx('detail-title')}>Thông tin khu vực</h1>
                            <p className={cx('detail-description')}>
                                - 250 meters from Back Beach, Thuy Van street - 200 meters from LotteMart, Lotte Cinema
                                - 110 km from Tan Son Nhat International Airport The Song Apartment is located on the
                                front of Thi Sach Street, 200 meters from LotteMart. The apartment has 2 basements with
                                very large parking (have fee), the road is wide and has a notice board.
                            </p>
                        </div>
                        <div className={cx('detail-price')}>
                            <h1 className={cx('detail-info')}>Được giới thiệu cho 3 người lớn</h1>
                            <span className={cx('detail-introduce')}>
                                The air-conditioned apartment is composed of 2 separate bedrooms, a fully equipped
                                kitchen with a fridge and a stovetop, and 1 bathroom. Towels and bed linen are available
                                in the apartment.
                            </span>
                            <h2 className={cx('detail-final-price')}>
                                <b>VND 5.750.000</b> (6 đêm)
                            </h2>
                            <button className={cx('detail-btn')}>Đặt chỗ</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
        </div>
    );
}

export default Hotel;
