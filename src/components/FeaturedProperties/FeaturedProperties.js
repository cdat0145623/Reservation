import styles from './FeaturedProperties.module.scss';
import classNames from 'classnames/bind';
import useFetch from '../hooks/useFetch';
import Slider from 'react-slick';
import './FeaturedProperties.css';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useState } from 'react';
import { citys } from '~/citys';
const cx = classNames.bind(styles);

function FeaturedProperties() {
    const { data, loading } = useFetch('/api/hotels');
    const [sliderRef, setSliderRef] = useState(null);
    const city = (data, city) => {
        return data.find((item) => item.value === city).city;
    };

    const publicImage = 'http://localhost:3003/public/img/';

    function NextArrow(props) {
        const { className, onClick } = props;
        return (
            <button className={className}>
                <KeyboardArrowRightOutlinedIcon onClick={onClick} className="right" />
            </button>
        );
    }

    function PrevArrow(props) {
        const { className, onClick } = props;
        return (
            <button className={className}>
                <KeyboardArrowLeftOutlinedIcon onClick={onClick} className="left" />
            </button>
        );
    }
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        className: styles.slider,
        nextArrow: <NextArrow icon={<KeyboardArrowRightOutlinedIcon />} />,
        prevArrow: <PrevArrow icon={<KeyboardArrowLeftOutlinedIcon />} />,
    };

    return (
        <div className={cx('featured-properties')}>
            {loading ? (
                'Loading'
            ) : (
                <>
                    <Slider ref={setSliderRef} {...settings}>
                        {Array.isArray(data) &&
                            data?.map((item) => (
                                <div className={cx('featuredProperties-item')} key={item?._id}>
                                    <img
                                        className={cx('featuredProperties-image')}
                                        src={publicImage + item?.photo[0]}
                                        alt=""
                                    />
                                    <div className={cx('item-body')}>
                                        <span className={cx('featuredProperties-name')}>{item?.name}</span>
                                        <span className={cx('featuredProperties-city')}>{city(citys, item?.city)}</span>
                                        {item?.rating && (
                                            <div className={cx('featuredProperties-rating')}>
                                                <button>{item?.rating}</button>
                                                <span className={cx('rating-point')}> Xuất sắc </span>
                                                <span className={cx('rating-reviews')}>. 2,427 đánh giá</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className={cx('featuredProperties-price')}>
                                        Bắt đầu từ <strong>VND&nbsp; {item?.cheapestPrice}</strong>
                                    </span>
                                </div>
                            ))}
                    </Slider>
                </>
            )}
        </div>
    );
}

export default FeaturedProperties;
