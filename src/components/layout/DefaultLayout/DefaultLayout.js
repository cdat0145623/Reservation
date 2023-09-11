import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapperHome")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
