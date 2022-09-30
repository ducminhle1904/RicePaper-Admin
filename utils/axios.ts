import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

let urls = {
    test: `http://localhost:8080`,
    development: "http://localhost:8080/",
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
