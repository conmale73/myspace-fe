import styles from "./PlaylistDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { MdOutlineLibraryAdd, MdEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { playlistService } from "../../services";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Loading from "../../components/Loading";
import LongSong from "../../components/Song/SongLong";

import {
    addSong,
    removeSong,
    changeCurrentSong,
    clearListSong,
} from "../../redux/listSong/listSongSlice";
import { useSongContext } from "../../context/SongContext";
import { useQuery, useMutation } from "@tanstack/react-query";

const PlaylistDetail = (props) => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const user = useSelector((state) => state.user.data);
    const [playlist, setPlaylist] = useState();
    const [isSaved, setIsSaved] = useState(false);
    const isYourPlaylist = playlist?.creator?._id === user._id;
    const [refetch, setRefetch] = useState(false);
    const fetchData = async () => {
        const res = await playlistService.getPlaylistById(id, user._id);
        setPlaylist(res.data.data);
        if (res.data.data?.saved?.includes(user._id)) setIsSaved(true);
        return res.data;
    };

    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
    } = useSongContext();

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["playlistDetail", id],
        queryFn: () => fetchData(),
    });

    useEffect(() => {
        if (refetch == true) {
            fetchData();
            setRefetch(false);
        }
    }, [refetch]);
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    const handleClickPlay = (e) => {
        let index = 0;
        dispatch(clearListSong());
        while (index < playlist?.songs?.length) {
            const songToAdd = {
                videoId: playlist?.songs[index]?.videoId,
                title: playlist?.songs[index]?.title,
                album: playlist?.songs[index]?.album,
                thumbnails: playlist?.songs[index]?.thumbnails,
                url:
                    "https://www.youtube.com/watch?v=" +
                    playlist?.songs[index]?.videoId,
                artists: playlist?.songs[index]?.artists,
                category: playlist?.songs[index]?.category,
                duration: playlist?.songs[index]?.duration,
            };
            dispatch(addSong(songToAdd));
            index++;
        }
        dispatch(changeCurrentSong(playlist?.songs[0]));
        setCurrentSongIndex(0);
        setCurrentSong(playlist?.songs[0]);
        setIsPlaying(true);
    };

    const handleSavePlaylist = async () => {
        try {
            const res = await playlistService.savePlaylistToLibrary(
                user._id,
                id
            );
            playlist.saved.push(user._id);
            setIsSaved(true);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    const handleRemovePlaylist = async () => {
        try {
            const res = await playlistService.removePlaylistFromLibrary(
                user._id,
                id
            );
            playlist.saved = playlist.saved.filter((item) => item !== user._id);
            setIsSaved(false);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {data?.success == false ? (
                <div className="text-center text-[30px] text-gray-300 mt-4">
                    {data?.error}
                </div>
            ) : (
                <>
                    {playlist && (
                        <div className={styles.playlistDetail}>
                            <div className={styles.playlistInfo}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={
                                            playlist?.songs[0]?.thumbnails[2]
                                                ?.url ||
                                            playlist?.songs[0]?.thumbnails[1]
                                                ?.url ||
                                            playlist?.songs[0]?.thumbnails[0]
                                                ?.url ||
                                            "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
                                        }
                                    />
                                </div>
                                <div className={styles.infoContainer}>
                                    <p className={styles.title}>
                                        {playlist?.title}
                                    </p>
                                    <div className={styles.metadata}>
                                        <div className={styles.row}>
                                            <span className={styles.text}>
                                                Playlist
                                            </span>
                                            <span className={styles.dot}>
                                                •
                                            </span>
                                            {playlist?.creator ? (
                                                <Link
                                                    to={`/profile/${playlist?.creator?._id}`}
                                                >
                                                    <span
                                                        className={`${styles.text} ${styles.underline}`}
                                                    >
                                                        {
                                                            playlist?.creator
                                                                ?.username
                                                        }
                                                    </span>
                                                </Link>
                                            ) : (
                                                <span className={styles.text}>
                                                    {
                                                        playlist?.creator
                                                            ?.username
                                                    }
                                                </span>
                                            )}

                                            <span className={styles.dot}>
                                                •
                                            </span>
                                            <span className={styles.text}>
                                                {moment(
                                                    playlist?.createAt
                                                ).format("YYYY")}
                                            </span>
                                        </div>
                                        <div className={styles.row}>
                                            {playlist?.views != null && (
                                                <>
                                                    <span
                                                        className={styles.text}
                                                    >
                                                        {`${playlist?.views}k views`}
                                                    </span>
                                                    <span
                                                        className={styles.dot}
                                                    >
                                                        •
                                                    </span>
                                                </>
                                            )}

                                            <span className={styles.text}>
                                                {`${playlist?.songs.length} songs`}
                                            </span>
                                            <span className={styles.dot}>
                                                •
                                            </span>
                                            <span className={styles.text}>
                                                Last update:{" "}
                                                {moment(
                                                    playlist?.updateAt
                                                ).format("DD/MM/YYYY")}
                                            </span>
                                        </div>
                                        <div className={styles.description}>
                                            {playlist?.description}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <div
                                        className={styles.playButton}
                                        onClick={(e) => handleClickPlay(e)}
                                    >
                                        <BsFillPlayFill
                                            className={styles.playIcon}
                                        />
                                        <p className={styles.playText}>Play</p>
                                    </div>
                                    {playlist?.creator?._id === user._id && (
                                        <div className={styles.editButton}>
                                            <MdEdit
                                                className={styles.editIcon}
                                            />
                                            <p className={styles.editText}>
                                                Edit Playlist
                                            </p>
                                        </div>
                                    )}

                                    {playlist?.creator?._id != user._id &&
                                        isSaved && (
                                            <div
                                                className={styles.removeButton}
                                                onClick={handleRemovePlaylist}
                                            >
                                                <MdOutlineLibraryAdd
                                                    className={
                                                        styles.removeIcon
                                                    }
                                                />
                                                <p
                                                    className={
                                                        styles.removeText
                                                    }
                                                >
                                                    Remove from Library
                                                </p>
                                            </div>
                                        )}
                                    {playlist?.creator?._id != user._id &&
                                        !isSaved && (
                                            <div
                                                className={styles.saveButton}
                                                onClick={handleSavePlaylist}
                                            >
                                                <MdOutlineLibraryAdd
                                                    className={styles.saveIcon}
                                                />
                                                <p className={styles.saveText}>
                                                    Save to Library
                                                </p>
                                            </div>
                                        )}
                                    <div className="flex justify-center items-center rounded-full cursor-pointer hover:bg-[#606060]">
                                        <SlOptionsVertical className="w-[40px] h-[30px] p-[5px] " />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.listSong}>
                                <div className={styles.listSongBody}>
                                    {playlist?.songs?.map((item, index) => {
                                        return (
                                            <LongSong
                                                song={item}
                                                key={index}
                                                videoId={item?.videoId}
                                                title={item?.title}
                                                album={item?.album}
                                                artists={item?.artists}
                                                duration={item?.duration}
                                                thumbnails={item?.thumbnails}
                                                buttons={true}
                                                isInYourPlaylist={
                                                    isYourPlaylist
                                                }
                                                youtube={false}
                                                playlist_id={playlist?._id}
                                                refetch={refetch}
                                                setRefetch={setRefetch}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default PlaylistDetail;
