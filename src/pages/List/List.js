// import classnames from "classnames/bind";
// import styles from "./List.module.scss";
import Datatable from "~/components/Datatable/Datatable";

// const cx = classnames.bind(styles);

function List({ columns, title }) {
    return <Datatable columns={columns} title={title} />;
}

export default List;
