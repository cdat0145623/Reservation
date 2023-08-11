import classnames from "classnames/bind";
import styles from "./NewHotel.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "~/formsource";
import useFetch from "~/components/hooks/useFetch";
const cx = classnames.bind(styles);

function NewHotel() {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    const { data, loading } = useFetch("/api/rooms");

    const publicImage = "http://localhost:3003/images/";

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    console.log(info);

    const handleSelect = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
    };
    console.log(files);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dafyuivup/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newHotel = {
                ...info,
                rooms,
                photo: list,
            };

            const res = await axios.post("/api/hotels", newHotel);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("top")}>
                    <h1 className={cx("title")}>Add new Hotel</h1>
                </div>
                <div className={cx("bottom")}>
                    <div className={cx("left")}>
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files[0])
                                    : publicImage + "default.jpeg"
                            }
                            alt=""
                            className={cx("image")}
                        />
                    </div>
                    <div className={cx("right")}>
                        <form className={cx("form")}>
                            <div className={cx("formItem")}>
                                <label
                                    htmlFor="file"
                                    className={cx("formLabel")}
                                >
                                    Image:{" "}
                                    <DriveFolderUploadIcon
                                        className={cx("icon")}
                                    />
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    className={cx("formInput")}
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                            </div>
                            {hotelInputs.map((input) => (
                                <div className={cx("formItem")} key={input.id}>
                                    <label className={cx("formLabel")}>
                                        {input.label}
                                    </label>
                                    <input
                                        type={input.type}
                                        className={cx("formInput")}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className={cx("formItem")}>
                                <label className={cx("formLabel")}>
                                    Featured
                                </label>
                                <select
                                    id="featured"
                                    onChange={handleChange}
                                    className={cx("featured-select")}
                                >
                                    <option
                                        className={cx("featured-option")}
                                        value={false}
                                    >
                                        No
                                    </option>
                                    <option
                                        className={cx("featured-option")}
                                        value={true}
                                    >
                                        Yes
                                    </option>
                                </select>
                            </div>
                            <div className={cx("selectRooms")}>
                                <label className={cx("formLabel")}>Rooms</label>
                                <select
                                    id="rooms"
                                    multiple
                                    onChange={handleSelect}
                                    className={cx("selectRoom-option")}
                                >
                                    {loading
                                        ? "loading"
                                        : data &&
                                          data.map((room) => (
                                              <option
                                                  className={cx("room-option")}
                                                  key={room._id}
                                                  value={room._id}
                                              >
                                                  {room.title}
                                              </option>
                                          ))}
                                </select>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className={cx("button")}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewHotel;
