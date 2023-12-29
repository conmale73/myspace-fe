import { axiosYoutube } from "~/api";

export const browseService = {
    getArtist(params) {
        return axiosYoutube.get(`/browse/artists/?channelId=${params}`);
    },
};
