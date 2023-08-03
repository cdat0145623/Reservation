import images from '~/assets/images';
import styles from './PropertyList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PropertyList() {
    return (
        <div className={cx('property-list')}>
            <div className={cx('propertyList-item')}>
                <img src={images.hotel} alt="" className={cx('propertyList-image')} />
                <div className={cx('propertyList-titles')}>
                    <h1>Apartment</h1>
                    <span>29383 properties</span>
                </div>
            </div>
            <div className={cx('propertyList-item')}>
                <img src={images.apartment} alt="" className={cx('propertyList-image')} />
                <div className={cx('propertyList-titles')}>
                    <h1>Apartment</h1>
                    <span>2999222 properties</span>
                </div>
            </div>
            <div className={cx('propertyList-item')}>
                <img src={images.resort} alt="" className={cx('propertyList-image')} />
                <div className={cx('propertyList-titles')}>
                    <h1>Resorts</h1>
                    <span>11 properties</span>
                </div>
            </div>
            <div className={cx('propertyList-item')}>
                <img src={images.villa} alt="" className={cx('propertyList-image')} />
                <div className={cx('propertyList-titles')}>
                    <h1>Villas</h1>
                    <span>934 properties</span>
                </div>
            </div>
            {/* <div className={cx('propertyList-item')}>
                <img src={images.cabin} alt="" className={cx('propertyList-image')} />
                <div className={cx('propertyList-title')}>
                    <h1>Cabins</h1>
                    <h2>3638 properties</h2>
                </div>
            </div> */}
        </div>
    );
}

export default PropertyList;
