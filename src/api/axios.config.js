import axios from "axios";

//const apiProduction = 'https://json-kali.onrender.com';
const apiProduction = "http://localhost:3000";
const apiDev = "http://localhost:3000";
const apiYoutube = "http://localhost:5000";
const baseURL = process.env.NODE_ENV === "production" ? apiProduction : apiDev;

const axiosClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
    maxContentLength: 100000000,
});

axiosClient.interceptors.request.use(
    function (req) {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) req.headers["Authorization"] = `Bearer ${token}`;
        return req;
    },

    function (error) {
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    function (res) {
        return res;
    },

    function (error) {
        return Promise.reject(error);
    }
);

const axiosYoutube = axios.create({
    baseURL: apiYoutube,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosYoutube.interceptors.request.use(
    function (req) {
        // const token = JSON.parse(localStorage.getItem("token"));
        // if (token) req.headers["auth-token"] = token;
        return req;
    },

    function (error) {
        return Promise.reject(error);
    }
);
axiosYoutube.interceptors.response.use(
    function (res) {
        return res;
    },

    function (error) {
        return Promise.reject(error);
    }
);
export { axiosYoutube, axiosClient };
