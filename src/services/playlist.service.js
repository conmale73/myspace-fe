import { axiosClient } from "~/api";

export const playlistService = {
    createPlaylist(title, creator, description, privacy) {
        return axiosClient.post(`/api/playlists/`, {
            title,
            creator,
            description,
            privacy,
        });
    },
    getSavedPlaylists(user_id) {
        return axiosClient.get(`/api/playlists/saved/${user_id}`);
    },
    getPlaylistById(id, user_id) {
        return axiosClient.put(`/api/playlists/${id}`, { user_id });
    },
    getAllPlaylistsByUserID(user_id) {
        return axiosClient.get(`/api/playlists/user/${user_id}`);
    },
    getTwoRecentPlaylistsByUserID(user_id) {
        return axiosClient.get(`/api/playlists/recentTwo/user/${user_id}`);
    },

    savePlaylistToLibrary(user_id, playlist_id) {
        return axiosClient.put(`/api/playlists/save/${playlist_id}`, {
            user_id,
        });
    },
    removePlaylistFromLibrary(user_id, playlist_id) {
        return axiosClient.put(`/api/playlists/remove/${playlist_id}`, {
            user_id,
        });
    },
    addSongToPlaylist(playlist_id, song) {
        return axiosClient.put(`/api/playlists/${playlist_id}/addSong`, song);
    },
    removeSongFromPlaylist(playlist_id, song_id) {
        return axiosClient.put(`/api/playlists/${playlist_id}/removeSong`, {
            song_id,
        });
    },
    deletePlaylist(playlist_id) {
        return axiosClient.delete(`/api/playlists/${playlist_id}`);
    },
    updatePlaylist(playlist_id, title, privacy) {
        return axiosClient.put(`/api/playlists/${playlist_id}`, {
            title,
            privacy,
        });
    },
};
