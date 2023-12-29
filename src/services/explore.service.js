import { axiosYoutube } from "~/api";

export const exploreService = {
    getChart(params) {
        return axiosYoutube.get(`/explore/charts/?cc=${params}&r=DE`);
    },
};
