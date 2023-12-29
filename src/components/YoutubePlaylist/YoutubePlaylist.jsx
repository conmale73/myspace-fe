import React from "react";
import { Link } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./Playlist.module.scss";

const YoutubePlaylist = (props) => {
    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("play: ", props?.browseId);
    };
    return (
        <div className={styles.youtubePlaylist}>
            <div className={styles.playlistImage}>
                <img
                    src={
                        props.thumbnails[0]?.url ||
                        props.thumbnails[1]?.url ||
                        props.thumbnails[2]?.url ||
                        props.thumbnails[3]?.url ||
                        props.thumbnails[4]?.url
                    }
                    alt=""
                />
            </div>

            <div className={styles.playButtonContainer}>
                <BsPlayCircle
                    size="40px"
                    className={styles.playButton}
                    key={props.playlistId}
                    onClick={(e) => handleClickPlay(e)}
                />
            </div>

            <div className={styles.info}>
                {props.search ? (
                    <Link
                        to={`/music/playlist/youtube/${props.browseId}`}
                        key={props.browseId}
                    >
                        <div
                            className={styles.playlistName}
                            title={props.title}
                        >
                            {props.title}
                        </div>
                    </Link>
                ) : (
                    <Link
                        to={`/music/playlist/youtube/${props.playlistId}`}
                        key={props.playlistId}
                    >
                        <div
                            className={styles.playlistName}
                            title={props.title}
                        >
                            {props.title}
                        </div>
                    </Link>
                )}

                <div className={styles.creator}>{props.description}</div>
            </div>
        </div>
    );
};

export default YoutubePlaylist;
