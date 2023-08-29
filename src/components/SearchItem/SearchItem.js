import styles from './SearchItem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import TippyReact from '@tippyjs/react';
import { Link, useNavigate } from 'react-router-dom';
import { dayDifference } from '~/pages/Single/dayDifference';
const cx = classNames.bind(styles);

function SearchItem({ setOpenDate, destination, city, dates, options, item }) {
    const publicImage = 'http://localhost:3003/public/img/';
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/hotels/${item?._id}`, {
            state: {
                city,
                destination,
                dates,
                options,
            },
        });
    };
    const days = dayDifference(dates[0]?.startDate, dates[0]?.endDate);
    return (
        <div className={cx('search-item')}>
            <img src={publicImage + item.photo[0]} alt="" className={cx('searchItem-image')} />
            <div className={cx('searchItem-description')}>
                <h1 className={cx('title')}>{item.name}</h1>
                <span className={cx('distance')}>Cách trung tâm {item.distance}</span>
                <span className={cx('taxiOp')}>Du lịch bền vững cấp 3</span>
                <span className={cx('subTitle')}>Studio Apartment with air conditioning</span>
                <span className={cx('featured')}>{item.description}</span>
                <span className={cx('cancelOp')}>Không cần thanh toán trước – thanh toán tại chỗ nghỉ</span>
                <span className={cx('cancelOpSubtitle')}>Miễn phí hủy bất kỳ lúc nào</span>
            </div>
            <div className={cx('details')}>
                {item.rating && (
                    <div className={cx('ratings')}>
                        <span>Xuất sắc</span>
                        <button>{item.rating}</button>
                    </div>
                )}
                <div className={cx('detail-text')}>
                    {dates[0]?.startDate && dates[0]?.endDate && days > 0 ? (
                        // <Link to={`${item._id}`}>
                        // </Link>
                        <>
                            <span className={cx('price')}>
                                VND&nbsp;
                                {item.cheapestPrice * days * options.room}
                            </span>
                            <span className={cx('taxOp')}>Đã bao gồm thuế và phí</span>
                            <div className={cx('searchView-button')} onClick={handleOnClick}>
                                <button className={cx('check-btn')}>Xem chỗ trống</button>
                                <FontAwesomeIcon icon={faChevronRight} className={cx('detail-icon')} />
                            </div>
                        </>
                    ) : (
                        <TippyReact content="Để xem giá phòng, hãy nhập ngày nhận phòng và trả phòng trong ô tìm kiếm">
                            <div className={cx('searchView-button')}>
                                <button className={cx('check-btn')} onClick={() => setOpenDate(true)}>
                                    Hiển thị giá
                                </button>
                            </div>
                        </TippyReact>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
