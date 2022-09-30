import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

let urls = {
    test: "https://ken-inventory-api.fly.dev",
    development: "https://ken-inventory-api.fly.dev",
    production: "https://ken-inventory-api.fly.dev",
};

const token = Cookies.get("token");

const request: AxiosInstance = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    return newConfig;
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },

    (error: AxiosError<unknown>) => {
        message.error(error.message);
        return Promise.reject(error.response);
    }
);

export default request;
