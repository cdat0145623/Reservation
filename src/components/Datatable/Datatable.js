import classnames from "classnames/bind";
import styles from "./Datatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "~/datatablesource";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const cx = classnames.bind(styles);

function Datatable() {
    const { darkMode } = useContext(DarkModeContext);
    const actionColumns = {
        field: "action",
        headerName: "Action",
        width: 230,
        renderCell: () => {
            return (
                <div className={cx("cellAction")}>
                    <Link to="/users/123">
                        <div className={cx("viewBotton")}>View</div>
                    </Link>
                    <div className={cx("deleteBotton")}>Delete</div>
                </div>
            );
        },
    };
    return (
        <div className={darkMode ? cx("wrapper", "dark") : cx("wrapper")}>
            <div className={cx("title")}>
                Add New User
                <Link to="/users/new" className={cx("link")}>
                    Add New
                </Link>
            </div>
            <DataGrid
                className={cx("container")}
                rows={userRows}
                columns={userColumns.concat(actionColumns)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[4, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default Datatable;
