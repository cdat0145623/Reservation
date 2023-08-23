import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import classNames from 'classnames/bind';
import styles from './Hotel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import MailList from '~/components/MailList/MailList';
import Footer from '~/components/Footer/Footer';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '~/components/hooks/useFetch';
import { SearchContext } from '~/components/context/SearchContext';
import { AuthContext } from '~/components/context/AuthContext';
import Reserve from '~/components/Reserve/Reserve';

const cx = classNames.bind(styles);
function Hotel() {
    const [open, setOpen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const { data, loading } = useFetch(`/api/hotels/find/${id}`);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);
    const MILISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    function dayDifference(dayStart, dayEnd) {
        const timeDiff = Math.abs(dayEnd?.getTime() - dayStart?.getTime());
        const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0]?.startDate, dates[0]?.endDate);

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

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate('/login');
        }
    };
    return (
        <div>
            <Navbar />
            <Header type="list" />

            {loading ? (
                'loading'
            ) : (
                <>
                    <div className={cx('hotel')}>
                        {open && (
                            <div className={cx('slider')}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('close')}
                                    onClick={() => setOpen(false)}
                                />
                                <FontAwesomeIcon
                                    icon={faCircleArrowLeft}
                                    className={cx('arrow')}
                                    onClick={() => handleMove('l')}
                                />
                                <div className={cx('slider-wrapper')}>
                                    <img src={data.photos[slideNumber]} alt="" className={cx('slider-img')} />
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
                            <h1 className={cx('title')}>{data.name}</h1>
                            <div className={cx('address')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{data.address}</span>
                            </div>
                            <span className={cx('distance')}>
                                Nghinh Phong Cape is {data.distance} km from the apartment
                            </span>
                            <span className={cx('price')}>
                                Book a stay over VND {data.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className={cx('images')}>
                                {data.photos?.map((photo, index) => (
                                    <div className={cx('images-wrapper')} key={index}>
                                        <img
                                            onClick={() => handleOpen(index)}
                                            src={photo}
                                            alt=""
                                            className={cx('image-hotel')}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className={cx('hotel-details')}>
                                <div className={cx('detail-text')}>
                                    <h1 className={cx('detail-title')}>{data.title}</h1>
                                    <p className={cx('detail-description')}>{data.description}</p>
                                </div>
                                <div className={cx('detail-price')}>
                                    <h1 className={cx('detail-info')}>Được giới thiệu cho 3 người lớn</h1>
                                    <span className={cx('detail-introduce')}>
                                        The air-conditioned apartment is composed of 2 separate bedrooms, a fully
                                        equipped kitchen with a fridge and a stovetop, and 1 bathroom. Towels and bed
                                        linen are available in the apartment.
                                    </span>
                                    <h2 className={cx('detail-final-price')}>
                                        <b>VND {days * data.cheapestPrice * options.room}</b> ({days} đêm)
                                    </h2>
                                    <button onClick={handleClick} className={cx('detail-btn')}>
                                        Đặt chỗ
                                    </button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                </>
            )}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    );
}

export default Hotel;
