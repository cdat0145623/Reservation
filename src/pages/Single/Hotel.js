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
import { dayDifference } from './dayDifference';

const cx = classNames.bind(styles);

function Hotel() {
    const [open, setOpen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const { data, loading } = useFetch(`/api/hotels/find/${id}`);
    const { user } = useContext(AuthContext);

    const publicImage = 'http://localhost:3003/public/img/';

    // eslint-disable-next-line
    const [dates, setDates] = useState(location?.state?.dates);
    // eslint-disable-next-line
    const [options, setOptions] = useState(location?.state?.options);
    // const { dates, options } = useContext(SearchContext);

    const days = dayDifference(dates[0]?.startDate, dates[0]?.endDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };
    const lengthPhoto = data?.photo?.length - 1;

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? lengthPhoto : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === lengthPhoto ? 0 : slideNumber + 1;
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
                                    <img
                                        src={publicImage + data.photo[slideNumber]}
                                        alt=""
                                        className={cx('slider-img')}
                                    />
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
                                <FontAwesomeIcon icon={faLocationDot} className={cx('address-icon')} />
                                <span>{data.address}</span>
                            </div>
                            <span className={cx('distance')}></span>
                            <span className={cx('price')}></span>
                            <div className={cx('images')}>
                                {data?.photo?.map((img, index) => (
                                    <div className={cx('images-wrapper')} key={index}>
                                        <img
                                            onClick={() => handleOpen(index)}
                                            src={publicImage + img}
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
                                    <h1 className={cx('detail-info')}>Điểm nổi bật của chổ nghĩ</h1>
                                    <span className={cx('detail-introduce')}>
                                        Nhìn ra hồ bơi
                                        <br />
                                        Nhìn ra sông
                                        <br />
                                        Hồ bơi có tầm nhìn
                                        <br />
                                        Có chỗ đậu xe riêng trong khuôn viên
                                        <br />
                                    </span>
                                    {/* <h2 className={cx('detail-final-price')}>
                                        <b>VND {days * data.cheapestPrice * options.room}</b> ({days} đêm)
                                    </h2> */}
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
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} days={days} options={options} />}
        </div>
    );
}

export default Hotel;
