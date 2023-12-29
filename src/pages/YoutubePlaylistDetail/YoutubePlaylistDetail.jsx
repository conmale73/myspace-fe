import styles from "./PlaylistDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { youtubeService } from "../../services";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import LongSong from "../../components/Song/SongLong";

import {
    addSong,
    removeSong,
    changeCurrentSong,
    clearListSong,
} from "../../redux/listSong/listSongSlice";
import { useSongContext } from "../../context/SongContext";
import { useQuery, useMutation } from "@tanstack/react-query";

const PlaylistDetail = (props) => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const [playlist, setPlaylist] = useState();
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
    } = useSongContext();

    const fetchData = async () => {
        const res = await youtubeService.getYoutubePlaylist(id);
        setPlaylist(res.data);
        return res.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["youtubePlaylistDetail", id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    const handleClickPlay = (e) => {
        let index = 0;
        dispatch(clearListSong());
        while (index < playlist?.tracks?.length) {
            const songToAdd = {
                videoId: playlist?.tracks[index]?.videoId,
                title: playlist?.tracks[index]?.title,
                album: playlist?.tracks[index]?.album,
                thumbnails: playlist?.tracks[index]?.thumbnails,
                url:
                    "https://www.youtube.com/watch?v=" +
                    playlist?.tracks[index]?.videoId,
                artists: playlist?.tracks[index]?.artists,
                category: playlist?.tracks[index]?.category,
                duration: playlist?.tracks[index]?.duration,
            };
            dispatch(addSong(songToAdd));
            index++;
        }
        dispatch(changeCurrentSong(playlist?.tracks[0]));
        setCurrentSongIndex(0);
        setCurrentSong(playlist?.tracks[0]);
        setIsPlaying(true);
    };

    const handleSavePlaylist = () => {
        const playlistToSave = {};
    };
    return (
        <div className={styles.playlistDetail}>
            <div className={styles.playlistInfo}>
                <div className={styles.imageContainer}>
                    <img
                        src={
                            playlist?.thumbnails[3]?.url ||
                            playlist?.thumbnails[2]?.url ||
                            playlist?.thumbnails[1]?.url ||
                            playlist?.thumbnails[0]?.url
                        }
                    />
                </div>
                <div className={styles.infoContainer}>
                    <p className={styles.title}>{playlist?.title}</p>
                    <div className={styles.metadata}>
                        <div className={styles.row}>
                            <span className={styles.text}>Playlist</span>
                            <span className={styles.dot}>•</span>
                            {playlist?.author?.id != null ? (
                                <Link
                                    to={`/music/artists/${playlist?.author?.id}`}
                                >
                                    <span
                                        className={`${styles.text} ${styles.underline}`}
                                    >
                                        {playlist?.author?.name}
                                    </span>
                                </Link>
                            ) : (
                                <span className={styles.text}>
                                    {playlist?.author?.name}
                                </span>
                            )}

                            <span className={styles.dot}>•</span>
                            <span className={styles.text}>
                                {playlist?.year}
                            </span>
                        </div>
                        <div className={styles.row}>
                            {playlist?.views != null && (
                                <>
                                    <span className={styles.text}>
                                        {`${playlist?.views}k views`}
                                    </span>
                                    <span className={styles.dot}>•</span>
                                </>
                            )}

                            <span className={styles.text}>
                                {`${playlist?.trackCount} songs`}
                            </span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.text}>
                                {playlist?.duration}
                            </span>
                        </div>
                        <div className={`${styles.description} `}>
                            {playlist?.description}
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div
                        className={styles.playButton}
                        onClick={(e) => handleClickPlay(e)}
                    >
                        <BsFillPlayFill
                            size="30px"
                            className={styles.playIcon}
                        />
                        <p className={styles.playText}>Play</p>
                    </div>
                    {/* <div
                        className={styles.saveButton}
                        onClick={handleSavePlaylist}
                    >
                        <MdOutlineLibraryAdd
                            size="30px"
                            className={styles.saveIcon}
                        />
                        <p className={styles.saveText}>Save to Library</p>
                    </div> */}
                </div>
            </div>
            <div className={styles.listSong}>
                <div className={styles.listSongBody}>
                    {playlist?.tracks?.map((item, index) => (
                        <LongSong
                            song={item}
                            key={index}
                            videoId={item?.videoId}
                            title={item?.title}
                            album={item?.album}
                            artists={item?.artists}
                            duration={item?.duration}
                            thumbnails={item?.thumbnails}
                            buttons={true}
                            youtube={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PlaylistDetail;
