import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import {
    AirpostTaxiIcon,
    AttractionIcon,
    CalendarIcon,
    CarRentalIcon,
    FlightIcon,
    HotelIcon,
    PersonIcon,
    StayIcon,
} from '~/components/Icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { format, addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '~/components/context/SearchContext';

const cx = classNames.bind(styles);

function Header({ type }) {
    const [destination, setDestination] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection',
        },
    ]);
    console.log(dates);
    const [options, setOptions] = useState({
        adult: 2,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();

    const [openOptions, setOpenOptions] = useState(false);
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    const { dispatch } = useContext(SearchContext);
    const handleSearch = () => {
        dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
        navigate('/hotels', { state: { destination, dates, options } });
    };
    return (
        <div className={cx('header')}>
            <div className={type === 'list' ? cx('wrapper', 'listMode') : cx('wrapper')}>
                <div className={cx('list')}>
                    <div className={cx('list-item', 'active')}>
                        <StayIcon />
                        <span>Stay</span>
                    </div>

                    <div className={cx('list-item')}>
                        <FlightIcon />
                        <span>Flight</span>
                    </div>
                    <div className={cx('list-item')}>
                        <HotelIcon />
                        <span>Flight + Hotel</span>
                    </div>
                    <div className={cx('list-item')}>
                        <CarRentalIcon />
                        <span>Car Rentala</span>
                    </div>
                    <div className={cx('list-item')}>
                        <AttractionIcon />
                        <span>Attractions</span>
                    </div>
                    <div className={cx('list-item')}>
                        <AirpostTaxiIcon />
                        <span>Airport Taxi</span>
                    </div>
                </div>
                {type !== 'list' && (
                    <>
                        <h1 className={cx('title')}>Find your next stay</h1>
                        <p className={cx('description')}>Search deals on hotels, homes, and much more...</p>
                        <div className={cx('search')}>
                            <div className={cx('search-item', 'active')}>
                                <StayIcon />
                                <input
                                    placeholder="Where are you going?"
                                    className={cx('search-input')}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className={cx('search-item')}>
                                <CalendarIcon />
                                <span onClick={() => setOpenDate(!openDate)} className={cx('search-text')}>
                                    {dates[0]?.startDate && dates[0]?.endDate
                                        ? `${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                                              dates[0].endDate,
                                              'dd/MM/yyyy',
                                          )} `
                                        : 'Ngày nhận phòng - Ngày trả phòng'}
                                </span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        minDate={addDays(new Date(), -1)}
                                        onChange={(item) => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className={cx('date')}
                                    />
                                )}
                            </div>
                            <div className={cx('search-item')}>
                                <PersonIcon />
                                <span
                                    className={cx('search-text')}
                                    onClick={() => setOpenOptions(!openOptions)}
                                >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                                <FontAwesomeIcon icon={faAngleDown} className={cx('search-item-icon')} />

                                {openOptions && (
                                    <div className={cx('options')}>
                                        <div className={cx('option-item')}>
                                            <span className={cx('option-text')}>Adults</span>

                                            <div className={cx('option-counter')}>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('adult', 'd')}
                                                    disabled={options.adult <= 1}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className={cx('counter-number')}>{options.adult}</span>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('adult', 'i')}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={cx('option-item')}>
                                            <span className={cx('option-text')}>Children</span>
                                            <div className={cx('option-counter')}>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('children', 'd')}
                                                    disabled={options.children <= 0}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className={cx('counter-number')}>{options.children}</span>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('children', 'i')}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={cx('option-item')}>
                                            <span className={cx('option-text')}>Room</span>

                                            <div className={cx('option-counter')}>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('room', 'd')}
                                                    disabled={options.room <= 1}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className={cx('counter-number')}>{options.room}</span>
                                                <button
                                                    className={cx('counter-btn')}
                                                    onClick={() => handleOption('room', 'i')}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className={cx('option-btn')}
                                            onClick={() => setOpenOptions(!openOptions)}
                                        >
                                            Done
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={cx('search-item')}>
                                <button className={cx('search-btn')} onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
