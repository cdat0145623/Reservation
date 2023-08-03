import styles from './SearchItem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SearchItem() {
    return (
        <div className={cx('search-item')}>
            <img src={images.luxuryCondo} alt="" className={cx('searchItem-image')} />
            <div className={cx('searchItem-description')}>
                <h1 className={cx('title')}>Oceanust View Beach Nha Trang</h1>
                <span className={cx('distance')}>Cách trung tâm 5,1km</span>
                <span className={cx('taxiOp')}>Free airport taxi</span>
                <span className={cx('subTitle')}>Studio Apartment with air conditioning</span>
                <span className={cx('featured')}>
                    1 căn hộ nguyên căn • 2 phòng ngủ • 1 phòng khách • <br />1 phòng tắm • 1 phòng bếp 3 giường <br />
                    (2 giường đôi, 1 giường sofa)
                </span>
                <span className={cx('cancelOp')}>Free cancellation</span>
                <span className={cx('cancelOpSubtitle')}>You can cancel later, so lock in this great price day</span>
            </div>
            <div className={cx('details')}>
                <div className={cx('ratings')}>
                    <span>Xuất sắc</span>
                    <button>8.9</button>
                </div>
                <div className={cx('detail-text')}>
                    <span className={cx('price')}>VND&nbsp;39.000.000</span>
                    <span className={cx('taxOp')}>Đã bao gồm thuế và phí</span>
                    <div className={cx('searchView-button')}>
                        <button className={cx('check-btn')}>Xem chỗ trống</button>
                        <FontAwesomeIcon icon={faChevronRight} className={cx('detail-icon')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
