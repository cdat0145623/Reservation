import classNames from 'classnames/bind';
import styles from './Personal.module.scss';
import { useContext, useEffect, useState, useRef } from 'react';
import { NavbarContext } from '~/components/context/NavbarContext';
import { Navigate, useLocation } from 'react-router-dom';
import useFetch from '~/components/hooks/useFetch';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ModalImage from './ModalImage/ModalImage';
import axios from '~/axios/axios';

const cx = classNames.bind(styles);

const NAME_REGEX = /^[a-zA-Z ]{4,30}$/;
const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
// const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;

function Personal() {
    const currentImage = useRef();
    const { dispatchNav } = useContext(NavbarContext);
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const publicImage = 'http://localhost:3003/images/';
    const { data, loading } = useFetch(`api/users/${id}`);
    const [newData, setNewData] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const errRef = useRef();
    const [errorMsg, setErrorMsg] = useState(false);

    // console.log(data);

    const [username, setUsername] = useState('');
    const [changeUsername, setChangeUsername] = useState(false);
    const [validUserName, setValidUserName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [name, setName] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [changePhone, setChangePhone] = useState(false);

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);
    const [changeCity, setChangeCity] = useState(false);
    const cityRef = useRef();

    const [nameCity, setNameCity] = useState('');

    const handleOpenModal = () => {
        if (data) {
            setOpenModal(true);
        } else {
            <Navigate to="/login" />;
        }
    };

    useEffect(() => {
        dispatchNav({ type: 'IS_USER', payload: { navbar: 'user' } });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // console.log(data.phone);
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setCity(data?.city);
    }, [data]);

    useEffect(() => {
        data?.name === name ? setValidName(false) : setValidName(NAME_REGEX.test(name));
        // eslint-disable-next-line
    }, [name]);

    useEffect(() => {
        setErrorMsg('');
        data.username === username ? setValidUserName(false) : setValidUserName(USER_REGEX.test(username));
        // eslint-disable-next-line
    }, [username]);

    useEffect(() => {
        setErrorMsg('');
        data.email === email ? setValidEmail(false) : setValidEmail(EMAIL_REGEX.test(email));
        // eslint-disable-next-line
    }, [email]);

    useEffect(() => {
        data.phone === phone ? setValidPhone(false) : setValidPhone(PHONE_REGEX.test(phone));
        // eslint-disable-next-line
    }, [phone]);

    const getNameCity = async (city) => {
        const selectOptions = document.getElementsByClassName(`${cx('form-selecNone')}`);
        const text = await Promise.all(
            Array.from(selectOptions, (option) =>
                Array.from(option).find((e) => {
                    return e.value === city;
                }),
            ),
        ).then((result) => {
            return result[0].innerText;
        });
        return text;
    };

    useEffect(() => {
        if (city?.length > 0) {
            setCity(city);
            console.log('Set city::::', city);
            if (city) {
                const rs = async () => {
                    const rName = await getNameCity(city);
                    setNameCity(rName);
                };
                rs();
            }
        }

        city?.length > 0 ? setValidCity(true) : setValidCity(false);
    }, [city]);

    const handleSubmit = async () => {
        try {
            const response = await axios.put(
                `/api/users/${id}`,
                { name, username, email, phone, city },
                { withCredentials: true },
            );
            setNewData(response.data);
            console.log('New data::::', newData);
            if (changeName) {
                setName(response?.data?.name);
                setChangeName(false);
            }
            if (changeUsername) {
                setUsername(response?.data?.username);
                setChangeUsername(false);
            }
            if (changeEmail) {
                setEmail(response?.data?.email);
                setChangeEmail(false);
            }
            if (changePhone) {
                setPhone(response?.data?.phone);
                setChangePhone(false);
            }
            if (changeCity) {
                setCity(response?.data?.city);
                setChangeCity(false);
            }
        } catch (error) {
            console.error(error);
            if (error?.response?.status === 400) {
                setErrorMsg(error?.response?.data?.message);
            }
        }
    };

    const [file, setFile] = useState('');
    // const handleImage = (e) => {
    //     setFile(setFile(e.target.files[0]));
    // };

    return (
        <div className={cx('personal')}>
            <div className={cx('container')}>
                {loading ? (
                    'Loading...'
                ) : data ? (
                    <>
                        <div className={cx('content')}>
                            <div className={cx('wrapper-content')}>
                                <h1 className={cx('content-title')}>Thông tin cá nhân</h1>
                                <span className={cx('content-subtitle')}>
                                    Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.
                                </span>
                            </div>
                            <button className={cx('button-image')}>
                                <div className={cx('wrapper-image')} onClick={handleOpenModal}>
                                    <img
                                        // onChange={handleImage}
                                        ref={currentImage}
                                        src={
                                            newData?.image
                                                ? newData?.image
                                                : data?.image
                                                ? data?.image
                                                : publicImage + 'default.jpeg'
                                        }
                                        className={cx('image')}
                                        alt=""
                                    />
                                </div>
                            </button>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('body-inner')}>
                                <div className={cx('form-item')}>
                                    <label htmlFor="name" className={cx('form-label')}>
                                        Tên
                                    </label>
                                    {changeName ? (
                                        <>
                                            <div className={cx('wrapper-input')}>
                                                <input
                                                    id="name"
                                                    className={cx('form-input')}
                                                    type="text"
                                                    value={name}
                                                    // autoFocus
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    autoFocus
                                                    aria-invalid={validName ? 'false' : 'true'}
                                                    aria-describedby="uidnote"
                                                    onFocus={() => setNameFocus(true)}
                                                    onBlur={() => setNameFocus(false)}
                                                />
                                                <CheckOutlinedIcon className={validName ? cx('valid') : cx('hide')} />
                                                <p
                                                    id="uidnote"
                                                    className={
                                                        nameFocus && name && !validName
                                                            ? cx('instructions')
                                                            : cx('offscreen')
                                                    }
                                                >
                                                    <ErrorOutlineOutlinedIcon className={cx('error-icon')} />
                                                    Tên bao gồm từ 4 đến 30 ký tự, bắt đầu bằng chữ cái, số và gạch dưới
                                                    được chấp nhận
                                                </p>
                                            </div>

                                            <div className={cx('wrapper-button')}>
                                                <button
                                                    className={cx('close')}
                                                    onClick={() => {
                                                        setName(newData?.name ? newData?.name : data?.name);
                                                        setChangeName(false);
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={cx('save')}
                                                    disabled={!validName ? true : false}
                                                    onClick={handleSubmit}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={cx('form-text')}>
                                                {newData?.name ? newData?.name : name}
                                            </span>
                                            <button
                                                className={cx('open')}
                                                disabled={
                                                    changeUsername || changeEmail || changePhone || changeCity
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <span className={cx('open-text')} onClick={() => setChangeName(true)}>
                                                    Chỉnh sửa
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className={cx('form-item')}>
                                    <label htmlFor="username" className={cx('form-label')}>
                                        Tên đăng nhập
                                    </label>

                                    {changeUsername ? (
                                        <>
                                            <div className={cx('wrapper-input')}>
                                                <input
                                                    id="username"
                                                    className={cx('form-input')}
                                                    type="text"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    autoFocus
                                                    value={username}
                                                    required
                                                    aria-invalid={validUserName ? 'false' : 'true'}
                                                    aria-describedby="uidnote"
                                                    onFocus={() => setUsernameFocus(true)}
                                                    onBlur={() => {
                                                        setUsernameFocus(false);
                                                        errorMsg && setErrorMsg('');
                                                    }}
                                                />
                                                <span
                                                    ref={errRef}
                                                    className={errorMsg ? cx('error-message') : cx('offscreen')}
                                                    aria-live="assertive"
                                                >
                                                    <ErrorOutlineOutlinedIcon
                                                        className={errorMsg ? cx('iconExist-error') : cx('offscreen')}
                                                    />
                                                    {errorMsg}
                                                </span>
                                                <CheckOutlinedIcon
                                                    className={validUserName ? cx('valid') : cx('hide')}
                                                />
                                                <p
                                                    id="uidnote"
                                                    className={
                                                        usernameFocus && username && !validUserName
                                                            ? cx('instructions')
                                                            : cx('offscreen')
                                                    }
                                                >
                                                    <ErrorOutlineOutlinedIcon className={cx('error-icon')} />
                                                    Tên đăng nhập bao gồm từ 4 đến 20 ký tự, bắt đầu bằng chữ cái, số và
                                                    gạch dưới được chấp nhận
                                                </p>
                                            </div>
                                            <div className={cx('wrapper-button')}>
                                                <button
                                                    className={cx('close')}
                                                    onClick={() => {
                                                        setChangeUsername(false);
                                                        setUsername(newData?.username ? newData?.username : username);
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={cx('save')}
                                                    disabled={!validUserName ? true : false}
                                                    onClick={handleSubmit}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={cx('form-text')}>
                                                {newData?.username ? newData?.username : username}
                                            </span>
                                            <button
                                                className={cx('open')}
                                                onClick={() => setChangeUsername(true)}
                                                disabled={
                                                    changeName || changeEmail || changePhone || changeCity
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <span className={cx('open-text')}>Chỉnh sửa</span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className={cx('form-item')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Địa chỉ email
                                    </label>
                                    {changeEmail ? (
                                        <>
                                            <div className={cx('wrapper-input')}>
                                                <input
                                                    id="email"
                                                    className={cx('form-input')}
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    required
                                                    aria-invalid={validEmail ? 'false' : 'true'}
                                                    aria-describedby="uidnote"
                                                    onFocus={() => setEmailFocus(true)}
                                                    onBlur={() => {
                                                        setEmailFocus(false);
                                                        errorMsg && setErrorMsg('');
                                                    }}
                                                />
                                                <span
                                                    ref={errRef}
                                                    className={errorMsg ? cx('error-message') : cx('offscreen')}
                                                    aria-live="assertive"
                                                >
                                                    <ErrorOutlineOutlinedIcon
                                                        className={errorMsg ? cx('iconExist-error') : cx('offscreen')}
                                                    />
                                                    {errorMsg}
                                                </span>
                                                <CheckOutlinedIcon className={validEmail ? cx('valid') : cx('hide')} />
                                                <p
                                                    id="uidnote"
                                                    className={
                                                        emailFocus && email && !validEmail
                                                            ? cx('instructions')
                                                            : cx('offscreen')
                                                    }
                                                >
                                                    <ErrorOutlineOutlinedIcon className={cx('error-icon')} />
                                                    Bắt đầu bằng chữ cái, phải là email hợp lệ
                                                </p>
                                            </div>
                                            <div className={cx('wrapper-button')}>
                                                <button
                                                    className={cx('close')}
                                                    onClick={() => {
                                                        setEmail(newData?.email ? newData?.email : email);
                                                        setChangeEmail(false);
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={cx('save')}
                                                    disabled={!validEmail ? true : false}
                                                    onClick={handleSubmit}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={cx('form-text')}>
                                                {newData?.email ? newData?.email : email}
                                            </span>
                                            <button
                                                className={cx('open')}
                                                disabled={
                                                    changeUsername || changeName || changePhone || changeCity
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <span className={cx('open-text')} onClick={() => setChangeEmail(true)}>
                                                    Chỉnh sửa
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className={cx('form-item')}>
                                    <label htmlFor="phone" className={cx('form-label')}>
                                        Số điện thoại
                                    </label>
                                    {changePhone ? (
                                        <>
                                            <div className={cx('wrapper-input')}>
                                                <input
                                                    id="phone"
                                                    className={cx('form-input')}
                                                    type="text"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    value={phone}
                                                    autoFocus
                                                    required
                                                    aria-invalid={validPhone ? 'false' : 'true'}
                                                    aria-describedby="uidnote"
                                                    onFocus={() => setPhoneFocus(true)}
                                                    onBlur={() => setPhoneFocus(false)}
                                                />
                                                <CheckOutlinedIcon className={validPhone ? cx('valid') : cx('hide')} />
                                                <p
                                                    id="uidnote"
                                                    className={
                                                        phoneFocus && phone && !validPhone
                                                            ? cx('instructions')
                                                            : cx('offscreen')
                                                    }
                                                >
                                                    <ErrorOutlineOutlinedIcon className={cx('error-icon')} />
                                                    Số điện thoại bao gồm 10 chữ số
                                                </p>
                                            </div>
                                            <div className={cx('wrapper-button')}>
                                                <button
                                                    className={cx('close')}
                                                    onClick={() => {
                                                        setPhone(newData?.phone ? newData?.phone : phone);
                                                        setChangePhone(false);
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={cx('save')}
                                                    onClick={handleSubmit}
                                                    disabled={!validPhone ? true : false}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={cx('form-text')}>
                                                {newData?.phone
                                                    ? newData?.phone
                                                    : phone
                                                    ? phone
                                                    : 'Thêm số điện thoại của bạn'}
                                            </span>
                                            <button
                                                className={cx('open')}
                                                disabled={
                                                    changeName || changeUsername || changeEmail || changeCity
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <span className={cx('open-text')} onClick={() => setChangePhone(true)}>
                                                    Chỉnh sửa
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className={cx('form-item')}>
                                    <label className={cx('form-label')}>Tỉnh / Thành phố</label>
                                    <select className={cx('form-selecNone')} style={{ display: 'none' }}>
                                        <option className={cx('form-option')} value="">
                                            Chọn tỉnh / thành phố của bạn
                                        </option>
                                        <option className={cx('form-option')} value="hcm">
                                            Hồ Chí Minh
                                        </option>
                                        <option className={cx('form-option')} value="hn">
                                            Hà Nội
                                        </option>
                                        <option className={cx('form-option')} value="dn">
                                            Đà Nẵng
                                        </option>
                                        <option className={cx('form-option')} value="nt">
                                            Nha Trang
                                        </option>
                                        <option className={cx('form-option')} value="pq">
                                            Phú Quốc
                                        </option>
                                        <option className={cx('form-option')} value="qn">
                                            Quy Nhơn
                                        </option>
                                        <option className={cx('form-option')} value="bl">
                                            Bảo Lộc
                                        </option>
                                        <option className={cx('form-option')} value="dl">
                                            Đà Lạt
                                        </option>
                                        <option className={cx('form-option')} value="vt">
                                            Vũng Tàu
                                        </option>
                                        <option className={cx('form-option')} value="pt">
                                            Phan Thiết
                                        </option>
                                    </select>
                                    {changeCity ? (
                                        <>
                                            <div className={cx('wrapper-select')}>
                                                <select
                                                    ref={cityRef}
                                                    id="city"
                                                    value={city}
                                                    className={cx('form-select')}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    aria-invalid={validCity ? 'false' : 'true'}
                                                    aria-describedby="uidnote"
                                                >
                                                    <option className={cx('form-option')} value="">
                                                        Chọn tỉnh / thành phố của bạn
                                                    </option>
                                                    <option className={cx('form-option')} value="hcm">
                                                        Hồ Chí Minh
                                                    </option>
                                                    <option className={cx('form-option')} value="hn">
                                                        Hà Nội
                                                    </option>
                                                    <option className={cx('form-option')} value="dn">
                                                        Đà Nẵng
                                                    </option>
                                                    <option className={cx('form-option')} value="nt">
                                                        Nha Trang
                                                    </option>
                                                    <option className={cx('form-option')} value="pq">
                                                        Phú Quốc
                                                    </option>
                                                    <option className={cx('form-option')} value="qn">
                                                        Quy Nhơn
                                                    </option>
                                                    <option className={cx('form-option')} value="bl">
                                                        Bảo Lộc
                                                    </option>
                                                    <option className={cx('form-option')} value="dl">
                                                        Đà Lạt
                                                    </option>
                                                    <option className={cx('form-option')} value="vt">
                                                        Vũng Tàu
                                                    </option>
                                                    <option className={cx('form-option')} value="pt">
                                                        Phan Thiết
                                                    </option>
                                                </select>
                                                <CheckOutlinedIcon
                                                    className={validCity ? cx('option-valid') : cx('option-hide')}
                                                />
                                                <p
                                                    id="uidnote"
                                                    className={
                                                        city?.length === 0 && !validCity
                                                            ? cx('instructions-option')
                                                            : cx('offscreen-option')
                                                    }
                                                >
                                                    <ErrorOutlineOutlinedIcon className={cx('attention-icon')} />
                                                    Phải chọn ít nhất một thành phố
                                                </p>
                                            </div>
                                            <div className={cx('wrapper-button')}>
                                                <button
                                                    className={cx('close')}
                                                    onClick={() => {
                                                        setChangeCity(false);
                                                        setCity(
                                                            newData?.city
                                                                ? newData?.city
                                                                : data?.city
                                                                ? data?.city
                                                                : 'Chọn tỉnh / thành phố nơi bạn sinh sống',
                                                        );
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={cx('save')}
                                                    disabled={validCity ? false : true}
                                                    onClick={handleSubmit}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={cx('form-text')}>
                                                {nameCity.length > 0
                                                    ? nameCity
                                                    : 'Chọn tỉnh / thành phố nơi bạn sinh sống'}
                                            </span>
                                            <button
                                                className={cx('open')}
                                                onClick={() => setChangeCity(true)}
                                                disabled={
                                                    changeUsername || changeName || changeEmail || changePhone
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <span className={cx('open-text')}>Chỉnh sửa</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Navigate to="/login" />
                )}
            </div>
            {openModal && (
                <ModalImage
                    setOpen={setOpenModal}
                    userId={id}
                    data={data}
                    imageCurrent={currentImage}
                    file={file}
                    setFile={setFile}
                    newData={newData}
                    setNewData={setNewData}
                />
            )}
        </div>
    );
}

export default Personal;
