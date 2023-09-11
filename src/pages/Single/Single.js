import classnames from "classnames/bind";
import styles from "./Single.module.scss";
import Chart from "~/components/Chart/Chart";
import List from "~/components/Table/Table";
import { useContext, useState } from "react";
import { DarkModeContext } from "~/components/context/DarkModeContext";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { AuthContext } from "~/components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Profile from "../Profile/Profile";
import useFetch from "~/components/hooks/useFetch";

const cx = classnames.bind(styles);
function Single() {
    const { darkMode } = useContext(DarkModeContext);
    const { user } = useContext(AuthContext);
    const { id } = jwt_decode(user);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading } = useFetch(`/api/users/${id}`);
    const publicImage = "http://localhost:3003/images/";
    const navigate = useNavigate();

    const handleOpenModal = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={darkMode ? cx("wrapper", "dark") : cx("wrapper")}>
            <div className={cx("top")}>
                {loading
                    ? "Loading..."
                    : data && (
                          <div className={cx("left")}>
                              <div
                                  className={cx("editButton")}
                                  onClick={handleOpenModal}
                              >
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
                                      src={
                                          data?.image ||
                                          publicImage + "default.jpeg"
                                      }
                                      alt="avatar"
                                  />
                                  <div className={cx("details")}>
                                      <h1 className={cx("detailTitle")}>
                                          {data.name}
                                      </h1>
                                      <div className={cx("detailItem")}>
                                          <span className={cx("itemKey")}>
                                              Email:
                                          </span>
                                          <span className={cx("itemValue")}>
                                              {data.email}
                                          </span>
                                      </div>
                                      <div className={cx("detailItem")}>
                                          <span className={cx("itemKey")}>
                                              Phone:
                                          </span>
                                          <span className={cx("itemValue")}>
                                              {data.phone}
                                          </span>
                                      </div>
                                      <div className={cx("detailItem")}>
                                          <span className={cx("itemKey")}>
                                              Address:
                                          </span>
                                          <span className={cx("itemValue")}>
                                              {data.city}
                                          </span>
                                      </div>
                                      <div className={cx("detailItem")}>
                                          <span className={cx("itemKey")}>
                                              Country:
                                          </span>
                                          <span className={cx("itemValue")}>
                                              {data.country}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                <div className={cx("right")}>
                    <Chart
                        title="User spending (Last 6 month)"
                        aspect={2 / 1}
                    />
                </div>
            </div>
            <div className={cx("bottom")}>
                <h1 className={cx("bottom-title")}>Last transactions</h1>
                <List />
            </div>
            {openModal && <Profile setOpen={setOpenModal} userId={id} />}
        </div>
    );
}

export default Single;
