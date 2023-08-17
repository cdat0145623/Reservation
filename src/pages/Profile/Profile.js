import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useEffect, useState, useRef } from "react";
import axios from "~/api/axios";
import useFetch from "~/components/hooks/useFetch";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Swal from "sweetalert2";
const cx = classnames.bind(styles);

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;
const NAME_REGEX = /^[a-zA-Z ]{2,16}$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
const ADDRESS_REGEX = /^[A-Za-z][A-Za-z0-9_]{1,100}$/;

function Profile({ setOpen, userId }) {
    const userRef = useRef();
    // const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [username, setUsername] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [address, setAddress] = useState("");
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [validImage, setValidImage] = useState(false);
    const { data, loading } = useFetch(`/api/users/${userId}`);
    // console.log("data ::::;::::", data);

    const publicImage = "http://localhost:3003/images/";

    useEffect(() => {
        userRef?.current?.focus();
        setUsername(data.username);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.country);
    }, [data]);

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
        data.username !== username ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [username]);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
        data.name !== name ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        data.email !== email ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [email]);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
        data.phone !== phone ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [phone]);

    useEffect(() => {
        setValidAddress(ADDRESS_REGEX.test(address));
        data.country !== address ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [address]);

    useEffect(() => {
        console.log(file);
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            try {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dafyuivup/image/upload",
                    data
                );
                const { url } = uploadRes.data;
                const userUpdated = {
                    name,
                    username,
                    email,
                    phone,
                    address,
                    image: url,
                };
                const res = await axios.put(
                    `/api/users/${userId}`,
                    userUpdated,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your profile has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
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
        } else {
            try {
                const userUpdated = {
                    name,
                    username,
                    email,
                    phone,
                    address,
                    image: data.image,
                };
                const res = await axios.put(
                    `/api/users/${userId}`,
                    userUpdated,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your profile has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
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
        }
    };

    const handleImage = (e) => {
        const file = imageRef?.current?.files[0];
        if (file) {
            const typeFile = file?.type?.split("/")[1];
            if (typeFile === "jpeg" || typeFile === "png") {
                setValidImage(true);
            }
        }
    };

    return (
        <div className={cx("modal")}>
            <div className={cx("wrapper")}>
                <header className={cx("header-modal")}>
                    <h1 className={cx("header-title")}>Edit profile</h1>
                    <CloseIcon
                        className={cx("header-icon")}
                        onClick={() => setOpen(false)}
                    />
                </header>
                {loading
                    ? "Loading..."
                    : data && (
                          <div className={cx("modal-body")}>
                              <form className={cx("modal-form")}>
                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Profile photo
                                      </label>
                                      <div className={cx("modalWrapper-image")}>
                                          <img
                                              src={
                                                  file
                                                      ? URL.createObjectURL(
                                                            file
                                                        )
                                                      : data
                                                      ? data?.image
                                                      : publicImage +
                                                        "default.jpeg"
                                              }
                                              alt=""
                                              className={cx("modal-image")}
                                          />
                                          <label
                                              className={cx("modalInner-image")}
                                              htmlFor="fileInput"
                                          >
                                              <BorderColorOutlinedIcon
                                                  className={cx("modal-icon")}
                                              />
                                          </label>
                                          <input
                                              ref={imageRef}
                                              type="file"
                                              id="fileInput"
                                              style={{ display: "none" }}
                                              onChange={(e) =>
                                                  setFile(e.target.files[0])
                                              }
                                              onInput={handleImage}
                                          />
                                      </div>
                                  </div>
                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Username:
                                      </label>
                                      <input
                                          className={cx("modal-input")}
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
                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Name:
                                      </label>
                                      <input
                                          className={cx("modal-input")}
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
                                              validName
                                                  ? cx("valid")
                                                  : cx("hide")
                                          }
                                      />
                                      <CloseOutlinedIcon
                                          className={
                                              validName || !name
                                                  ? cx("hide")
                                                  : cx("invalid")
                                          }
                                      />
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
                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Email:
                                      </label>
                                      <input
                                          className={cx("modal-input")}
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
                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Phone:
                                      </label>
                                      <input
                                          className={cx("modal-input")}
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

                                  <div className={cx("modal-item")}>
                                      <label className={cx("modal-label")}>
                                          Address:
                                      </label>
                                      <input
                                          className={cx("modal-input")}
                                          type="text"
                                          id="address"
                                          autoComplete="off"
                                          onChange={(e) =>
                                              setAddress(e.target.value)
                                          }
                                          value={address}
                                          required
                                          aria-invalid={
                                              validAddress ? "false" : "true"
                                          }
                                          aria-describedby="uidnote"
                                          onFocus={() => setAddressFocus(true)}
                                          onBlur={() => setAddressFocus(false)}
                                      />
                                      <CheckOutlinedIcon
                                          className={
                                              validAddress
                                                  ? cx("valid")
                                                  : cx("hide")
                                          }
                                      />
                                      <CloseOutlinedIcon
                                          className={
                                              validAddress || !address
                                                  ? cx("hide")
                                                  : cx("invalid")
                                          }
                                      />
                                      <p
                                          id="uidnote"
                                          className={
                                              addressFocus &&
                                              address &&
                                              !validAddress
                                                  ? cx("instructions")
                                                  : cx("offscreen")
                                          }
                                      >
                                          <ErrorOutlineOutlinedIcon
                                              className={cx("errorModal-icon")}
                                          />
                                          Allow 100 character
                                          <br />
                                          Must begin with a letter.
                                          <br />
                                          Letters, numbers, underscores, hyphens
                                          allowed.
                                      </p>
                                  </div>
                              </form>
                          </div>
                      )}
                <footer className={cx("modal-footer")}>
                    <button
                        className={cx("modal-button")}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={cx("modal-button", "primary")}
                        disabled={
                            !validName ||
                            !validUserName ||
                            !validEmail ||
                            !validPhone ||
                            !validAddress ||
                            !validImage
                                ? true
                                : false
                        }
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Profile;
