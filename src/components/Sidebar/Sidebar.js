import classnames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
const cx = classnames.bind(styles);

function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("top")}>
                <span className={cx("logo")}>Admin</span>
            </div>
            <hr className={cx("border-bottom")} />
            <div className={cx("center")}>
                <ul>
                    <p className={cx("title")}>MAIN</p>
                    <li className={cx("item")}>
                        <DashboardIcon
                            // style={{ fontSize: "2rem" }}
                            className={cx("icon")}
                        />
                        <span className={cx("name")}>Dashboard</span>
                    </li>
                    <p className={cx("title")}>LISTS</p>
                    <li className={cx("item")}>
                        <PersonOutlineOutlinedIcon className={cx("icon")} />
                        <span className={cx("name")}>User</span>
                    </li>
                    <li className={cx("item")}>
                        <StoreIcon className={cx("icon")} />
                        <span className={cx("name")}>Product</span>
                    </li>
                    <li className={cx("item")}>
                        <AddCardIcon className={cx("icon")} />
                        <span className={cx("name")}>Orders</span>
                    </li>
                    <li className={cx("item")}>
                        <LocalShippingIcon className={cx("icon")} />
                        <span className={cx("name")}>Delivery</span>
                    </li>
                    <p className={cx("title")}>USEFUL</p>
                    <li className={cx("item")}>
                        <EqualizerIcon className={cx("icon")} />
                        <span className={cx("name")}>Stats</span>
                    </li>
                    <li className={cx("item")}>
                        <NotificationsNoneIcon className={cx("icon")} />
                        <span className={cx("name")}>Notifications</span>
                    </li>
                    <p className={cx("title")}>SERVICE</p>
                    <li className={cx("item")}>
                        <SettingsSystemDaydreamIcon className={cx("icon")} />
                        <span className={cx("name")}>Systems Health</span>
                    </li>
                    <li className={cx("item")}>
                        <PsychologyOutlinedIcon className={cx("icon")} />
                        <span className={cx("name")}>Logs</span>
                    </li>
                    <li className={cx("item")}>
                        <SettingsApplicationsIcon className={cx("icon")} />
                        <span className={cx("name")}>Settings</span>
                    </li>
                    <p className={cx("title")}>USER</p>
                    <li className={cx("item")}>
                        <AccountCircleOutlinedIcon className={cx("icon")} />
                        <span className={cx("name")}>Profile</span>
                    </li>
                    <li className={cx("item")}>
                        <ExitToAppOutlinedIcon className={cx("icon")} />
                        <span className={cx("name")}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={cx("bottom")}>
                <div className={cx("color-options")}></div>
                <div className={cx("color-options")}></div>
            </div>
        </div>
    );
}

export default Sidebar;