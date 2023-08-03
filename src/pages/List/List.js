import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '~/components/SearchItem/SearchItem';

const cx = classNames.bind(styles);
function List() {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);

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
                                {`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(
                                    date[0].endDate,
                                    'dd/MM/yyyy',
                                )} `}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDate([item.selection])}
                                    minDate={new Date()}
                                    ranges={date}
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
                                    <input type="number" className={cx('listOptions-input')} />
                                </div>
                                <div className={cx('listOptions-item')}>
                                    <span>
                                        Max price<small>&nbsp;per night</small>
                                    </span>
                                    <br />
                                    <input type="number" className={cx('listOptions-input')} />
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
                        <button className={cx('search-btn')}>Search</button>
                    </div>

                    {/* Search item */}
                    <div className={cx('result')}>
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
