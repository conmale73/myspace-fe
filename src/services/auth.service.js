import { axiosClient } from "~/api";

export const authService = {
    login(email, password) {
        return axiosClient.post("/api/auth/login", {
            email: email,
            password: password,
        });
    },
    register(email, password, username) {
        return axiosClient.post("/api/auth/register", {
            email: email,
            password: password,
            username: username,
        });
    },
};
