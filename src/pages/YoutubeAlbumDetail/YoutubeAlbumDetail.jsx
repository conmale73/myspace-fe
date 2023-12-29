import styles from "./YoutubeAlbumDetail.module.scss";
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

const YoutubeAlbumDetail = (props) => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const [album, setalbum] = useState();
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
    } = useSongContext();

    const fetchData = async () => {
        const res = await youtubeService.getYoutubeAlbum(id);
        setalbum(res.data);
        return res.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["youtubealbumDetail", id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    const handleClickPlay = (e) => {
        let index = 0;
        dispatch(clearListSong());
        while (index < album?.tracks?.length) {
            const songToAdd = {
                videoId: album?.tracks[index]?.videoId,
                title: album?.tracks[index]?.title,
                album: album?.tracks[index]?.album,
                thumbnails: album?.tracks[index]?.thumbnails,
                url:
                    "https://www.youtube.com/watch?v=" +
                    album?.tracks[index]?.videoId,
                artists: album?.tracks[index]?.artists,
                category: album?.tracks[index]?.category,
                duration: album?.tracks[index]?.duration,
            };
            dispatch(addSong(songToAdd));
            index++;
        }
        dispatch(changeCurrentSong(album?.tracks[0]));
        setCurrentSongIndex(0);
        setCurrentSong(album?.tracks[0]);
        setIsPlaying(true);
    };

    const handleSaveAlbum = () => {
        const albumToSave = {};
    };
    return (
        <div className={styles.albumDetail}>
            <div className={styles.albumInfo}>
                <div className={styles.imageContainer}>
                    <img
                        src={
                            album?.thumbnails[3]?.url ||
                            album?.thumbnails[2]?.url ||
                            album?.thumbnails[1]?.url ||
                            album?.thumbnails[0]?.url
                        }
                    />
                </div>
                <div className={styles.infoContainer}>
                    <p className={styles.title}>{album?.title}</p>
                    <div className={styles.metadata}>
                        <div className={styles.row}>
                            <span className={styles.text}>Album</span>
                            <span className={styles.dot}>•</span>
                            <div className={styles.artistList}>
                                {album?.artists.map((artist, index) => (
                                    <Link
                                        to={`/music/artists/${artist.id}`}
                                        key={index}
                                    >
                                        <p
                                            key={index}
                                            className={styles.artist}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                            {index <
                                            album?.artists.length - 1 ? (
                                                <span> & </span>
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            <span className={styles.dot}>•</span>
                            <span className={styles.text}>{album?.year}</span>
                        </div>
                        <div className={styles.row}>
                            {album?.views != null && (
                                <>
                                    <span className={styles.text}>
                                        {`${album?.views}k views`}
                                    </span>
                                    <span className={styles.dot}>•</span>
                                </>
                            )}

                            <span className={styles.text}>
                                {`${album?.trackCount} songs`}
                            </span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.text}>
                                {album?.duration}
                            </span>
                        </div>
                        <p className={`${styles.description} `}>
                            {album?.description}
                        </p>
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
                    <div
                        className={styles.saveButton}
                        onClick={handleSaveAlbum}
                    >
                        <MdOutlineLibraryAdd
                            size="30px"
                            className={styles.saveIcon}
                        />
                        <p className={styles.saveText}>Save as Playlist</p>
                    </div>
                </div>
            </div>
            <div className={styles.listSong}>
                <div className={styles.listSongBody}>
                    {album?.tracks?.map((item, index) => (
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
export default YoutubeAlbumDetail;
