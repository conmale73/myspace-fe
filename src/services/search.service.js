import { axiosYoutube } from "~/api";

export const searchService = {
    search(query, type, region, language) {
        return axiosYoutube.get(
            `/search/?q=${query}&f=${type}&r=${region}&l=${language}`
        );
    },
    query(query) {
        return axiosYoutube.get(`/query/?q=${query}`);
    },
};
