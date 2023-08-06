import styles from './SearchItem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SearchItem({ item }) {
    return (
        <div className={cx('search-item')}>
            <img src={images.luxuryCondo} alt="" className={cx('searchItem-image')} />
            <div className={cx('searchItem-description')}>
                <h1 className={cx('title')}>{item.name}</h1>
                <span className={cx('distance')}>Cách trung tâm {item.distance}</span>
                <span className={cx('taxiOp')}>Free airport taxi</span>
                <span className={cx('subTitle')}>Studio Apartment with air conditioning</span>
                <span className={cx('featured')}>{item.description}</span>
                <span className={cx('cancelOp')}>Free cancellation</span>
                <span className={cx('cancelOpSubtitle')}>You can cancel later, so lock in this great price day</span>
            </div>
            <div className={cx('details')}>
                {item.rating && (
                    <div className={cx('ratings')}>
                        <span>Xuất sắc</span>
                        <button>{item.rating}</button>
                    </div>
                )}
                <div className={cx('detail-text')}>
                    <span className={cx('price')}>VND&nbsp;{item.cheapestPrice}</span>
                    <span className={cx('taxOp')}>Đã bao gồm thuế và phí</span>
                    <Link to={`${item._id}`}>
                        <div className={cx('searchView-button')}>
                            <button className={cx('check-btn')}>Xem chỗ trống</button>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('detail-icon')} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
