import classnames from "classnames/bind";
import styles from "./Single.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import Chart from "~/components/Chart/Chart";
import List from "~/components/Table/Table";
import { useContext } from "react";
import { DarkModeContext } from "~/components/context/DarkModeContext";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

const cx = classnames.bind(styles);
function Single() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? cx("wrapper", "dark") : cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("top")}>
                    <div className={cx("left")}>
                        <div className={cx("editButton")}>
                            <EditCalendarOutlinedIcon
                                className={cx("edit-icon")}
                            />
                            <span className={cx("edit-text")}>
                                Edit profile
                            </span>
                        </div>
                        <h1 className={cx("title")}>Information</h1>
                        <div className={cx("item")}>
                            <img
                                className={cx("item-img")}
                                src="https://i.pinimg.com/originals/95/39/18/9539188d8df330758c9a3d99e73675be.jpg"
                                alt="avatar"
                            />
                            <div className={cx("details")}>
                                <h1 className={cx("detailTitle")}>Jonh</h1>
                                <div className={cx("detailItem")}>
                                    <span className={cx("itemKey")}>
                                        Email:
                                    </span>
                                    <span className={cx("itemValue")}>
                                        allmid@gmail.com
                                    </span>
                                </div>
                                <div className={cx("detailItem")}>
                                    <span className={cx("itemKey")}>
                                        Phone:
                                    </span>
                                    <span className={cx("itemValue")}>
                                        +0989020202
                                    </span>
                                </div>
                                <div className={cx("detailItem")}>
                                    <span className={cx("itemKey")}>
                                        Address:
                                    </span>
                                    <span className={cx("itemValue")}>
                                        177 35a Trinh Quang Nghi Street
                                    </span>
                                </div>
                                <div className={cx("detailItem")}>
                                    <span className={cx("itemKey")}>
                                        Country:
                                    </span>
                                    <span className={cx("itemValue")}>USA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("right")}>
                        <Chart
                            title="User spending (Last 6 month)"
                            aspect={3 / 1}
                        />
                    </div>
                </div>
                <div className={cx("bottom")}>
                    <h1 className={cx("bottom-title")}>Last transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
}

export default Single;
