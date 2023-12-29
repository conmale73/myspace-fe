import styles from "./ShortSmallSong.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useSongContext } from "../../../context/SongContext";
import { useDispatch, useSelector } from "react-redux";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../../redux/listSong/listSongSlice";

const ShortSmallSong = (props) => {
    const [item, setItem] = useState(props.item);
    const songsList = useSelector((state) => state.listSongs.list);
    const dispatch = useDispatch();
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();

    const { videoId, title, album, thumbnails, artists, category, duration } =
        props.item;

    const songToAdd = {
        videoId,
        title,
        album,
        thumbnails,
        url: "https://www.youtube.com/watch?v=" + videoId,
        artists,
        category,
        duration,
    };

    const handleClickPlay = (e) => {
        e.preventDefault();
        if (dispatch(addSong(songToAdd)) && songsList.length === 0) {
            console.log("add: ", songToAdd);
            dispatch(changeCurrentSong(songToAdd));
            setCurrentSongIndex(0);
            setCurrentSong(songToAdd);
        }
    };
    return (
        <div className={styles.shortSmallSong}>
            <div className={styles.imageContainer}>
                <img
                    src={item.thumbnails[0].url || item.thumbnails[1].url}
                    alt=""
                />
                <div
                    className={styles.playButton}
                    key={props.videoId}
                    onClick={(e) => handleClickPlay(e)}
                >
                    <FaPlay size="20px" title="Add to Now Playing" />
                </div>
            </div>
            <div className={styles.infoContainer}>
                <Link to={`/music/songs/${item.videoId}`}>
                    <div className={styles.title} title={item.title}>
                        {item.title}
                    </div>
                </Link>

                <div className={styles.artistList}>
                    {item.artists.map((artist, index) => (
                        <Link to={`/music/artists/${artist.id}`} key={index}>
                            <p
                                key={index}
                                className={styles.artist}
                                title={artist.name}
                            >
                                {artist.name}
                                {index < item.artists.length - 1 ? (
                                    <span> & </span>
                                ) : (
                                    ""
                                )}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ShortSmallSong;
