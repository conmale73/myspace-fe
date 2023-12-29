import styles from "./SongRelated.module.scss";
import { songService } from "../../../services";
import { useState, useEffect, Suspense } from "react";
import LongSong from "../../../components/Song/SongLong";
import Loading from "../../../components/Loading";

const SongRelated = (props) => {
    const [songsRelated, setSongsRelated] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchSongRelated() {
        try {
            const res = await songService.getSongRelated(props.id);
            setSongsRelated(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSongRelated();
        if (songsRelated != undefined || null) {
            setLoading(true);
        }
    }, [props.id]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.songRelated}>
                    <div className={styles.listSongBody}>
                        {songsRelated?.map((item, index) => (
                            <Suspense fallback={<Loading />}>
                                <LongSong
                                    key={index}
                                    index={index}
                                    videoId={item?.videoId}
                                    title={item?.title}
                                    artists={item?.artists}
                                    thumbnails={item?.thumbnails}
                                    album={item?.album}
                                    buttons={false}
                                />
                            </Suspense>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default SongRelated;
