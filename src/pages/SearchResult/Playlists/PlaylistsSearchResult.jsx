import styles from "./PlaylistsSearchResult.module.scss";
import YoutubeListPlaylists from "../../../components/ListComponent/YoutubeListPlaylists";
import { searchService } from "../../../services";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const PlaylistsSearchResult = (props) => {
    const { query } = props;

    const [playlists, setPlaylists] = useState([]);

    const fetchData = async () => {
        const res = await searchService.search(query, "playlists", "VN", "en");
        setPlaylists(res.data);
        return res.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["searchPlaylists", query],
        queryFn: () => fetchData(),
    });

    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    return (
        <div className={styles.playlistsSearchResult}>
            <YoutubeListPlaylists
                playlists={playlists}
                isSlidePlaylist={false}
                search={true}
            />
        </div>
    );
};
export default PlaylistsSearchResult;
