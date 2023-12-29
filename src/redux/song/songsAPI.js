import { songService } from "../../services";
import { getListSong, getSongDetail } from "./songsSlice";

export const getListSongAPI = () => async (dispatch) => {
    let res = await songService.getSongs();
    dispatch(getListSong(res));
};

export const getSongDetailAPI = (id) => async (dispatch) => {
    let res = await songService.getSong(id);
    dispatch(getSongDetail(res));
};
