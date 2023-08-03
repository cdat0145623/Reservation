import images from '~/assets/images';
import styles from './FeaturedProperties.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FeaturedProperties() {
    return (
        <div className={cx('featured-properties')}>
            <div className={cx('featuredProperties-item')}>
                <img className={cx('featuredProperties-image')} src={images.apartHotel} alt="" />
                <div className={cx('item-body')}>
                    <span className={cx('featuredProperties-name')}>Aparthotel Stare Miasto</span>
                    <span className={cx('featuredProperties-city')}>Old Town, Poland, Kraków</span>
                    <div className={cx('featuredProperties-rating')}>
                        <button>8.7</button>
                        <span className={cx('rating-point')}> Excellent </span>
                        <span className={cx('rating-reviews')}>. 2,427 reviews</span>
                    </div>
                </div>
                <span className={cx('featuredProperties-price')}>
                    Starting from <strong>VND&nbsp; 3,377,030</strong>
                </span>
            </div>
            <div className={cx('featuredProperties-item')}>
                <img className={cx('featuredProperties-image')} src={images.sevenApartHotel} alt="" />
                <div className={cx('item-body')}>
                    <span className={cx('featuredProperties-name')}>7Seasons Apartments Budapest</span>
                    <span className={cx('featuredProperties-city')}>06. Terézváros, Hungary, Budapest</span>
                    <div className={cx('featuredProperties-rating')}>
                        <button>8.8</button>
                        <span className={cx('rating-point')}> Excellent </span>
                        <span className={cx('rating-reviews')}>. 8,565 reviews</span>
                    </div>
                </div>
                <span className={cx('featuredProperties-price')}>
                    Starting from <strong>VND&nbsp; 3,377,030</strong>
                </span>
            </div>
            <div className={cx('featuredProperties-item')}>
                <img className={cx('featuredProperties-image')} src={images.threeQuay} alt="" />
                <div className={cx('item-body')}>
                    <span className={cx('featuredProperties-name')}>Maroc</span>
                    <span className={cx('featuredProperties-city')}>HCM</span>
                    <div className={cx('featuredProperties-rating')}>
                        <button>9.0</button>
                        <span className={cx('rating-point')}> Excellent </span>
                        <span className={cx('rating-reviews')}>. 2400 reviews</span>
                    </div>
                </div>
                <span className={cx('featuredProperties-price')}>
                    Starting from <strong>VND&nbsp; 3,377,030</strong>
                </span>
            </div>
            <div className={cx('featuredProperties-item')}>
                <img className={cx('featuredProperties-image')} src={images.oriencePlaceHotel} alt="" />
                <div className={cx('item-body')}>
                    <span className={cx('featuredProperties-name')}>Cheval Three Quays at The Tower of London</span>
                    <span className={cx('featuredProperties-city')}>City of London, United Kingdom, London</span>
                    <div className={cx('featuredProperties-rating')}>
                        <button>9.4</button>
                        <span className={cx('rating-point')}> Wondeful </span>
                        <span className={cx('rating-reviews')}>. 617 reviews</span>
                    </div>
                </div>
                <span className={cx('featuredProperties-price')}>
                    Starting from <strong>VND&nbsp; 3,377,030</strong>
                </span>
            </div>
        </div>
    );
}

export default FeaturedProperties;
