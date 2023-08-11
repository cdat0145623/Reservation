import classnames from "classnames/bind";
import styles from "./NewUser.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "~/formsource";
const cx = classnames.bind(styles);

function NewUser() {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    const publicImage = "http://localhost:3003/images/";

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    console.log(info);

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
                ...info,
                image: url,
            };

            const res = await axios.post("/api/users/", newUser);
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
                                    id="file"
                                    type="file"
                                    className={cx("formInput")}
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            {userInputs.map((input) => (
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

export default NewUser;
