export const inputsRegister = [
    {
        id: 'name',
        className: 'form-input',
        name: 'name',
        type: 'text',
        placeholder: 'Tên của bạn',
        errormessage: 'Tên bắt đầu bằng ký tự thường, cách nhau bởi dấu phẩy và không có ký tự đặc biệt.',
        label: 'Tên',
        pattern: '^[a-zA-Z ]{2,16}$',
        required: true,
    },
    {
        id: 'username',
        className: 'form-input',
        name: 'username',
        type: 'text',
        placeholder: 'Username',
        errormessage: 'Tên đăng nhập bắt đầu bằng chữ cái, tối đa 16 ký tự và không có ký tự đặc biệt',
        label: 'Tên đăng nhập',
        pattern: '^[A-Za-z][A-Za-z0-9_]{2,16}$',
        required: true,
    },
    {
        id: 'email',
        className: 'form-input',
        name: 'email',
        type: 'text',
        placeholder: 'Email',
        errormessage: 'Email hợp lệ phải có dấu @',
        label: 'Email',
        pattern: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
        required: true,
    },
    {
        id: 'password',
        className: 'form-input',
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        errormessage: 'Mật khẩu bao gồm 20 ký tự và có ít nhất là 1 số',
        label: 'Mật khẩu',
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,20}$`,
        required: true,
    },
    {
        id: 'confirmPassword',
        className: 'form-input',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm Password',
        errorMessage: 'Mật khẩu chưa khớp!',
        label: 'Nhập lại mật khẩu',
        pattern: credentials.password,
        required: true,
    },
];
