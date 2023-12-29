import { axiosYoutube } from "~/api";

export const youtubeService = {
    //Playlist
    getYoutubePlaylist(id) {
        return axiosYoutube.get(`/playlists/?id=${id}`);
    },
    //Album
    getYoutubeAlbum(id) {
        return axiosYoutube.get(`/browse/albums/?browseId=${id}`);
    },
};
