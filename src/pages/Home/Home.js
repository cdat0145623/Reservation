import Header from '~/pages/Header/Header';
import Navbar from '../Navbar/Navbar';
import Featured from '~/components/Featured/Featured';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PropertyList from '~/components/PropertyList/PropertyList';
import FeaturedProperties from '~/components/FeaturedProperties/FeaturedProperties';
import MailList from '~/components/MailList/MailList';
import Footer from '~/components/Footer/Footer';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <div className={cx('wrapper')}>
                <Featured />
                <h1 className={cx('home-title')}>Explore Vietnam</h1>
                <PropertyList />
                <h1 className={cx('home-title')}>Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
