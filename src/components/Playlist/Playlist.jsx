import React from "react";
import { Link } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./Playlist.module.scss";

const Playlist = (props) => {
    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("play: ", props?._id);
    };
    return (
        <div className={styles.playlist}>
            <div className={styles.playlistImage}>
                <img
                    src={
                        props.playlist?.songs[0]?.thumbnails[2]?.url ||
                        props.playlist?.songs[0]?.thumbnails[1]?.url ||
                        props.playlist?.songs[0]?.thumbnails[0]?.url ||
                        "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
                    }
                    alt=""
                />
            </div>

            <div className={styles.playButtonContainer}>
                <BsPlayCircle
                    size="40px"
                    className={styles.playButton}
                    key={props.playlist._id}
                    onClick={(e) => handleClickPlay(e)}
                />
            </div>

            <div className={styles.info}>
                <Link
                    to={`/music/playlist/${props.playlist._id}`}
                    key={props.playlist._id}
                >
                    <div
                        className={styles.playlistName}
                        title={props.playlist.title}
                    >
                        {props.playlist.title}
                    </div>
                </Link>

                <div className={styles.creator}>
                    {props.playlist.description}
                </div>
            </div>
        </div>
    );
};
export default Playlist;
