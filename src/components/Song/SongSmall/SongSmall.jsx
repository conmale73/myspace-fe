import React, { useState, useRef, useEffect } from "react";
import styles from "./Song(Small).module.scss";
import clsx from "clsx";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useSongContext } from "../../../context/SongContext";
import * as ContextMenu from "@radix-ui/react-context-menu";
import "./SongContextMenu.css";

import {
    removeSong,
    changeCurrentSong,
    setIsPlaying,
    clearListSong,
} from "../../../redux/listSong/listSongSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowFooter } from "../../../redux/showFooter/showFooterSlice";
const SmallSong = (props) => {
    const [list, setList] = useState(
        JSON.parse(localStorage.getItem("listSong"))
    );
    const {
        currentSongIndex,
        setCurrentSongIndex,
        currentSong,
        setCurrentSong,
    } = useSongContext();
    const isPlaying = useSelector((state) => state.listSongs.isPlaying);

    const dispatch = useDispatch();
    let currentSongRedux = useSelector((state) => state.listSongs.currentSong);

    useEffect(() => {
        setCurrentSong(currentSongRedux);
    }, [currentSongRedux]);

    const handleClickPlay = () => {
        const song = list.find((song) => song.videoId === props.videoId);
        setCurrentSong(song);
        setCurrentSongIndex(list.indexOf(song));
        if (!isPlaying) {
            dispatch(setIsPlaying(true)); // Start playing the song
        }
        dispatch(setShowFooter(true));
    };
    const handleClickPause = () => {
        dispatch(setIsPlaying(false));
    };
    const playingSongStyle = "#555555";

    const handleRemoveFromPlaylist = (e) => {
        try {
            dispatch(removeSong(props.videoId));
            if (props.videoId === currentSong.videoId && currentSongIndex > 0) {
                dispatch(changeCurrentSong(list[currentSongIndex - 1]));
                setCurrentSongIndex(currentSongIndex - 1);
                setCurrentSong(currentSongRedux);
            } else if (
                props.videoId === currentSong.videoId &&
                currentSongIndex === 0
            ) {
                setCurrentSongIndex(0);
                dispatch(changeCurrentSong(list[currentSongIndex]));
                setCurrentSong(currentSongRedux);
                dispatch(setIsPlaying(false));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClearPlaylist = (e) => {
        try {
            dispatch(clearListSong());
        } catch (err) {
            console.log(err);
        }
    };
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const [person, setPerson] = useState("pedro");

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <div
                        className={clsx(`${styles.smallSong}`)}
                        title={props.title}
                        style={{
                            backgroundColor:
                                props.videoId === currentSong?.videoId
                                    ? playingSongStyle
                                    : null,
                        }}
                    >
                        <div className={styles.songImageContainer}>
                            <img
                                className={styles.songImage}
                                src={props?.thumbnails[0].url}
                            />
                            <div className={styles.playButtonContainer}>
                                {isPlaying &&
                                props.videoId === currentSong?.videoId ? (
                                    <BsFillPauseFill
                                        size="30px"
                                        className={styles.playButton}
                                        title={"Pause " + props.title}
                                        onClick={handleClickPause}
                                    />
                                ) : (
                                    <BsFillPlayFill
                                        size="30px"
                                        className={styles.playButton}
                                        title={"Play " + props.title}
                                        onClick={handleClickPlay}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.info}>
                            <Link to={`/music/songs/${props.videoId}`}>
                                <div className={styles.songName}>
                                    {props.title}
                                </div>
                            </Link>
                            <div
                                className={styles.artistList}
                                title={props.artists}
                            >
                                {props.artists?.map((artist, index) => (
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
                                                props.artists.length - 1 ? (
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
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content
                        className="ContextMenuContent"
                        sideOffset={5}
                        align="end"
                    >
                        <ContextMenu.Item
                            className="ContextMenuItem"
                            onClick={(e) => handleRemoveFromPlaylist(e)}
                        >
                            Remove From Playlist
                        </ContextMenu.Item>

                        {/* <ContextMenu.Sub>
                            <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
                                More Tools
                                <div className="RightSlot">
                                    
                                </div>
                            </ContextMenu.SubTrigger>
                            <ContextMenu.Portal>
                                <ContextMenu.SubContent
                                    className="ContextMenuSubContent"
                                    sideOffset={2}
                                    alignOffset={-5}
                                >
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Save Page As…{" "}
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Create Shortcut…
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Name Window…
                                    </ContextMenu.Item>
                                    <ContextMenu.Separator className="ContextMenuSeparator" />
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Developer Tools
                                    </ContextMenu.Item>
                                </ContextMenu.SubContent>
                            </ContextMenu.Portal>
                        </ContextMenu.Sub>

                        <ContextMenu.Separator className="ContextMenuSeparator" />

                        <ContextMenu.CheckboxItem
                            className="ContextMenuCheckboxItem"
                            checked={bookmarksChecked}
                            onCheckedChange={setBookmarksChecked}
                        >
                            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                
                            </ContextMenu.ItemIndicator>
                            Show Bookmarks <div className="RightSlot">⌘+B</div>
                        </ContextMenu.CheckboxItem>
                        <ContextMenu.CheckboxItem
                            className="ContextMenuCheckboxItem"
                            checked={urlsChecked}
                            onCheckedChange={setUrlsChecked}
                        >
                            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                
                            </ContextMenu.ItemIndicator>
                            Show Full URLs
                        </ContextMenu.CheckboxItem>

                        <ContextMenu.Separator className="ContextMenuSeparator" />

                        <ContextMenu.Label className="ContextMenuLabel">
                            People
                        </ContextMenu.Label>
                        <ContextMenu.RadioGroup
                            value={person}
                            onValueChange={setPerson}
                        >
                            <ContextMenu.RadioItem
                                className="ContextMenuRadioItem"
                                value="pedro"
                            >
                                <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                    
                                </ContextMenu.ItemIndicator>
                                Pedro Duarte
                            </ContextMenu.RadioItem>
                            <ContextMenu.RadioItem
                                className="ContextMenuRadioItem"
                                value="colm"
                            >
                                <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                    
                                </ContextMenu.ItemIndicator>
                                Colm Tuite
                            </ContextMenu.RadioItem>
                        </ContextMenu.RadioGroup> */}
                        <ContextMenu.Item
                            className="ContextMenuItem"
                            onClick={(e) => handleClearPlaylist(e)}
                        >
                            Clear Playlist
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </>
    );
};

export default SmallSong;
