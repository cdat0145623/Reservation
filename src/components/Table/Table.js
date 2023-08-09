import classnames from "classnames/bind";
import styles from "./Table.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";
const cx = classnames.bind(styles);

function List() {
    const { darkMode } = useContext(DarkModeContext);
    const rows = [
        {
            id: 1143155,
            product: "Acer Nitro 5",
            img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "John Smith",
            date: "1 March",
            amount: 785,
            method: "Cash on Delivery",
            status: "Approved",
        },
        {
            id: 2235235,
            product: "Playstation 5",
            img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Michael Doe",
            date: "1 March",
            amount: 900,
            method: "Online Payment",
            status: "Pending",
        },
        {
            id: 2342353,
            product: "Redragon S101",
            img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "John Smith",
            date: "1 March",
            amount: 35,
            method: "Cash on Delivery",
            status: "Pending",
        },
        {
            id: 2357741,
            product: "Razer Blade 15",
            img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Jane Smith",
            date: "1 March",
            amount: 920,
            method: "Online",
            status: "Approved",
        },
        {
            id: 2342355,
            product: "ASUS ROG Strix",
            img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Harold Carol",
            date: "1 March",
            amount: 2000,
            method: "Online",
            status: "Pending",
        },
    ];
    return (
        <TableContainer
            component={Paper}
            className={
                darkMode ? cx("wrapperTable", "dark") : cx("wrapperTable")
            }
        >
            <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className={cx("tableContainer")}
            >
                <TableHead>
                    <TableRow>
                        <TableCell className={cx("table-cell")}>
                            Tracking ID
                        </TableCell>
                        <TableCell className={cx("table-cell")}>
                            Product
                        </TableCell>
                        <TableCell className={cx("table-cell")}>
                            Customer
                        </TableCell>
                        <TableCell className={cx("table-cell")}>Date</TableCell>
                        <TableCell className={cx("table-cell")}>
                            Amount
                        </TableCell>
                        <TableCell className={cx("table-cell")}>
                            Payment Method
                        </TableCell>
                        <TableCell className={cx("table-cell")}>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={cx("table-column")}>
                                {row.id}
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                <div className={cx("cell-wrapper")}>
                                    <img
                                        src={row.img}
                                        alt=""
                                        className={cx("image")}
                                    />
                                    {row.product}
                                </div>
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                {row.customer}
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                {row.date}
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                {row.amount}
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                {row.method}
                            </TableCell>
                            <TableCell className={cx("table-column")}>
                                <span className={cx("status", `${row.status}`)}>
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default List;
