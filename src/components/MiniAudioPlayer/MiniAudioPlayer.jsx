import { useState, useEffect, useRef } from "react";
import styles from "./MiniAudioPlayer.module.scss";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import ReactPlayer from "react-player";
import Duration from "../Duration";
import { useSongContext } from "../../context/SongContext";
import { useDispatch, useSelector } from "react-redux";
import {
    changeCurrentSong,
    setIsPlaying,
} from "../../redux/listSong/listSongSlice";

const MiniAudioPlayer = (props) => {
    const isPlaying = useSelector((state) => state.listSongs.isPlaying);
    const [isPlayingMini, setIsPlayingMini] = useState(false);
    const [isRepeat, setIsRepeat] = useState("off");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const playerRef = useRef(null);

    const dispatch = useDispatch();

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };
    const handleDuration = (duration) => {
        setDuration(duration);
    };
    const [volumeSlider, setVolumeSlider] = useState(
        localStorage.getItem("volume")
    );

    const [mute, setMute] = useState(false);
    const handleClickVolume = (e) => {
        if (!mute) {
            setMute(true);
            setVolumeSlider(0);
        } else {
            setMute(false);
            setVolumeSlider(localStorage.getItem("volume"));
        }
    };

    const handleClickPlay = (e) => {
        if (!isPlayingMini) {
            setIsPlayingMini(true);
        } else {
            setIsPlayingMini(false);
        }
        if (isPlaying) {
            dispatch(setIsPlaying(false));
        }
    };
    const handleClickRepeat = (e) => {
        if (isRepeat === "off") {
            setIsRepeat("on");
        } else if (isRepeat === "on") {
            setIsRepeat("off");
        }
    };

    const handleOnEnded = () => {
        if (isRepeat === "on") {
            setIsPlayingMini(true);
            playerRef.current.seekTo(0);
        } else if (isRepeat === "off") {
            // Stop the player or perform any other desired action
            setIsPlayingMini(false);
        }
    };
    const handleOnReady = () => {
        console.log("Song is ready to be played in MiniAudioPlayer");
    };

    return (
        <div className={styles.miniAudioPlayer}>
            <ReactPlayer
                ref={playerRef}
                url={props.dataURL}
                width="0px"
                height="0px"
                playing={isPlayingMini}
                volume={volumeSlider}
                onEnded={handleOnEnded}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onReady={handleOnReady}
            />
            <div className={styles.controllerButtons}>
                <div onClick={(e) => handleClickPlay(e)}>
                    {isPlayingMini ? (
                        <BsFillPauseFill size="30px" className={styles.icon} />
                    ) : (
                        <BsFillPlayFill size="30px" className={styles.icon} />
                    )}
                </div>

                <div onClick={(e) => handleClickRepeat(e)}>
                    {isRepeat === "off" ? (
                        <TbRepeatOff size="20px" className={styles.icon} />
                    ) : (
                        <TbRepeat
                            size="20px"
                            color="#fff"
                            className={styles.icon}
                        />
                    )}
                </div>
                <div className={styles.volumeContainer}>
                    <div
                        className={styles.volumeIcon}
                        onClick={(e) => handleClickVolume(e)}
                    >
                        {mute ? (
                            <GiSpeakerOff
                                size="24px"
                                className={styles.volumeIcon}
                            />
                        ) : (
                            <GiSpeaker
                                size="24px"
                                className={styles.volumeIcon}
                            />
                        )}
                    </div>
                    <div className={styles.volumeControllerContainer}>
                        <div className={styles.volumeController}>
                            <input
                                className={styles.volumeBar}
                                type="range"
                                min="0"
                                value={volumeSlider}
                                max="1"
                                step="0.01"
                                onChange={(e) => {
                                    setVolumeSlider(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.progressBarContainer}>
                <div className={styles.timerLeft}>
                    <Duration seconds={currentTime} />
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    default="0"
                    value={currentTime}
                    className={styles.timeline}
                    step="0.1"
                    onClick={(e) => {
                        playerRef.current.seekTo(currentTime, "seconds");
                    }}
                    onMouseDown={(e) => {
                        setIsPlayingMini(false);
                    }}
                    onChange={(e) => {
                        setCurrentTime(e.target.value);
                        playerRef.current.seekTo(currentTime, "seconds");
                    }}
                    onMouseUp={(e) => {
                        setIsPlayingMini(true);
                    }}
                />

                <div className={styles.timerRight}>
                    <Duration seconds={duration} />
                </div>
            </div>
        </div>
    );
};

export default MiniAudioPlayer;
