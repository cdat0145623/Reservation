import { Navigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import axios from '~/axios/axios';

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url, { withCredentials: true });
                console.log(res.data);
                setData(res?.data);
            } catch (err) {
                console.log(err);
                if (
                    err?.response?.data?.error?.statusCode === 403 &&
                    err?.response?.data?.message === 'Session is not valid'
                ) {
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

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url, { withCredentials: true });
            setData(res?.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
}

export default useFetch;
