import { axiosYoutube } from "~/api";

export const recommendationService = {
    getHome(region, language) {
        return axiosYoutube.get(`/home?r=${region}&l=${language}`);
    },
};
