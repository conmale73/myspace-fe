import styles from "./SongsSearchResult.module.scss";
import LongSong from "../../../components/Song/SongLong";
import { searchService } from "../../../services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { useQuery, useMutation } from "@tanstack/react-query";

const SongsSearchResult = (props) => {
    const query = useSelector((state) => state.search.input);

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["searchSongs", props.query],
        queryFn: () =>
            searchService
                .search(props.query, "songs", "VN", "en")
                .then((res) => res.data),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <div className={styles.songsSearchResult}>
                {data?.map((song, index) => {
                    return (
                        <LongSong
                            song={song}
                            key={index}
                            videoId={song?.videoId}
                            title={song?.title}
                            artists={song?.artists}
                            thumbnails={song?.thumbnails}
                            album={song?.album}
                            duration={song?.duration}
                            category={song?.category}
                            liked={song?.liked}
                            buttons={true}
                            youtube={true}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default SongsSearchResult;
