import { axiosYoutube } from "~/api";

export const songService = {
    getSongs() {
        return axiosYoutube.get("/api/songs");
    },
    getSong(id) {
        return axiosYoutube.get(`/api/songs/${id}`);
    },
    // querySong(query, maxResults) {
    //     return axiosClient.get(
    //         `/api/youtube-search/?maxResults=${maxResults}&query=${query}&part=snippet`
    //     );
    // },
    querySong(query) {
        return axiosYoutube.get(`/search/?q=${query}&f=songs&r=VN`);
    },
    getYoutubeSongMetadata(id) {
        return axiosYoutube.get(`/songs/metadata/?videoId=${id}`);
    },
    getSongRelated(id) {
        return axiosYoutube.get(`/songs/related/?videoId=${id}&r=VN`);
    },
};
