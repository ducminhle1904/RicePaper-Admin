import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const request: AxiosInstance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    return newConfig;
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },

    (error: AxiosError<unknown>) => {
        message.error(error.message);
        return Promise.reject(error.response);
    }
);

export default request;
