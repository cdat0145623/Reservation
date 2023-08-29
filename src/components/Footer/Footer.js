import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Quốc gia</li>
                    <li className={cx('item')}>Khu vực</li>
                    <li className={cx('item')}>Thành phố</li>
                    <li className={cx('item')}>Quận </li>
                    <li className={cx('item')}>Sân bay</li>
                    <li className={cx('item')}>Khách sạn</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Nhà</li>
                    <li className={cx('item')}>Căn hộ</li>
                    <li className={cx('item')}>Resort</li>
                    <li className={cx('item')}>Biệt thự</li>
                    <li className={cx('item')}>Nhà trọ</li>
                    <li className={cx('item')}>Khách</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Những chỗ nghỉ độc đáo</li>
                    <li className={cx('item')}>Tất cả các điểm đến</li>
                    <li className={cx('item')}>Tất cả các điểm đến có chuyến bay</li>
                    <li className={cx('item')}>Tất cả địa điểm cho thuê xe</li>
                    <li className={cx('item')}>Khám phá</li>
                    <li className={cx('item')}>Đánh giá của khách</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Cho thuê xe hơi</li>
                    <li className={cx('item')}>Tìm chuyến bay</li>
                    <li className={cx('item')}>Đặt nhà hàng</li>
                    <li className={cx('item')}>Booking.com dành cho Đại Lý Du Lịch</li>
                    <li className={cx('item')}>Các bài viết</li>
                    <li className={cx('item')}>Ưu đãi theo mùa và dịp lễ</li>
                </ul>
                <ul className={cx('list')}>
                    <li className={cx('item')}>Dịch vụ khách hàng</li>
                    <li className={cx('item')}>Trợ giúp đối tác</li>
                    <li className={cx('item')}>Careers</li>
                    <li className={cx('item')}>Du lịch bền vững</li>
                    <li className={cx('item')}>Truyền thông</li>
                    <li className={cx('item')}>Trung tâm thông tin bảo mật</li>
                </ul>
            </div>
            <div className={cx('text')}>Bản quyền © 1996–2023 Booking.com™. Bảo lưu mọi quyền.</div>
        </div>
    );
}

export default Footer;
