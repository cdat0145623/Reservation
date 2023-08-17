import { useContext, useEffect } from "react";
import { axiosPrivate } from "~/api/axios";
import useRefreshToken from "./useRefreshToken";
import { AuthContext } from "../context/AuthContext";
import jwt_decoded from "jwt-decode";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // eslint-disable-next-line
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                const decodeToken = jwt_decoded(user);
                let currentDate = new Date();
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${user}`;
                }
                if (decodeToken.exp * 1000 < currentDate.getTime()) {
                    const data = await refresh();
                    config.headers["Authorization"] =
                        "Bearer " + data?.access_token;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        // eslint-disable-next-line
    }, [user, refresh]);
    return axiosPrivate;
}

export default useAxiosPrivate;
