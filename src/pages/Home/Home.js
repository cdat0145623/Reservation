import Sidebar from "~/components/Sidebar/Sidebar";
import classnames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classnames.bind(styles);
function Home() {
    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>home container</div>
        </div>
    );
}

export default Home;
