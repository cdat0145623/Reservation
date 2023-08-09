import classnames from "classnames/bind";
import styles from "./Widget.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const cx = classnames.bind(styles);

function Widget({ type }) {
    const amount = 100;
    const diff = 20;
    let data;
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
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
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "See all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className={cx("icon")}
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNING",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon
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
                <span className={cx("title")}>{data.title}</span>
                <span className={cx("counter")}>
                    {data.isMoney && "$"} {amount}
                </span>
                <span className={cx("link")}>{data.link}</span>
            </div>
            <div className={cx("right")}>
                <div className={cx("percentage")}>
                    <KeyboardArrowUpIcon className={cx("icon")} />
                    {diff}
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
