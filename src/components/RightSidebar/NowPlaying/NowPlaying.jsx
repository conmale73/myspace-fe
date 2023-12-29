import React from "react";
import styles from "./nowPlaying.module.scss";
import { Link } from "react-router-dom";
import SmallSong from "../../Song/SongSmall/SongSmall";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { songService } from "../../../services/song.service";
import { useSongContext } from "../../../context/SongContext";

const NowPlaying = () => {
    const songs = useSelector((state) => state.listSongs.list);
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();

    return (
        <div className={styles.nowPlaying}>
            {songs.map((song, index) => (
                <SmallSong
                    key={index}
                    videoId={song.videoId}
                    title={song.title}
                    artists={song.artists}
                    thumbnails={song.thumbnails}
                    playing={songs[currentSongIndex]?.videoId}
                />
            ))}
        </div>
    );
};
export default NowPlaying;
