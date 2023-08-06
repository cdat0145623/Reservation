import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '~/components/SearchItem/SearchItem';
import useFetch from '~/components/hooks/useFetch';

const cx = classNames.bind(styles);
function List() {
    const location = useLocation();
    // eslint-disable-next-line
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    // eslint-disable-next-line
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, reFetch } = useFetch(`/api/hotels?city=${destination}&min=${min || 1}&max=${max || 999}`);

    const handleClick = () => {
        reFetch();
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('search')}>
                        <h1 className={cx('search-title')}>Search</h1>
                        <div className={cx('listSearch-item')}>
                            <label className={cx('search-label')}>Destination</label>
                            <input className={cx('search-input')} type="text" placeholder={destination} />
                        </div>
                        <div className={cx('listSearch-item')}>
                            <label className={cx('search-label')}>Check-in date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                                    dates[0].endDate,
                                    'dd/MM/yyyy',
                                )} `}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDates([item.selection])}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>
                        <div className={cx('listSearch-item')}>
                            <label className={cx('search-label')}>Options</label>
                            <div className={cx('listSearch-Options')}>
                                <div className={cx('listOptions-item')}>
                                    <span>
                                        Min price<small>&nbsp;per night</small>
                                    </span>
                                    <br />
                                    <input
                                        type="number"
                                        className={cx('listOptions-input')}
                                        onChange={(e) => setMin(e.target.value)}
                                    />
                                </div>
                                <div className={cx('listOptions-item')}>
                                    <span>
                                        Max price<small>&nbsp;per night</small>
                                    </span>
                                    <br />
                                    <input
                                        type="number"
                                        className={cx('listOptions-input')}
                                        onChange={(e) => setMax(e.target.value)}
                                    />
                                </div>
                                <div className={cx('listOptions-item')}>
                                    <span>Adults</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className={cx('listOptions-input')}
                                        placeholder={options.adult}
                                    />
                                </div>
                                <div className={cx('listOptions-item')}>
                                    <span>Children</span>
                                    <input
                                        type="number"
                                        className={cx('listOptions-input')}
                                        placeholder={options.children}
                                        min={0}
                                    />
                                </div>
                                <div className={cx('listOptions-item')}>
                                    <span>Room</span>
                                    <input
                                        type="number"
                                        className={cx('listOptions-input')}
                                        placeholder={options.room}
                                        min={1}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick} className={cx('search-btn')}>
                            Search
                        </button>
                    </div>

                    {/* Search item */}
                    <div className={cx('result')}>
                        {loading ? (
                            'loading'
                        ) : (
                            <>{Array.isArray(data) && data.map((item) => <SearchItem item={item} key={item._id} />)}</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
