import { Navigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

function useFetchUser(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useLayoutEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axiosPrivate.get(url, { withCredentials: true });
                console.log(res.data);
                setData(res?.data);
            } catch (err) {
                console.log(err);
                if (
                    err?.response?.data?.error?.statusCode === 403 &&
                    err?.response?.data?.message === 'Session is not valid'
                ) {
                    console.log(11111);
                    window.localStorage.removeItem('user');
                    <Navigate to="/login" />;
                }

                setError(err);
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, [url]);

    return { data, loading, error };
}

export default useFetchUser;
