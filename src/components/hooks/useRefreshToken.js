import axios from '~/axios/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRefreshToken = () => {
    const { dispatch } = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/api/users/refreshToken', {
            withCredentials: true,
        });
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response?.data?.access_token,
        });
        return response.data;
    };
    return refresh;
};

export default useRefreshToken;
