import classnames from "classnames/bind";
import styles from "./Widget.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function Widget({ type, length }) {
    const diff = 20;
    let data;
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: (
                    <Link to="/users" className={cx("link")}>
                        <span className={cx("link-text")}>See all users</span>
                    </Link>
                ),
                icon: (
                    <PersonOutlineIcon
                        className={cx("icon")}
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "hotel":
            data = {
                title: "HOTELS",
                isMoney: false,
                link: (
                    <Link to="/hotels" className={cx("link")}>
                        <span className={cx("link-text")}>See all hotels</span>
                    </Link>
                ),
                icon: (
                    <ApartmentIcon
                        className={cx("icon")}
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "room":
            data = {
                title: "ROOMS",
                isMoney: false,
                link: (
                    <Link to="/users" className={cx("link")}>
                        <span className={cx("link-text")}>See all rooms</span>
                    </Link>
                ),
                icon: (
                    <RoomPreferencesOutlinedIcon
                        className={cx("icon")}
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className={cx("icon")}
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                        }}
                    />
                ),
            };
            break;

        default:
            break;
    }
    return (
        <div className={cx("wrapperWidget")}>
            <div className={cx("left")}>
                <span className={cx("title")}>{data?.title}</span>
                <span className={cx("counter")}>
                    {data?.isMoney && "$"} {length ? length : null}
                </span>
                {data?.link}
            </div>
            <div className={cx("right")}>
                <div className={cx("percentage")}>
                    <KeyboardArrowUpIcon className={cx("icon")} />
                    {diff}
                </div>
                {data?.icon}
            </div>
        </div>
    );
}

export default Widget;
