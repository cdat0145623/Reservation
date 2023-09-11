import classnames from "classnames/bind";
import styles from "./NewHotel.module.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useState, useEffect } from "react";
import useFetch from "~/components/hooks/useFetch";
import axios from "~/api/axios";
import Swal from "sweetalert2";
const cx = classnames.bind(styles);

const NAME_REGEX = /^[a-zA-Z ]{2,30}$/;
const TYPE_REGEX = /^[a-zA-Z ]{2,30}$/;
const CITY_REGEX = /^[a-zA-Z ]{2,16}$/;
const COUNTRY_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;
const TITLE_REGEX = /^[a-zA-Z ]{2,50}$/;
const DESCRIPTION_REGEX = /^[a-zA-Z ]{2,1000}$/;
const PRICE_REGEX = /^\d+$/;
const DISTANCE_REGEX = /^\d+$/;

function NewHotel() {
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [type, setType] = useState("");
    const [validType, setValidType] = useState(false);
    const [typeFocus, setTypeFocus] = useState(false);

    const [city, setCity] = useState("");
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [country, setCountry] = useState("");
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);

    const [distance, setDistance] = useState("");
    const [validDistance, setValidDistance] = useState(false);
    const [distanceFocus, setDistanceFocus] = useState(false);

    const [title, setTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [cheapestPrice, setCheapestPrice] = useState("");
    const [validCheapestPrice, setValidCheapestPrice] = useState(false);
    const [cheapestPriceFocus, setCheapestPriceFocus] = useState(false);

    const [selectedRooms, setSelectedRooms] = useState([]);
    const [validSelectedRooms, setValidSelectedRooms] = useState(false);

    const [files, setFiles] = useState("");
    const [validImage, setValidImage] = useState(false);

    const { data, loading } = useFetch("/api/rooms");

    // console.log(data);

    const publicImage = "http://localhost:3003/images/";

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
        // eslint-disable-next-line
    }, [name]);

    useEffect(() => {
        setValidType(TYPE_REGEX.test(type));
        // eslint-disable-next-line
    }, [type]);

    useEffect(() => {
        setValidCountry(COUNTRY_REGEX.test(country));
        // eslint-disable-next-line
    }, [country]);

    useEffect(() => {
        setValidCity(CITY_REGEX.test(city));
        // eslint-disable-next-line
    }, [city]);

    useEffect(() => {
        setValidDistance(DISTANCE_REGEX.test(distance));
        // eslint-disable-next-line
    }, [distance]);

    useEffect(() => {
        setValidDescription(DESCRIPTION_REGEX.test(description));
        // eslint-disable-next-line
    }, [description]);

    useEffect(() => {
        setValidTitle(TITLE_REGEX.test(title));
        // eslint-disable-next-line
    }, [title]);

    useEffect(() => {
        setValidCheapestPrice(PRICE_REGEX.test(cheapestPrice));
        // eslint-disable-next-line
    }, [cheapestPrice]);

    useEffect(() => {
        // eslint-disable-next-line
        // console.log(selectedRooms);
        selectedRooms.length > 0
            ? setValidSelectedRooms(true)
            : setValidSelectedRooms(false);
        // eslint-disable-next-line
    }, [selectedRooms]);

    useEffect(() => {
        const filesArray = Array.from(files);
        const isImage = filesArray.every((file) => {
            return file?.type?.split("/")[0] === "image";
        });
        isImage ? setValidImage(true) : setValidImage(false);
    }, [files]);

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

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
                name,
                type,
                title,
                description,
                cheapestPrice,
                distance,
                address: country,
                city,
                selectedRooms,
                photo: list,
            };

            const res = await axios.post("/api/hotels", newHotel, {
                withCredentials: true,
            });
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "New hotel has been created",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setName("");
                setType("");
                setTitle("");
                setDescription("");
                setCheapestPrice("");
                setDistance("");
                setCountry("");
                setCity("");
                setSelectedRooms("");
                setFiles("");
            }
        } catch (error) {
            console.log(error);
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
                <div className={cx("left")}>
                    <img
                        src={
                            files?.length > 0
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
                            <label htmlFor="file" className={cx("formLabel")}>
                                Image:{" "}
                                <DriveFolderUploadIcon className={cx("icon")} />
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

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Name:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="name"
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validName ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validName || !name
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    nameFocus && name && !validName
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                4 to 30 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores allowed.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Type:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="type"
                                    autoComplete="off"
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}
                                    required
                                    aria-invalid={validType ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setTypeFocus(true)}
                                    onBlur={() => setTypeFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validType ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validType || !type
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    typeFocus && type && !validType
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                4 to 30 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores allowed.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Distance:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="distance"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setDistance(e.target.value)
                                    }
                                    value={distance}
                                    required
                                    aria-invalid={
                                        validDistance ? "false" : "true"
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setDistanceFocus(true)}
                                    onBlur={() => setDistanceFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validDistance ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validDistance || !distance
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    distanceFocus && distance && !validDistance
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>

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
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
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
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Country:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="country"
                                    autoComplete="off"
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                    required
                                    aria-invalid={
                                        validCountry ? "false" : "true"
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setCountryFocus(true)}
                                    onBlur={() => setCountryFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validCountry ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validCountry || !country
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    countryFocus && country && !validCountry
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>City:</label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="city"
                                    autoComplete="off"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    required
                                    aria-invalid={validCity ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setCityFocus(true)}
                                    onBlur={() => setCityFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validCity ? cx("valid") : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validCity || !city
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    cityFocus && city && !validCity
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>
                                CheapestPrice:
                            </label>
                            <div className={cx("wrapperInput")}>
                                <input
                                    className={cx("formInput")}
                                    type="text"
                                    id="cheapestPrice"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setCheapestPrice(e.target.value)
                                    }
                                    value={cheapestPrice}
                                    required
                                    aria-invalid={
                                        validCheapestPrice ? "false" : "true"
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setCheapestPriceFocus(true)}
                                    onBlur={() => setCheapestPriceFocus(false)}
                                />
                                <CheckOutlinedIcon
                                    className={
                                        validCheapestPrice
                                            ? cx("valid")
                                            : cx("hide")
                                    }
                                />
                                <CloseOutlinedIcon
                                    className={
                                        validCheapestPrice || !cheapestPrice
                                            ? cx("hide")
                                            : cx("invalid")
                                    }
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    cheapestPriceFocus &&
                                    cheapestPrice &&
                                    !validCheapestPrice
                                        ? cx("instructions")
                                        : cx("offscreen")
                                }
                            >
                                <ErrorOutlineOutlinedIcon
                                    className={cx("errorModal-icon")}
                                />
                                1 to 10 characters.
                                <br />
                                Must begin with a letter.
                            </p>
                        </div>

                        <div className={cx("formItem")}>
                            <label className={cx("formLabel")}>Featured</label>
                            <select
                                id="featured"
                                // onChange={handleChange}
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
                            <label className={cx("formLabel")}>
                                Rooms
                                <CheckOutlinedIcon
                                    className={
                                        validSelectedRooms
                                            ? cx("roomValid")
                                            : cx("hide")
                                    }
                                />
                            </label>
                            {loading
                                ? "Loading..."
                                : data &&
                                  data.map((room) => (
                                      <div
                                          className={cx("room")}
                                          key={room._id}
                                      >
                                          <input
                                              type="checkbox"
                                              value={room._id}
                                              onClick={handleSelect}
                                              className={cx("selectRoom-input")}
                                              aria-invalid={
                                                  validSelectedRooms
                                                      ? "false"
                                                      : "true"
                                              }
                                          />

                                          <label
                                              className={cx("selectRoom-label")}
                                          >
                                              {room.title}
                                          </label>
                                      </div>
                                  ))}
                        </div>
                    </form>
                    <button
                        onClick={handleSubmit}
                        className={cx("button")}
                        disabled={
                            !validName ||
                            !validCheapestPrice ||
                            !validTitle ||
                            !validDescription ||
                            !validDistance ||
                            !validCountry ||
                            !validCity ||
                            !validSelectedRooms ||
                            !validImage
                                ? true
                                : false
                        }
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewHotel;
