import classnames from "classnames/bind";
import styles from "./NewRoom.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { roomInputs } from "~/formsource";
import useFetch from "~/components/hooks/useFetch";
const cx = classnames.bind(styles);

function NewRoom() {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const { data, loading } = useFetch("/api/hotels");
    console.log(data);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            const res = await axios.post(`/api/rooms/${hotelId}`, {
                ...info,
                roomNumbers,
            });
            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("top")}>
                    <h1 className={cx("title")}>Add new User</h1>
                </div>
                <div className={cx("bottom")}>
                    <div className={cx("right")}>
                        <form className={cx("form")}>
                            {roomInputs.map((input) => (
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
                                <label className={cx("formLabel")}>Rooms</label>
                                <textarea
                                    className={cx("formTextarea")}
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="give comma between rooms"
                                ></textarea>
                            </div>
                            <div className={cx("formItem")}>
                                <label className={cx("formLabel")}>
                                    Choose a hotel
                                </label>
                                <select
                                    className={cx("selectHotel")}
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {loading
                                        ? "loading"
                                        : data &&
                                          data.map((hotel) => (
                                              <option
                                                  key={hotel._id}
                                                  className={cx("hotelOption")}
                                                  value={hotel._id}
                                              >
                                                  {hotel.name}
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

export default NewRoom;
