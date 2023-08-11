import classnames from "classnames/bind";
import styles from "./List.module.scss";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navbar from "~/components/Navbar/Navbar";
import Datatable from "~/components/Datatable/Datatable";

const cx = classnames.bind(styles);

function List({ columns, title }) {
    return (
        <div className={cx("wrapper")}>
            <Sidebar />
            <div className={cx("container")}>
                <Navbar />
                <Datatable columns={columns} title={title} />
            </div>
        </div>
    );
}

export default List;
