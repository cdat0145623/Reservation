import classnames from "classnames/bind";
import styles from "./Datatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useContext, useLayoutEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import useFetch from "../hooks/useFetch";
import axios from "~/api/axios";

const cx = classnames.bind(styles);

function Datatable({ columns, title }) {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const { darkMode } = useContext(DarkModeContext);
    const { data, loading } = useFetch(`/api/${path}`);
    const [list, setList] = useState();

    useLayoutEffect(() => {
        setList(data);
    }, [data]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/${path}/${id}`, { withCredentials: true });

            setList(list.filter((item) => item._id !== id));
            console.log(list);
        } catch (error) {
            console.log(error);
        }
    };

    const actionColumns = {
        field: "action",
        headerName: "Action",
        width: 230,
        renderCell: (params) => {
            return (
                <div className={cx("cellAction")}>
                    <Link to="/users/123">
                        <div className={cx("viewBotton")}>View</div>
                    </Link>
                    <div
                        className={cx("deleteBotton")}
                        onClick={() => handleDelete(params.row._id)}
                    >
                        Delete
                    </div>
                </div>
            );
        },
    };
    return (
        <div className={darkMode ? cx("wrapper", "dark") : cx("wrapper")}>
            <div className={cx("title")}>
                {title}
                <Link to={`/${path}/new`} className={cx("link")}>
                    Add New
                </Link>
            </div>
            {loading ? (
                "Loading..."
            ) : (
                <DataGrid
                    className={cx("container")}
                    rows={list ? list : data}
                    columns={columns.concat(actionColumns)}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            )}
        </div>
    );
}

export default Datatable;
