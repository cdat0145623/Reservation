import classnames from "classnames/bind";
import styles from "./Featured.module.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const cx = classnames.bind(styles);

function Featured() {
    return (
        <div className={cx("wrapper", "dark")}>
            <div className={cx("top")}>
                <h1 className={cx("title-top")}>Total Revenue</h1>
                <MoreVertOutlinedIcon className={cx("icon")} />
            </div>
            <div className={cx("bottom")}>
                <div className={cx("featured-chart")}>
                    <CircularProgressbar
                        value={70}
                        text={"70%"}
                        strokeWidth={5}
                    />
                </div>
                <p className={cx("title-bottom")}>Total sales made today</p>
                <p className={cx("amount")}>$420</p>
                <p className={cx("description")}>
                    Previous transaction processing. Lasts payment may not be
                    included.
                </p>
                <div className={cx("summary")}>
                    <div className={cx("item")}>
                        <div className={cx("item-title")}>Target</div>
                        <div className={cx("item-result", "negative")}>
                            <KeyboardArrowDownOutlinedIcon
                                className={cx("item-icon")}
                            />
                            <div className={cx("result-amount")}>$12.4k</div>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("item-title")}>Last week</div>
                        <div className={cx("item-result", "positive")}>
                            <KeyboardArrowUpIcon className={cx("item-icon")} />
                            <div className={cx("result-amount")}>$13.123k</div>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("item-title")}>Last month</div>
                        <div className={cx("item-result", "positive")}>
                            <KeyboardArrowUpIcon className={cx("item-icon")} />
                            <div className={cx("result-amount")}>$11.456k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
