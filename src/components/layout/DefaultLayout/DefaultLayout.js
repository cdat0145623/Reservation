import Navbar from '~/pages/Navbar/Navbar';
import Header from '~/pages/Header/Header';
import MailList from '~/components/MailList/MailList';
import Footer from '~/components/Footer/Footer';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Navbar />
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
                <MailList />
                <Footer />
            </div>
        </>
    );
}

export default DefaultLayout;
