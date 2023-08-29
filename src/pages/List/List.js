import styles from './List.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, memo, useContext, useRef } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '~/components/SearchItem/SearchItem';
import useFetch from '~/components/hooks/useFetch';
import Search from '~/components/layout/components/Search/Search';
import { SearchContext } from '~/components/context/SearchContext';

const cx = classNames.bind(styles);
function List() {
    const location = useLocation();
    const [city, setCity] = useState(location?.state?.city);
    const [destination, setDestination] = useState(location?.state?.destination);
    const [dates, setDates] = useState(location?.state?.dates);
    // eslint-disable-next-line
    const [options, setOptions] = useState(location?.state?.options);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const { state, dispatch } = useContext(SearchContext);
    const inputRef = useRef();
    const navigate = useNavigate();

    const { data, loading, reFetch } = useFetch(`/api/hotels?city=${city}&min=${min || 100000}&max=${max || 2000000}`);
    // console.log('location?.state::::', location?.state);
    console.log('state:::::::', state);
    const handleClick = (e) => {
        e.preventDefault();
        if (destination.length === 0) {
            inputRef.current.focus();
        } else if (!dates[0]?.startDate || !dates[0]?.endDate) {
            setOpenDate(true);
        } else {
            reFetch();
            dispatch({ type: 'NEW_SEARCH', payload: { city, destination, dates, options } });
            navigate('/hotels', { state: { city, destination, dates, options } });
        }
    };
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('search')}>
                    <h1 className={cx('search-title')}>Tìm kiếm</h1>
                    <div>
                        <Search
                            inputRef={inputRef}
                            type="list"
                            destination={destination}
                            setdestination={setDestination}
                            setcity={setCity}
                        />
                    </div>

                    <div className={cx('listSearch-item')}>
                        <label className={cx('search-label')}>Ngày nhận phòng</label>
                        <span onClick={() => setOpenDate(!openDate)}>
                            {dates[0].startDate !== null && dates[0].endDate !== null
                                ? `${format(dates[0]?.startDate, 'dd/MM/yyyy')} to ${format(
                                      dates[0]?.endDate,
                                      'dd/MM/yyyy',
                                  )} `
                                : 'Ngày nhận phòng - Ngày trả phòng'}
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
                                    Giá tiền từ<small>&nbsp;một đêm</small>
                                </span>
                                <br />
                                <input
                                    type="number"
                                    min={1}
                                    className={cx('listOptions-input')}
                                    onChange={(e) => setMin(e.target.value)}
                                />
                            </div>
                            <div className={cx('listOptions-item')}>
                                <span>
                                    Giá tiền đến<small>&nbsp;một đêm</small>
                                </span>
                                <br />
                                <input
                                    type="number"
                                    min={1}
                                    className={cx('listOptions-input')}
                                    onChange={(e) => setMax(e.target.value)}
                                />
                            </div>
                            <div className={cx('listOptions-item')}>
                                <span>Người lớn</span>
                                <input
                                    type="number"
                                    min={1}
                                    className={cx('listOptions-input')}
                                    placeholder={options?.adult}
                                />
                            </div>
                            <div className={cx('listOptions-item')}>
                                <span>Trẻ em</span>
                                <input
                                    type="number"
                                    className={cx('listOptions-input')}
                                    placeholder={options?.children}
                                    min={0}
                                />
                            </div>
                            <div className={cx('listOptions-item')}>
                                <span>Phòng</span>
                                <input
                                    type="number"
                                    className={cx('listOptions-input')}
                                    placeholder={options?.room}
                                    min={1}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={handleClick} className={cx('search-btn')}>
                        Tìm kiếm
                    </button>
                </div>

                {/* Search item */}
                <div className={cx('result')}>
                    {loading ? (
                        'loading'
                    ) : (
                        <>
                            {Array.isArray(data) &&
                                data.map((item) => (
                                    <SearchItem
                                        item={item}
                                        key={item._id}
                                        destination={destination}
                                        city={city}
                                        dates={dates}
                                        options={options}
                                        setOpenDate={setOpenDate}
                                    />
                                ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(List);
