import axios from "~/api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useRefreshToken = () => {
    const { dispatchAuth } = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get("/api/users/refreshToken", {
            withCredentials: true,
        });
        dispatchAuth({
            type: "LOGIN_SUCCESS",
            payload: response?.data?.access_token,
        });
        return response.data;
    };
    return refresh;
};

export default useRefreshToken;
