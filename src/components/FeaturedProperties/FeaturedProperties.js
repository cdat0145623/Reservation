import styles from './FeaturedProperties.module.scss';
import classNames from 'classnames/bind';
import useFetch from '../hooks/useFetch';
import Slider from 'react-slick';
import './FeaturedProperties.css';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useState } from 'react';
const cx = classNames.bind(styles);

function FeaturedProperties() {
    const { data, loading } = useFetch('/api/hotels');
    const [sliderRef, setSliderRef] = useState(null);

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
                                        src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o="
                                        alt=""
                                    />
                                    <div className={cx('item-body')}>
                                        <span className={cx('featuredProperties-name')}>{item?.name}</span>
                                        <span className={cx('featuredProperties-city')}>{item?.city}</span>
                                        {item?.rating && (
                                            <div className={cx('featuredProperties-rating')}>
                                                <button>{item?.rating}</button>
                                                <span className={cx('rating-point')}> Excellent </span>
                                                <span className={cx('rating-reviews')}>. 2,427 reviews</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className={cx('featuredProperties-price')}>
                                        Starting from <strong>VND&nbsp; 3,377,030</strong>
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
