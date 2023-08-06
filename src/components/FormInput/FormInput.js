import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const FormInput = (props) => {
    const { className, errormessage, onChange, ...inputProps } = props;

    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
        <>
            <input
                {...inputProps}
                className={cx(className)}
                onChange={onChange}
                focused={focused.toString()}
                onBlur={handleFocus}
            />
            <span className={cx('error-message')}>{errormessage}</span>
        </>
    );
};
export default FormInput;
