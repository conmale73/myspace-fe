import { useState } from "react";
import styles from "./Song(Long).module.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { BsPlayFill } from "react-icons/bs";

import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../../redux/listSong/listSongSlice";
import { addPlaylist } from "../../../redux/playlist/playlistSlice";
import { useSongContext } from "../../../context/SongContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showToast, hideToast } from "../../../redux/toast/toastSlice";
import { Root as ToastRoot } from "@radix-ui/react-toast";
import { playlistService } from "../../../services";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
const LongSong = (props) => {
    const [liked, setLiked] = useState(props?.liked);
    const buttons = props?.buttons;

    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const toast = useSelector((state) => state.toast);
    const playlists = useSelector((state) => state.playlists.data);
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

    const handleRemoveSongFromPlaylist = async () => {
        const res = await playlistService.removeSongFromPlaylist(
            props?.playlist_id,
            props?.videoId
        );
        console.log(res);
        if (res.data.success) {
            dispatch(
                showToast({
                    message: "Remove song from playlist successfully",
                    type: "success",
                })
            );
            props?.setRefetch(true);
        } else {
            dispatch(
                showToast({
                    message: res.data.error,
                    type: "error",
                })
            );
            props?.setRefetch(true);
        }
    };
    const handleClickAddToPlaylist = async (playlist_id) => {
        const res = await playlistService.addSongToPlaylist(
            playlist_id,
            props?.song
        );
        if (res.data.success) {
            dispatch(addPlaylist(res.data.data));
            dispatch(
                showToast({
                    message: "Add to playlist successfully",
                    type: "success",
                })
            );
        } else {
            dispatch(showToast({ message: res.data.error, type: "error" }));
        }
    };
    return (
        <>
            {props != undefined || null ? (
                <>
                    {!props.youtube ? (
                        <div className={styles.longSong} key={props.index}>
                            <div
                                className={styles.imageContainer}
                                title={props?.title}
                            >
                                <img
                                    src={
                                        props?.thumbnails[2]?.url ||
                                        props?.thumbnails[1]?.url ||
                                        props?.thumbnails[0]?.url
                                    }
                                    alt={props?.title}
                                />
                                <div className={styles.playButtonContainer}>
                                    <BsPlayFill
                                        size="30px"
                                        className={styles.playButton}
                                        onClick={(e) => handleClickPlay(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.infoContainer}>
                                <Link
                                    to={`/music/songs/${props?.videoId}`}
                                    className="w-fit h-fit"
                                >
                                    <div className={styles.name}>
                                        {props?.title}
                                    </div>
                                </Link>
                            </div>
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
                            <div className={styles.albumContainer}>
                                <Link to={`/music/albums/${props?.album?.id}`}>
                                    <p className={styles.album}>
                                        {props?.album?.name}
                                    </p>
                                </Link>
                            </div>
                            {buttons && (
                                <div className={styles.buttonsContainer}>
                                    {/* <div
                                className={styles.likeButton}
                                onClick={(e) => handleClickLike(e)}
                            >
                                {liked ? (
                                    <AiFillHeart size="25px" />
                                ) : (
                                    <AiOutlineHeart size="25px" />
                                )}
                            </div> */}
                                    <DropdownMenu.Root modal={false}>
                                        <DropdownMenu.Trigger asChild>
                                            <div
                                                className={styles.optionsButton}
                                            >
                                                <SlOptions size="25px" />
                                            </div>
                                        </DropdownMenu.Trigger>

                                        <DropdownMenu.Content
                                            sideOffset={5}
                                            className="w-[200px] h-fit bg-[#303030] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        >
                                            <div className="flex flex-col w-full h-full gap-[10px]">
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <div className="flex justify-center items-center w-full h-[50px] gap-[10px] hover:bg-[#505050] cursor-pointer">
                                                            <MdOutlinePlaylistAdd size="25px" />
                                                            Add to Playlist
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <Dialog.Portal>
                                                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                                        <Dialog.Content
                                                            className="data-[state=open]:animate-contentShow fixed top-[50%] 
                        left-[50%] max-h-[750px] min-h-[320px] min-w-[400px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-neutral-800 p-[25px] overflow-auto
                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    borderBottom:
                                                                        "1px solid #4d4d4d",
                                                                    paddingBottom:
                                                                        "10px",
                                                                }}
                                                            >
                                                                <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                                                    Save to
                                                                    Playlists
                                                                </Dialog.Title>
                                                                <Dialog.Close
                                                                    asChild
                                                                >
                                                                    <button className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] ">
                                                                        <AiOutlineClose
                                                                            size="25px"
                                                                            color="#9d9d9d"
                                                                        />
                                                                    </button>
                                                                </Dialog.Close>
                                                            </div>
                                                            <div>
                                                                <div className="flex flex-col mt-[10px]">
                                                                    <h3 className="font-bold">
                                                                        All
                                                                        playlists
                                                                    </h3>
                                                                    {playlists &&
                                                                        playlists.map(
                                                                            (
                                                                                playlist,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="flex items-center gap-[10px] p-[5px] mt-[10px] hover:bg-[#505050] cursor-pointer rounded-[5px]"
                                                                                    onClick={() =>
                                                                                        handleClickAddToPlaylist(
                                                                                            playlist._id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {playlist?.songs ? (
                                                                                        <img
                                                                                            src={
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[2]
                                                                                                    ?.url ||
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[1]
                                                                                                    ?.url ||
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[0]
                                                                                                    ?.url
                                                                                            }
                                                                                            alt={
                                                                                                playlist?.title
                                                                                            }
                                                                                            className="rounded-[5px] w-[50px] h-[50px]"
                                                                                        />
                                                                                    ) : (
                                                                                        <img
                                                                                            src="https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
                                                                                            alt={
                                                                                                playlist?.title
                                                                                            }
                                                                                            className="rounded-[5px] w-[50px] h-[50px]"
                                                                                        />
                                                                                    )}

                                                                                    <div className="flex flex-col">
                                                                                        <p className="text-[#e4e6eb] m-0 font-bold">
                                                                                            {
                                                                                                playlist?.title
                                                                                            }
                                                                                        </p>
                                                                                        <p className="text-[#e4e6eb] m-0 text-[12px]">
                                                                                            {playlist
                                                                                                ?.songs
                                                                                                ?.length +
                                                                                                " songs"}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </Dialog.Content>
                                                    </Dialog.Portal>
                                                </Dialog.Root>
                                            </div>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                    {props.isInYourPlaylist && (
                                        <div
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                handleRemoveSongFromPlaylist()
                                            }
                                        >
                                            <RxCross2 size="25px" />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className={styles.durationContainer}>
                                <p className={styles.duration}>
                                    {props?.duration}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.longSong} key={props.index}>
                            <div
                                className={styles.imageContainer}
                                title={props?.title}
                            >
                                <img
                                    src={
                                        props?.thumbnails[2]?.url ||
                                        props?.thumbnails[1]?.url ||
                                        props?.thumbnails[0]?.url
                                    }
                                    alt={props?.title}
                                />
                                <div className={styles.playButtonContainer}>
                                    <BsPlayFill
                                        size="30px"
                                        className={styles.playButton}
                                        onClick={(e) => handleClickPlay(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.infoContainer}>
                                <Link
                                    to={`/music/songs/${props?.videoId}`}
                                    className="w-fit h-fit"
                                >
                                    <div className={styles.name}>
                                        {props?.title}
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.artistList}>
                                {props?.artists?.map((artist, index) => (
                                    <Link to={`/music/artists/${artist.id}`}>
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
                            <div className={styles.albumContainer}>
                                <Link to={`/music/albums/${props?.album?.id}`}>
                                    <p className={styles.album}>
                                        {props?.album?.name}
                                    </p>
                                </Link>
                            </div>
                            {buttons && (
                                <div className={styles.buttonsContainer}>
                                    {/* <div
                                className={styles.likeButton}
                                onClick={(e) => handleClickLike(e)}
                            >
                                {liked ? (
                                    <AiFillHeart size="25px" />
                                ) : (
                                    <AiOutlineHeart size="25px" />
                                )}
                            </div> */}
                                    <DropdownMenu.Root modal={false}>
                                        <DropdownMenu.Trigger asChild>
                                            <div
                                                className={styles.optionsButton}
                                            >
                                                <SlOptions size="25px" />
                                            </div>
                                        </DropdownMenu.Trigger>

                                        <DropdownMenu.Content
                                            sideOffset={5}
                                            className="w-[200px] h-fit bg-[#303030] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        >
                                            <div className="flex flex-col w-full h-full gap-[10px]">
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <div className="flex justify-center items-center w-full h-[50px] gap-[10px] hover:bg-[#505050] cursor-pointer">
                                                            <MdOutlinePlaylistAdd size="25px" />
                                                            Add to Playlist
                                                        </div>
                                                    </Dialog.Trigger>
                                                    <Dialog.Portal>
                                                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                                        <Dialog.Content
                                                            className="data-[state=open]:animate-contentShow fixed top-[50%] 
                        left-[50%] max-h-[750px] min-h-[320px] min-w-[400px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-neutral-800 p-[25px] overflow-auto
                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    borderBottom:
                                                                        "1px solid #4d4d4d",
                                                                    paddingBottom:
                                                                        "10px",
                                                                }}
                                                            >
                                                                <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                                                    Save to
                                                                    Playlists
                                                                </Dialog.Title>
                                                                <Dialog.Close
                                                                    asChild
                                                                >
                                                                    <button className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] ">
                                                                        <AiOutlineClose
                                                                            size="25px"
                                                                            color="#9d9d9d"
                                                                        />
                                                                    </button>
                                                                </Dialog.Close>
                                                            </div>
                                                            <div>
                                                                <div className="flex flex-col mt-[10px]">
                                                                    <h3 className="font-bold">
                                                                        All
                                                                        playlists
                                                                    </h3>
                                                                    {playlists &&
                                                                        playlists.map(
                                                                            (
                                                                                playlist,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="flex items-center gap-[10px] p-[5px] mt-[10px] hover:bg-[#505050] cursor-pointer rounded-[5px]"
                                                                                    onClick={() =>
                                                                                        handleClickAddToPlaylist(
                                                                                            playlist._id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {playlist?.songs ? (
                                                                                        <img
                                                                                            src={
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[2]
                                                                                                    ?.url ||
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[1]
                                                                                                    ?.url ||
                                                                                                playlist
                                                                                                    ?.songs[0]
                                                                                                    ?.thumbnails[0]
                                                                                                    ?.url
                                                                                            }
                                                                                            alt={
                                                                                                playlist?.title
                                                                                            }
                                                                                            className="rounded-[5px] w-[50px] h-[50px]"
                                                                                        />
                                                                                    ) : (
                                                                                        <img
                                                                                            src="https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
                                                                                            alt={
                                                                                                playlist?.title
                                                                                            }
                                                                                            className="rounded-[5px] w-[50px] h-[50px]"
                                                                                        />
                                                                                    )}

                                                                                    <div className="flex flex-col">
                                                                                        <p className="text-[#e4e6eb] m-0 font-bold">
                                                                                            {
                                                                                                playlist?.title
                                                                                            }
                                                                                        </p>
                                                                                        <p className="text-[#e4e6eb] m-0 text-[12px]">
                                                                                            {playlist
                                                                                                ?.songs
                                                                                                ?.length +
                                                                                                " songs"}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </Dialog.Content>
                                                    </Dialog.Portal>
                                                </Dialog.Root>
                                            </div>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                    {props.isInYourPlaylist && (
                                        <div
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                handleRemoveSongFromPlaylist()
                                            }
                                        >
                                            <RxCross2 size="25px" />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className={styles.durationContainer}>
                                <p className={styles.duration}>
                                    {props?.duration}
                                </p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div key={props.index}></div>
            )}
            <ToastRoot
                className=""
                open={toast.show}
                onOpenChange={(open) => {
                    if (open === false) {
                        dispatch(hideToast());
                    }
                }}
            ></ToastRoot>
        </>
    );
};
export default LongSong;
