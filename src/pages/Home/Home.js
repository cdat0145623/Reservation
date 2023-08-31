import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import Widget from "~/components/Widget/Widget";
import Featured from "~/components/Featured/Featured";
import Chart from "~/components/Chart/Chart";
import Table from "~/components/Table/Table";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "~/components/context/AuthContext";
// import jwt_decode from "jwt-decode";
// import useFetch from "~/components/hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "~/api/axios";

const cx = classnames.bind(styles);
function Home() {
    const [lengths, setLengths] = useState([]);
    useEffect(() => {
        const lengthOf = async () => {
            try {
                const lengthUsers = await axios.get("/api/users", {
                    withCredentials: true,
                });
                const lengthHotels = await axios.get("/api/hotels", {
                    withCredentials: true,
                });
                const lengthRooms = await axios.get("/api/rooms", {
                    withCredentials: true,
                });

                setLengths([
                    lengthUsers?.data?.length,
                    lengthHotels?.data?.length,
                    lengthRooms?.data?.length,
                ]);
            } catch (error) {
                console.log(error);
            }
        };
        lengthOf();
    }, []);

    return (
        <div className={cx("wrapperHome")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <div className={cx("widgets")}>
                    <Widget type="user" length={lengths ? lengths[0] : null} />
                    <Widget type="hotel" length={lengths ? lengths[1] : null} />
                    <Widget type="room" length={lengths ? lengths[2] : null} />
                    <Widget type="balance" />
                </div>
                <div className={cx("charts")}>
                    <Featured />
                    <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" />
                </div>
                <div className={cx("list-container")}>
                    <div className={cx("list-title")}>Lastest transaction</div>
                    <Table />
                </div>
            </div>
        </div>
    );
}

export default Home;
