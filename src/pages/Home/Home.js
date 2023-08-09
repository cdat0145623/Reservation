import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import Widget from "~/components/Widget/Widget";
import Featured from "~/components/Featured/Featured";
import Chart from "~/components/Chart/Chart";
import Table from "~/components/Table/Table";

const cx = classnames.bind(styles);
function Home() {
    return (
        <div className={cx("wrapperHome")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("widgets")}>
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className={cx("charts")}>
                    <Featured />
                    <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" />
                </div>
                <div className={cx("list-container")}>
                    <div className={cx("list-title")}>Lastest transaction</div>
                    <Table />
                </div>
            </div>
        </div>
    );
}

export default Home;
