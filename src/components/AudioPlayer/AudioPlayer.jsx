import { useState, useEffect, useRef } from "react";
import styles from "./AudioPlayer.module.scss";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import ReactPlayer from "react-player/youtube";
import Duration from "../Duration";
import { useSongContext } from "../../context/SongContext";
import { useDispatch, useSelector } from "react-redux";
import {
    changeCurrentSong,
    setIsPlaying,
} from "../../redux/listSong/listSongSlice";

const AudioPlayer = (props) => {
    const isPlaying = useSelector((state) => state.listSongs.isPlaying);
    const [isRepeat, setIsRepeat] = useState("off");
    const [isRandom, setIsRandom] = useState(false);
    const [loop, setLoop] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loaded, setLoaded] = useState(0);

    const playerRef = useRef(null);
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();
    const [currentSong, setCurrentSong] = useState(
        props.soundList[currentSongIndex]
    );

    const dispatch = useDispatch();
    let currentSongRedux = useSelector((state) => state.listSongs.currentSong);

    useEffect(() => {
        dispatch(changeCurrentSong(currentSong));
    }, [currentSong]);

    const playNextSong = () => {
        if (isRandom) {
            const nextSongIndex = Math.floor(
                Math.random() * props.soundList.length
            );
            setCurrentSongIndex(nextSongIndex);
            dispatch(setIsPlaying(true));
        } else {
            const nextSongIndex =
                (currentSongIndex + 1) % props.soundList.length;
            setCurrentSongIndex(nextSongIndex);
            dispatch(setIsPlaying(true));
        }
    };
    const playPrevSong = () => {
        if (isRandom) {
            const prevSongIndex = Math.floor(
                Math.random() * props.soundList.length
            );
            setCurrentSongIndex(prevSongIndex);
            dispatch(setIsPlaying(true));
        } else {
            const previousSongIndex =
                (currentSongIndex - 1 + props.soundList.length) %
                props.soundList.length;
            setCurrentSongIndex(previousSongIndex);
            playerRef.current.url = currentSongRedux?.url;
            dispatch(setIsPlaying(true));
        }
    };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };
    const handleDuration = (duration) => {
        setDuration(duration);
    };
    const handleClickRandom = (e) => {
        if (isRandom === false) {
            setIsRandom(true);
        } else {
            setIsRandom(false);
        }
    };
    const handleClickPlay = (e) => {
        console.log("currentSong: ", currentSong);
        console.log("currentSongRedux: ", currentSongRedux);

        if (!isPlaying) {
            dispatch(setIsPlaying(true));
        } else {
            dispatch(setIsPlaying(false));
        }
    };
    const handleClickRepeat = (e) => {
        if (isRepeat === "off") {
            setIsRepeat("once");
        } else if (isRepeat === "once") {
            setIsRepeat("all");
        } else {
            setIsRepeat("off");
        }
    };
    const handleClickNext = () => {
        playNextSong();
    };
    const handleClickPrev = () => {
        if (currentTime > 5) {
            playerRef.current.seekTo(0);
            setCurrentTime(0);
        } else if (currentTime < 5) {
            playPrevSong();
        }
    };
    const handleOnEnded = () => {
        const isLastSong = currentSongIndex + 1 === props.soundList.length;
        if (isRepeat === "once") {
            dispatch(setIsPlaying(true));
            playerRef.current.seekTo(0);
        } else if (isRepeat === "all") {
            dispatch(setIsPlaying(true));
            playNextSong();
        } else if (isRepeat === "off" && isLastSong && !isRandom) {
            // Stop the player or perform any other desired action
            dispatch(setIsPlaying(false));
        } else {
            playNextSong();
        }
    };
    const handleOnReady = () => {
        console.log("Song is ready to be played");
    };

    useEffect(() => {
        localStorage.setItem("currentSongIndex", currentSongIndex);
        setCurrentSong(props.soundList[currentSongIndex]);
    }, [currentSongIndex]);
    return (
        <div className={styles.audioPlayer}>
            <ReactPlayer
                ref={playerRef}
                url={currentSongRedux?.url}
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 },
                        embedOptions: { showinfo: 1 },
                    },
                }}
                width="0px"
                height="0px"
                loop={loop}
                playing={isPlaying}
                volume={props.volume}
                onEnded={handleOnEnded}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onReady={handleOnReady}
            />
            <div className={styles.controllerButtons}>
                <div onClick={(e) => handleClickRandom(e)}>
                    {isRandom ? (
                        <FaRandom size="24px" className={styles.icon} />
                    ) : (
                        <FaRandom size="24px" className={styles.icon} />
                    )}
                </div>

                <div onClick={(e) => handleClickPrev(e)}>
                    <BiSkipPrevious size="30px" className={styles.icon} />
                </div>
                <div onClick={(e) => handleClickPlay(e)}>
                    {isPlaying ? (
                        <BsFillPauseFill size="50px" className={styles.icon} />
                    ) : (
                        <BsFillPlayFill size="50px" className={styles.icon} />
                    )}
                </div>

                <div
                    onClick={(e) => {
                        handleClickNext(e);
                    }}
                >
                    <BiSkipNext size="30px" className={styles.icon} />
                </div>
                <div onClick={(e) => handleClickRepeat(e)}>
                    {isRepeat === "off" ? (
                        <TbRepeatOff size="24px" className={styles.icon} />
                    ) : isRepeat === "once" ? (
                        <TbRepeatOnce
                            size="24px"
                            color="#fff"
                            className={styles.icon}
                        />
                    ) : (
                        <TbRepeat
                            size="24px"
                            color="#fff"
                            className={styles.icon}
                        />
                    )}
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
                        dispatch(setIsPlaying(false));
                    }}
                    onChange={(e) => {
                        setCurrentTime(e.target.value);
                        playerRef.current.seekTo(currentTime, "seconds");
                    }}
                    onMouseUp={(e) => {
                        dispatch(setIsPlaying(true));
                    }}
                />

                <div className={styles.timerRight}>
                    <Duration seconds={duration} />
                </div>
            </div>
        </div>
    );
};
export default AudioPlayer;
