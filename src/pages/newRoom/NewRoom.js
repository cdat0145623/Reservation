import classnames from "classnames/bind";
import styles from "./NewRoom.module.scss";
import { useState, useEffect } from "react";
import axios from "~/api/axios";
import useFetch from "~/components/hooks/useFetch";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Swal from "sweetalert2";

const cx = classnames.bind(styles);

const TITLE_REGEX = /^[A-Za-z\s]*$/;
const DESCRIPTION_REGEX = /^[a-zA-Z ]{2,1000}$/;
const PRICE_REGEX = /^\d+$/;
const ROOM_REGEX = /^[\d|.|,]+/;
const PEOPLE_REGEX = /^\d+$/;

function NewRoom() {
    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [price, setPrice] = useState("");
    const [validPrice, setValidPrice] = useState(false);
    const [priceFocus, setPriceFocus] = useState(false);

    const [title, setTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [people, setPeople] = useState("");
    const [validPeople, setValidPeople] = useState(false);
    const [peopleFocus, setPeopleFocus] = useState(false);

    const [rooms, setRooms] = useState("");
    const [validRooms, setValidRooms] = useState(false);
    const [roomsFocus, setRoomsFocus] = useState(false);

    const [hotelId, setHotelId] = useState(undefined);
    const [validHotel, setValidHotel] = useState(false);
    const { data, loading } = useFetch("/api/hotels");
    // console.log(data);

    useEffect(() => {
        setValidDescription(DESCRIPTION_REGEX.test(description));
        // eslint-disable-next-line
    }, [description]);

    useEffect(() => {
        title ? setValidTitle(TITLE_REGEX.test(title)) : setValidTitle(false);
        // eslint-disable-next-line
    }, [title]);

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(price));
        // eslint-disable-next-line
    }, [price]);

    useEffect(() => {
        setValidPeople(PEOPLE_REGEX.test(people));
        // eslint-disable-next-line
    }, [people]);

    useEffect(() => {
        setValidRooms(ROOM_REGEX.test(rooms));
        // eslint-disable-next-line
    }, [rooms]);

    useEffect(() => {
        // eslint-disable-next-line
        hotelId ? setValidHotel(true) : setValidHotel(false);
    }, [hotelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            const res = await axios.post(
                `/api/rooms/${hotelId}`,
                {
                    title,
                    description,
                    maxPeople: people,
                    price,
                    roomNumbers,
                },
                { withCredentials: true }
            );
            console.log(res.data);
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "New Room has been created",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTitle("");
                setDescription("");
                setPrice("");
                setPeople("");
                setRooms("");
            }
        } catch (error) {
            console.log(error.response);
            if (error?.response?.status === 400) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error?.response?.data?.message}`,
                    color: "#fe2c55",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("top")}>
                <h1 className={cx("title")}>Add new Rooms</h1>
            </div>
            <div className={cx("bottom")}>
                <div className={cx("right")}>
                    <form className={cx("form")}>
                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Title:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="title"
                                    autoComplete="off"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                    aria-invalid={validTitle ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setTitleFocus(true)}
                                    onBlur={() => setTitleFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validTitle ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validTitle || !title
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    titleFocus && title && !validTitle
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 50 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                It can be space
                                <br />
                                Don't allow special characters
                            </p>
                        </div>
                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>
                                Description:
                            </label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="description"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                    required
                                    aria-invalid={
                                        validDescription ? "false" : "true"
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setDescriptionFocus(true)}
                                    onBlur={() => setDescriptionFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validDescription
                                            ? cx("valid")
                                            : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validDescription || !description
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    descriptionFocus &&
                                    description &&
                                    !validDescription
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 1000 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>
                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Price:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="price"
                                    autoComplete="off"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    required
                                    aria-invalid={validPrice ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setPriceFocus(true)}
                                    onBlur={() => setPriceFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validPrice ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validPrice || !price
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    priceFocus && price && !validPrice
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                Must begin with a number.
                                <br />
                            </p>
                        </div>
                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>
                                Max people:
                            </label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="people"
                                    onChange={(e) => setPeople(e.target.value)}
                                    autoComplete="off"
                                    value={people}
                                    required
                                    aria-invalid={
                                        validPeople ? "false" : "true"
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setPeopleFocus(true)}
                                    onBlur={() => setPeopleFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validPeople ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validPeople || !people
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    peopleFocus && people && !validPeople
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                Must begin with number.
                                <br />
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Rooms</label>
                            <div className={cx("wrapperInput")}>
                                <textarea
                                    className={cx("formTextarea")}
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="give comma between rooms"
                                    autoComplete="off"
                                    value={rooms}
                                    required
                                    aria-invalid={validRooms ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setRoomsFocus(true)}
                                    onBlur={() => setRoomsFocus(false)}
                                ></textarea>
                                <CheckOutlinedIcon
                                    className={
                                        validRooms ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validRooms || !rooms
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    roomsFocus && rooms && !validRooms
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                Must begin with a number.
                                <br />
                                Give a comma between the rooms
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>
                                Choose a hotel
                                <CheckOutlinedIcon
                                    className={
                                        validHotel
                                            ? cx("hotelValid")
                                            : cx("hide")
                                    }
                                />
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
                            disabled={
                                !validPrice ||
                                !validTitle ||
                                !validDescription ||
                                !people ||
                                !rooms ||
                                !validHotel
                                    ? true
                                    : false
                            }
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewRoom;
