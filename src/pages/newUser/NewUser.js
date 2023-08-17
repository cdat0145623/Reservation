import classnames from "classnames/bind";
import styles from "./NewUser.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "~/api/axios";
import Swal from "sweetalert2";
const cx = classnames.bind(styles);

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;
const NAME_REGEX = /^[a-zA-Z ]{2,16}$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,20}$/;
const COUNTRY_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;
const CITY_REGEX = /^[a-zA-Z ]{2,16}$/;

function NewUser() {
    const userRef = useRef();
    // const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [country, setCountry] = useState("");
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);

    const [city, setCity] = useState("");
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [validImage, setValidImage] = useState(false);

    const publicImage = "http://localhost:3003/images/";

    const handleImage = (e) => {
        const file = imageRef?.current?.files[0];
        if (file) {
            const typeFile = file?.type?.split("/")[1];

            if (typeFile === "jpeg" || typeFile === "png") {
                setValidImage(true);
            }
        }
    };

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
        // eslint-disable-next-line
    }, [username]);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
        // eslint-disable-next-line
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        // eslint-disable-next-line
    }, [email]);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
        // eslint-disable-next-line
    }, [phone]);

    useEffect(() => {
        setValidCountry(COUNTRY_REGEX.test(country));
        // eslint-disable-next-line
    }, [country]);

    useEffect(() => {
        setValidCity(CITY_REGEX.test(city));
        // eslint-disable-next-line
    }, [city]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        // eslint-disable-next-line
    }, [password]);

    useEffect(() => {
        console.log(file);
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dafyuivup/image/upload",
                data
            );
            const { url } = uploadRes.data;

            const newUser = {
                name,
                username,
                password,
                email,
                phone,
                country,
                city,
                image: url,
            };

            const res = await axios.post("/api/users/", newUser, {
                withCredentials: true,
            });
            console.log(res.data);
            if (res.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "New user has been created",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUsername("");
                setName("");
                setPassword("");
                setEmail("");
                setPhone("");
                setCountry("");
                setCity("");
                setFile("");
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
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("top")}>
                    <h1 className={cx("title")}>Add new User</h1>
                </div>
                <div className={cx("bottom")}>
                    <div className={cx("left")}>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
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
                                    ref={imageRef}
                                    id="file"
                                    type="file"
                                    className={cx("formInput")}
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                    onInput={handleImage}
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
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        required
                                        aria-invalid={
                                            validName ? "false" : "true"
                                        }
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
                                <label className={cx("formLabel")}>
                                    Username:
                                </label>
                                <div className={cx("wrapperInput")}>
                                    <input
                                        className={cx("formInput")}
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        value={username}
                                        required
                                        aria-invalid={
                                            validUserName ? "false" : "true"
                                        }
                                        aria-describedby="uidnote"
                                        onFocus={() => setUsernameFocus(true)}
                                        onBlur={() => setUsernameFocus(false)}
                                    />
                                    <CheckOutlinedIcon
                                        className={
                                            validUserName
                                                ? cx("valid")
                                                : cx("hide")
                                        }
                                    />
                                    <CloseOutlinedIcon
                                        className={
                                            validUserName || !username
                                                ? cx("hide")
                                                : cx("invalid")
                                        }
                                    />
                                </div>
                                <p
                                    id="uidnote"
                                    className={
                                        usernameFocus &&
                                        username &&
                                        !validUserName
                                            ? cx("instructions")
                                            : cx("offscreen")
                                    }
                                >
                                    <ErrorOutlineOutlinedIcon
                                        className={cx("errorModal-icon")}
                                    />
                                    4 to 16 characters.
                                    <br />
                                    Must begin with a letter.
                                    <br />
                                    Letters, numbers, underscores, hyphens
                                    allowed.
                                </p>
                            </div>

                            <div className={cx("formItem")}>
                                <label className={cx("formLabel")}>
                                    Password:
                                </label>
                                <div className={cx("wrapperInput")}>
                                    <input
                                        className={cx("formInput")}
                                        type="password"
                                        id="password"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                        required
                                        aria-invalid={
                                            validPassword ? "false" : "true"
                                        }
                                        aria-describedby="uidnote"
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <CheckOutlinedIcon
                                        className={
                                            validPassword
                                                ? cx("valid")
                                                : cx("hide")
                                        }
                                    />
                                    <CloseOutlinedIcon
                                        className={
                                            validPassword || !password
                                                ? cx("hide")
                                                : cx("invalid")
                                        }
                                    />
                                </div>
                                <p
                                    id="uidnote"
                                    className={
                                        passwordFocus &&
                                        password &&
                                        !validPassword
                                            ? cx("instructions")
                                            : cx("offscreen")
                                    }
                                >
                                    <ErrorOutlineOutlinedIcon
                                        className={cx("errorModal-icon")}
                                    />
                                    4 to 16 characters.
                                    <br />
                                    Must begin with a letter.
                                    <br />
                                    Letters, numbers, underscores, hyphens
                                    allowed.
                                </p>
                            </div>

                            <div className={cx("formItem")}>
                                <label className={cx("formLabel")}>
                                    Email:
                                </label>
                                <div className={cx("wrapperInput")}>
                                    <input
                                        className={cx("formInput")}
                                        type="email"
                                        id="email"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        required
                                        aria-invalid={
                                            validEmail ? "false" : "true"
                                        }
                                        aria-describedby="uidnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <CheckOutlinedIcon
                                        className={
                                            validEmail
                                                ? cx("valid")
                                                : cx("hide")
                                        }
                                    />
                                    <CloseOutlinedIcon
                                        className={
                                            validEmail || !email
                                                ? cx("hide")
                                                : cx("invalid")
                                        }
                                    />
                                </div>
                                <p
                                    id="uidnote"
                                    className={
                                        emailFocus && email && !validEmail
                                            ? cx("instructions")
                                            : cx("offscreen")
                                    }
                                >
                                    <ErrorOutlineOutlinedIcon
                                        className={cx("errorModal-icon")}
                                    />
                                    Must begin with a letter.
                                    <br />
                                    It should have to @ character
                                </p>
                            </div>
                            <div className={cx("formItem")}>
                                <label className={cx("formLabel")}>
                                    Phone:
                                </label>
                                <div className={cx("wrapperInput")}>
                                    <input
                                        className={cx("formInput")}
                                        type="text"
                                        id="phone"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        value={phone}
                                        required
                                        aria-invalid={
                                            validPhone ? "false" : "true"
                                        }
                                        aria-describedby="uidnote"
                                        onFocus={() => setPhoneFocus(true)}
                                        onBlur={() => setPhoneFocus(false)}
                                    />
                                    <CheckOutlinedIcon
                                        className={
                                            validPhone
                                                ? cx("valid")
                                                : cx("hide")
                                        }
                                    />
                                    <CloseOutlinedIcon
                                        className={
                                            validPhone || !phone
                                                ? cx("hide")
                                                : cx("invalid")
                                        }
                                    />
                                </div>
                                <p
                                    id="uidnote"
                                    className={
                                        phoneFocus && phone && !validPhone
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
                                    Country:
                                </label>
                                <div className={cx("wrapperInput")}>
                                    <input
                                        className={cx("formInput")}
                                        type="text"
                                        id="country"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setCountry(e.target.value)
                                        }
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
                                            validCountry
                                                ? cx("valid")
                                                : cx("hide")
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
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        value={city}
                                        required
                                        aria-invalid={
                                            validCity ? "false" : "true"
                                        }
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
                            <button
                                onClick={handleSubmit}
                                className={cx("button")}
                                disabled={
                                    !validName ||
                                    !validUserName ||
                                    !validPassword ||
                                    !validEmail ||
                                    !validPhone ||
                                    !validCountry ||
                                    !validCity ||
                                    !validImage
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
        </div>
    );
}

export default NewUser;
