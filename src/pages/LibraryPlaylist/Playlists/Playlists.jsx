import styles from "./Playlists.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { playlistService } from "../../../services";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import YoutubePlaylist from "../../../components/YoutubePlaylist";
import Playlist from "../../../components/Playlist";
import { setPlaylists } from "../../../redux/playlist/playlistSlice";
const PlaylistsLibrary = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [playlist, setPlaylist] = useState([]);

    const fetchAllPlaylists = async () => {
        const res = await playlistService.getAllPlaylistsByUserID(user._id);
        dispatch(setPlaylists(res.data.data));
        return res.data.data;
    };
    const fetchData = async () => {
        const res = await playlistService.getSavedPlaylists(user._id);
        setPlaylist(res.data.data);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["playlists", user._id],
        queryFn: () => fetchData(),
    });
    useEffect(() => {
        if (props.refetch == true) {
            fetchData();
            fetchAllPlaylists();
            props.setRefetch(false);
        }
    }, [props.refetch]);
    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    return (
        <div className={styles.playlistsHistory}>
            <div className={`${styles.playlists} flex gap-[20px] flex-wrap`}>
                {playlist?.map((playlist, index) => (
                    <Playlist key={index} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};
export default PlaylistsLibrary;
