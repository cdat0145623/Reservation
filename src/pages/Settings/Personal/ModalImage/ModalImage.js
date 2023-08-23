import classnames from 'classnames/bind';
import styles from './ModalImage.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import axios from '~/axios/axios';

const cx = classnames.bind(styles);

function ModalImage({ setOpen, userId, data, imageCurrent, file, setFile, newData, setNewData }) {
    const [validImage, setValidImage] = useState(false);

    const publicImage = 'http://localhost:3003/images/';

    useEffect(() => {
        console.log('Image changed::::');
        console.log(imageCurrent?.current);
        imageCurrent?.current ? setValidImage(true) : setValidImage(false);
        // eslint-disable-next-line
    }, [file]);

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        if (file) {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'upload');
            try {
                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dafyuivup/image/upload', data);
                const { url } = uploadRes.data;
                const imageUpdated = {
                    image: url,
                };
                const res = await axios.put(`/api/users/${userId}`, imageUpdated, {
                    withCredentials: true,
                });
                console.log(res?.data);
                setNewData((prev) => {
                    return {
                        ...prev,
                        image: res?.data?.image,
                    };
                });
                setOpen(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('header-modal')}>
                    <h1 className={cx('header-title')}>Chọn hình ảnh để tải lên</h1>
                    <button
                        className={cx('close-button')}
                        onClick={() => {
                            setOpen(false);
                            setFile('');
                        }}
                    >
                        <CloseIcon className={cx('close-icon')} />
                    </button>
                </div>
                <div className={cx('body-modal')}>
                    <div className={cx('wrapper-image')}>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : newData?.image
                                    ? newData?.image
                                    : data?.image === 'default.jpeg'
                                    ? publicImage + 'default.jpeg'
                                    : data?.image
                            }
                            alt=""
                            className={cx('image')}
                        />
                    </div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-innerContent')}>
                            <label className={cx('modal-label')} htmlFor="fileInput">
                                Chọn tập tin
                            </label>
                            <input
                                ref={imageCurrent}
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                className={cx('modal-input')}
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span className={cx('name-image')}>{file ? file?.name : ''}</span>
                        </div>
                        <button
                            className={cx('modal-save')}
                            disabled={!validImage ? true : false}
                            onClick={handleSubmitImage}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalImage;
