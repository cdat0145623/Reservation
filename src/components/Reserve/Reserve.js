import classNames from 'classnames/bind';
import styles from './Reserve.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Reserve = ({ setOpen, hotelId, days, options }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data } = useFetch(`/api/hotels/room/${hotelId}`);

    const { dates } = useContext(SearchContext);
    console.log(days);
    const getDatesInrange = (startDate, endDate) => {
        console.log(startDate, endDate);
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const allDates = getDatesInrange(dates[0]?.startDate, dates[0]?.endDate);
    console.log(allDates);

    const isAvailable = (roomNumber) => {
        console.log(roomNumber.unavailableDate);
        const isFound = roomNumber.unavailableDate.some((date) => {
            console.log(allDates.includes(new Date(date).getTime()));
            return allDates.includes(new Date(date).getTime());
        });
        console.log(isFound);
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    };

    // const navigate = useNavigate();
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/api/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    console.log(res.data);
                    return res.data;
                }),
            );
            setOpen(false);
        } catch (error) {}
    };
    return (
        <div className={cx('reserve')}>
            <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faCircleXmark} className={cx('close')} onClick={() => setOpen(false)} />
                <span className={cx('reserve-title')}>Select your room:</span>
                {Array.isArray(data) &&
                    data.map((item) => (
                        <div className={cx('item')} key={item._id}>
                            <div className={cx('item-info')}>
                                <div className={cx('title')}>{item.title}</div>
                                <div className={cx('description')}>{item.description}</div>
                                <div className={cx('max-people')}>
                                    Số lượng khách: <b>{item.maxPeople}</b>
                                </div>
                                <div className={cx('price')}>
                                    VND {item?.price * days * options?.room} cho {days - 1 === 0 ? 1 : days} đêm
                                </div>
                            </div>

                            <div className={cx('select-rooms')}>
                                {item.roomNumbers.map((roomNumber) => (
                                    <div className={cx('room')} key={roomNumber._id}>
                                        <label className={cx('selectRoom-label')}>{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onClick={handleSelect}
                                            disabled={!isAvailable(roomNumber)}
                                            className={cx('selectRoom-input')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                <button onClick={handleClick} className={cx('reserve-btn')}>
                    Đặt ngay
                </button>
            </div>
        </div>
    );
};

export default Reserve;
