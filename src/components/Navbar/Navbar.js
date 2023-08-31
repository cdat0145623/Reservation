import classnames from "classnames/bind";
import styles from "./Navbar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import useFetch from "../hooks/useFetch";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const cx = classnames.bind(styles);

function Navbar() {
    const { darkMode, dispatch } = useContext(DarkModeContext);
    const { user } = useContext(AuthContext);
    const { id } = jwt_decode(user);
    // eslint-disable-next-line
    const { data } = useFetch(`/api/users/${id}`);
    const publicImage = "http://localhost:3003/images/";

    return (
        <div
            className={
                darkMode ? cx("wrapperNavbar", "dark") : cx("wrapperNavbar")
            }
        >
            <div className={cx("inner")}>
                <div className={cx("search")}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={cx("search-input")}
                    />
                    <SearchIcon className={cx("search-icon")} />
                </div>
                <div className={cx("items")}>
                    <div className={cx("item")}>
                        <LanguageOutlinedIcon className={cx("item-icon")} />
                        English
                    </div>
                    <div
                        className={cx("item")}
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    >
                        {darkMode ? (
                            <DarkModeRoundedIcon className={cx("item-icon")} />
                        ) : (
                            <DarkModeOutlinedIcon className={cx("item-icon")} />
                        )}
                    </div>
                    <div className={cx("item")}>
                        <FullscreenOutlinedIcon className={cx("item-icon")} />
                    </div>
                    <div className={cx("item")}>
                        <NotificationsNoneIcon className={cx("item-icon")} />
                        <div className={cx("counter")}>1</div>
                    </div>
                    <div className={cx("item")}>
                        <ChatBubbleOutlineIcon className={cx("item-icon")} />
                        <div className={cx("counter")}>2</div>
                    </div>
                    <div className={cx("item")}>
                        <FormatListBulletedIcon className={cx("item-icon")} />
                    </div>
                    <div className={cx("item")}>
                        <img
                            src={
                                data
                                    ? data?.image
                                    : publicImage + "default.jpeg"
                            }
                            alt=""
                            className={cx("item-image")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
