import Featured from '~/components/Featured/Featured';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PropertyList from '~/components/PropertyList/PropertyList';
import FeaturedProperties from '~/components/FeaturedProperties/FeaturedProperties';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <Featured />
            <h1 className={cx('home-title')}>Tìm theo loại chỗ nghỉ</h1>
            <PropertyList />
            <h1 className={cx('home-title')}>Nhà ở mà khách yêu thích</h1>
            <FeaturedProperties />
        </div>
    );
}

export default Home;
