import { StayIcon } from '~/components/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { wrapper as PropperWrapper } from '~/components/Propper';
import DestinationItem from '~/components/DestinationItem/DestinationItem';
import { citys } from '~/citys';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Search({ destination, setdestination, setcity, type, inputRef }) {
    const [showResult, setShowResult] = useState(false);

    const search = (data) => {
        return data.filter((item) => item.city.toLowerCase().includes(destination));
    };

    const handleChange = (e) => {
        const destinationValue = e.target.value;
        if (!destinationValue.startsWith(' ')) {
            setdestination(destinationValue);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            placement="bottom"
            offset={type === 'list' ? [0, 5] : [15, 12]}
            visible={showResult && search(citys).length > 0}
            content="Tìm kiếm"
            render={(attrs) => (
                <div
                    className={type === 'list' ? cx('search-result', 'list-mode') : cx('search-result')}
                    tabIndex="-1"
                    {...attrs}
                >
                    <PropperWrapper>
                        {!destination && <h4 className={cx('search-title')}>Điểm đến được ưa thích gần đây</h4>}
                        {search(citys)
                            ?.slice(0, 5)
                            ?.map((result, index) => (
                                <DestinationItem
                                    key={index}
                                    data={result}
                                    setdestination={setdestination}
                                    setshowresult={setShowResult}
                                    setcity={setcity}
                                />
                            ))}
                    </PropperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            {type === 'list' ? (
                <div className={cx('listSearch-item')}>
                    <label className={cx('search-label')}>Destination</label>
                    <input
                        ref={inputRef}
                        className={cx('search-input')}
                        type="text"
                        value={destination}
                        required
                        onChange={(e) => setdestination(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                </div>
            ) : (
                <div className={cx('search')}>
                    <StayIcon className={cx('search-icon')} />
                    <input
                        // ref={inputRef}
                        value={destination}
                        placeholder="Bạn muốn đến đâu?"
                        className={cx('search-input')}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {destination && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setdestination('');
                            }}
                        >
                            <CloseOutlinedIcon className={cx('close-icon')} />
                        </button>
                    )}
                </div>
            )}
        </HeadlessTippy>
    );
}

export default Search;
