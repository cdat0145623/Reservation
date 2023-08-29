import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import classNames from 'classnames/bind';
import styles from './DestinationItem.module.scss';

const cx = classNames.bind(styles);

function DestinationItem({ data, setdestination, setshowresult, setcity }) {
    return (
        <div
            className={cx('wrapper')}
            onClick={() => {
                setdestination(data?.city);
                setcity(data?.value);
                setshowresult(false);
            }}
        >
            <div className={cx('destination')}>
                <FmdGoodOutlinedIcon className={cx('destination-icon')} />
            </div>
            <div className={cx('body')}>
                <h3 className={cx('title')}>{data.city}</h3>
                <span className={cx('sub-title')}>{data.country}</span>
            </div>
        </div>
    );
}

export default DestinationItem;
