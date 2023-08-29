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
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import useFetch from "../hooks/useFetch";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

import axios from "~/api/axios";
const cx = classnames.bind(styles);

function Sidebar() {
    const { darkMode, dispatch } = useContext(DarkModeContext);
    const { dispatchAuth } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const { id } = jwt_decode(user);
    const { data } = useFetch(`/api/users/${id}`);
    const handleLogout = async () => {
        await axios.get("/api/auth/logout", { withCredentials: true });
        dispatchAuth({
            type: "LOGOUT",
        });
    };
    return (
        <div className={darkMode ? cx("wrapper", "dark") : cx("wrapper")}>
            <div className={cx("top")}>
                <Link to="/">
                    <span className={cx("logo")}>Admin</span>
                </Link>
            </div>
            <hr className={cx("border-bottom")} />
            <div className={cx("center")}>
                <ul>
                    <p className={cx("title")}>MAIN</p>
                    <Link to="/">
                        <li className={cx("item")}>
                            <DashboardIcon className={cx("icon")} />
                            <span className={cx("name")}>Dashboard</span>
                        </li>
                    </Link>
                    <p className={cx("title")}>LISTS</p>
                    <Link to="/users">
                        <li className={cx("item")}>
                            <PersonOutlineOutlinedIcon className={cx("icon")} />
                            <span className={cx("name")}>User</span>
                        </li>
                    </Link>
                    <Link to="/hotels">
                        <li className={cx("item")}>
                            <StoreIcon className={cx("icon")} />
                            <span className={cx("name")}>Hotel</span>
                        </li>
                    </Link>
                    <Link to="/rooms">
                        <li className={cx("item")}>
                            <AddCardIcon className={cx("icon")} />
                            <span className={cx("name")}>Rooms</span>
                        </li>
                    </Link>
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
                    <Link to={`/users/${data?._id}`}>
                        <li className={cx("item")}>
                            <AccountCircleOutlinedIcon className={cx("icon")} />
                            <span className={cx("name")}>Profile</span>
                        </li>
                    </Link>
                    <li className={cx("item")} onClick={handleLogout}>
                        <ExitToAppOutlinedIcon className={cx("icon")} />
                        <span className={cx("name")}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={cx("bottom")}>
                <div
                    className={cx("color-options")}
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className={cx("color-options")}
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
}

export default Sidebar;