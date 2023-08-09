import classnames from "classnames/bind";
import styles from "./New.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
const cx = classnames.bind(styles);

function New({ inputs, title }) {
    const [file, setFile] = useState("");

    console.log(file);
    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("top")}>
                    <h1 className={cx("title")}>{title}</h1>
                </div>
                <div className={cx("bottom")}>
                    <div className={cx("left")}>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                            {inputs.map((input) => (
                                <div className={cx("formItem")} key={input.id}>
                                    <label className={cx("formLabel")}>
                                        {input.label}
                                    </label>
                                    <input
                                        type={input.type}
                                        className={cx("formInput")}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}

                            <button className={cx("button")}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;
