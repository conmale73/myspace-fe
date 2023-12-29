import styles from "./SongDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { MdOutlinePlaylistAdd } from "react-icons/md";

import { songService, playlistService } from "../../services";
import { Suspense, lazy, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
const LongSong = lazy(() => import("../../components/Song/SongLong"));
import SongRelated from "./SongRelated";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../redux/listSong/listSongSlice";
import { showToast, hideToast } from "../../redux/toast/toastSlice";
import { addPlaylist } from "../../redux/playlist/playlistSlice";
import { useSongContext } from "../../context/SongContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
const SongDetail = (props) => {
    let { id } = useParams();

    const playlists = useSelector((state) => state.playlists.data);
    const [song, setSong] = useState();

    const toast = useSelector((state) => state.toast);

    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();

    const fetchData = async () => {
        const res = await songService.getYoutubeSongMetadata(id);
        setSong(res.data);
        return res.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["songDetail", id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    const songToAdd = {
        videoId: song?.videoId,
        title: song?.title,
        album: song?.album,
        thumbnails: song?.thumbnails,
        url: "https://www.youtube.com/watch?v=" + song?.videoId,
        artists: song?.artists,
        duration: song?.duration,
    };

    const handleClickPlay = (e) => {
        e.preventDefault();
        if (dispatch(addSong(songToAdd)) && songsList.length === 0) {
            console.log("add to now playing: ", songToAdd);
            dispatch(changeCurrentSong(songToAdd));
            setCurrentSongIndex(0);
            setCurrentSong(songToAdd);
        }
    };

    const handleClickAddToPlaylist = async (playlist_id, song) => {
        const res = await playlistService.addSongToPlaylist(playlist_id, song);
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
        <div className={styles.songDetail}>
            <div className={styles.selectedSong}>
                <div className={styles.songImage}>
                    <img
                        src={
                            song?.thumbnails[3]?.url ||
                            song?.thumbnails[2]?.url ||
                            song?.thumbnails[1]?.url ||
                            song?.thumbnails[0]?.url
                        }
                        alt={song?.title}
                    />

                    <BsPlayCircle
                        size="40px"
                        className={styles.imagePlayButton}
                        onClick={(e) => handleClickPlay(e)}
                    />
                </div>
                <div className={styles.songInfo}>
                    <div className={styles.songName}>{song?.title}</div>
                    <div className={styles.artistList}>
                        {song?.artists?.map((artist, index) => (
                            <Link
                                to={`/music/artists/${artist.id}`}
                                key={index}
                            >
                                <p
                                    key={index}
                                    className={styles.artist}
                                    title={artist.name}
                                >
                                    {artist.name}
                                    {index < song?.artists.length - 1 ? (
                                        <span> </span>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div
                        className={styles.playButton}
                        onClick={(e) => handleClickPlay(e)}
                    >
                        <BsFillPlayFill
                            size="30px"
                            className={styles.playIcon}
                        />
                        <p className={styles.playText}>Play</p>
                    </div>
                    <div className={styles.toolButtons}>
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
                                <div className={styles.optionsButton}>
                                    <SlOptions
                                        size="25px"
                                        className={styles.optionsButton}
                                    />
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
                                                        display: "flex",
                                                        borderBottom:
                                                            "1px solid #4d4d4d",
                                                        paddingBottom: "10px",
                                                    }}
                                                >
                                                    <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                                        Save to Playlists
                                                    </Dialog.Title>
                                                    <Dialog.Close asChild>
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
                                                            All playlists
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
                                                                                playlist._id,
                                                                                song
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
                    </div>
                </div>
            </div>

            <div className={styles.listSong}>
                <div className={styles.selectedSongList}>
                    <Suspense fallback={<Loading />}>
                        <LongSong
                            videoId={song?.videoId}
                            title={song?.title}
                            artists={song?.artists}
                            thumbnails={song?.thumbnails}
                            album={song?.album}
                        />
                    </Suspense>
                </div>
                <p className={styles.para}>YOU MAY LIKE</p>
                <div className={styles.listSongBody}>
                    <SongRelated id={song?.videoId} />
                </div>
            </div>
            <Toast.Root
                className=""
                open={toast.show}
                onOpenChange={(open) => {
                    if (open === false) {
                        dispatch(hideToast());
                    }
                }}
            ></Toast.Root>
        </div>
    );
};
export default SongDetail;
