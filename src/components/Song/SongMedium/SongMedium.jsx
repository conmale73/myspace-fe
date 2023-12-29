import styles from "./Song(Medium).module.scss";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../../redux/listSong/listSongSlice";
import { useSongContext } from "../../../context/SongContext";
function MediumSong(props) {
    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();
    const { videoId, title, album, thumbnails, artists, category, duration } =
        props;
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
        <>
            {props.thumbnails ? (
                <div className={styles.mediumSong}>
                    <div className={styles.songImageContainer}>
                        <img
                            src={
                                props.thumbnails[0]?.url ||
                                props.thumbnails[1]?.url ||
                                props.thumbnails[2]?.url ||
                                props.thumbnails[3]?.url ||
                                props.thumbnails[4]?.url
                            }
                            className={styles.songImage}
                        />
                        <div
                            className={styles.playButtonContainer}
                            key={props?.videoId}
                            onClick={(e) => handleClickPlay(e)}
                        >
                            <FaPlay
                                size="20px"
                                title="Add to Now Playing"
                                className={styles.playButton}
                            />
                        </div>
                    </div>
                    <div className={styles.info}>
                        <Link to={`/music/songs/${props?.videoId}`}>
                            <div
                                className={styles.songName}
                                title={props?.title}
                                key={props?.videoId}
                            >
                                {props?.title}
                            </div>
                        </Link>
                        <div className={styles.artistList}>
                            {props?.artists?.map((artist, index) => (
                                <Link
                                    to={`/music/artists/${artist.id}`}
                                    key={index}
                                >
                                    {artist.id !== null ? (
                                        <p
                                            key={index}
                                            className={styles.artist}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                            {index <
                                            props?.artists.length - 1 ? (
                                                <span> </span>
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
export default MediumSong;
