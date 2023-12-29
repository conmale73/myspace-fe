import clsx from "clsx";
import styles from "./footer.module.scss";
import { useState, useEffect } from "react";
import AudioPlayer from "../AudioPlayer";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useSongContext } from "../../context/SongContext";
import { Link } from "react-router-dom";
import ChatThumbnail from "../Chat/ChatThumbnail";
import ChatContainer from "../Chat/ChatContainer";

function Footer() {
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();
    const soundList =
        useSelector((state) => state.listSongs.list) ||
        localStorage.getItem("listSongs") ||
        [];
    const user = useSelector((state) => state.user.data);
    const currentChatList = useSelector((state) => state.currentChatList.list);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    let currentSongRedux = useSelector((state) => state.listSongs.currentSong);
    const [volumeSlider, setVolumeSlider] = useState(
        localStorage.getItem("volume")
    );
    const [mute, setMute] = useState(false);
    const dispatch = useDispatch();
    const handleClickVolume = (e) => {
        if (!mute) {
            setMute(true);
            setVolumeSlider(0);
        } else {
            setMute(false);
            setVolumeSlider(localStorage.getItem("volume"));
        }
    };

    return (
        <footer className={`${styles.footer}`}>
            {user && (
                <div
                    className="w-[50px] h-fit absolute flex flex-wrap flex-col-reverse 
            bottom-[150px] right-[20px] gap-[25px] "
                >
                    {currentChatList.map((chat, index) => (
                        <ChatThumbnail index={index} chat={chat} />
                    ))}
                </div>
            )}
            {currentChat && (
                <div className="w-fit h-fit absolute bottom-[100px] right-[100px]">
                    <ChatContainer />
                </div>
            )}
            <div className={styles.left}>
                <div className={styles.leftContainer}>
                    <div
                        className={clsx("items-center", styles.imageContainer)}
                    >
                        <img
                            className="object-cover"
                            src={
                                currentSongRedux?.thumbnails[4]?.url ||
                                currentSongRedux?.thumbnails[3]?.url ||
                                currentSongRedux?.thumbnails[2]?.url ||
                                currentSongRedux?.thumbnails[1]?.url ||
                                currentSongRedux?.thumbnails[0]?.url ||
                                "null"
                            }
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <Link to={`/music/songs/${currentSongRedux?.videoId}`}>
                            <div
                                className={styles.name}
                                title={currentSongRedux?.title}
                            >
                                {currentSongRedux?.title}
                            </div>
                        </Link>

                        <div className={styles.artistList}>
                            {currentSongRedux?.artists.map((artist, index) => (
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
                                            currentSongRedux.artists.length -
                                                1 ? (
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
            </div>

            <div className={styles.middle}>
                <AudioPlayer
                    soundList={soundList}
                    currentSongIndex={currentSongIndex}
                    volume={volumeSlider}
                />
            </div>

            <div className={styles.right}>
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
                    <input
                        className={styles.volumeBar}
                        type="range"
                        min="0"
                        value={volumeSlider}
                        max="1"
                        step="0.01"
                        onChange={(e) => {
                            setVolumeSlider(e.target.value);
                            localStorage.setItem("volume", e.target.value);
                        }}
                    />
                </div>
            </div>
        </footer>
    );
}
export default Footer;
