import styles from "./ArtistDetail.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { browseService } from "../../services";
import Loading from "../../components/Loading";
import LongSong from "../../components/Song/SongLong";
import { Link } from "react-router-dom";
import YoutubeListPlaylists from "../../components/ListComponent/YoutubeListPlaylists";
import ListSongs from "../../components/ListComponent/YoutubeListSongs";
import Artist from "../../components/Artist";
import { useQuery, useMutation } from "@tanstack/react-query";

const ArtistDetail = (props) => {
    const { id } = useParams();
    const [more, setMore] = useState(false);

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["artistDetail", id],
        queryFn: () => browseService.getArtist(id).then((res) => res.data),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;
    const handleClickShowMore = (e) => {
        e.preventDefault();
        setMore(!more);
    };
    return (
        <div className={styles.artistDetail}>
            <div className={styles.bigThumbnail}>
                <div
                    className={styles.overlay}
                    style={more ? { height: "100%" } : { height: "80%" }}
                ></div>
                <img src={data?.thumbnails[2].url} alt={data?.name} />
                <div className={styles.description}>
                    <div className={styles.artistName}>{data?.name}</div>
                    <p className={more ? styles.more : styles.less}>
                        {data?.description}
                    </p>
                    <div
                        className={styles.readMore}
                        onClick={(e) => handleClickShowMore(e)}
                    >
                        {more ? "Show less" : "Show more"}
                    </div>
                </div>
            </div>
            <div className={styles.listSongs}>
                <div className={styles.title}>Songs</div>
                <>
                    {data?.songs?.results?.map((song, index) => {
                        return (
                            <LongSong
                                key={index}
                                videoId={song?.videoId}
                                title={song?.title}
                                artists={song?.artists}
                                thumbnails={song?.thumbnails}
                                album={song?.album}
                                duration={song?.duration}
                                category={song?.category}
                                liked={song?.liked}
                                buttons={false}
                            />
                        );
                    })}
                </>
                {data?.songs?.browseId && (
                    <div className={styles.showAllButton}>
                        <Link
                            to={`/music/playlist/youtube/${data?.songs?.browseId}`}
                        >
                            Show all
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles.listAlbums}>
                <div className={styles.title}>Albums</div>
                <>
                    <YoutubeListPlaylists
                        isSlidePlaylist={true}
                        playlists={data?.albums?.results}
                        uniqueId={`playlist-swiper-0`}
                    />
                </>
                {data?.albums?.browseId && (
                    <div className={styles.showAllButton}>
                        <Link to={``}>Show all</Link>
                    </div>
                )}
            </div>
            <div className={styles.listSingles}>
                <div className={styles.title}>Singles</div>
                <>
                    <ListSongs
                        isSlideSong={true}
                        songs={data?.singles.results}
                        uniqueId={`song-swiper-0`}
                    />
                </>
                {data?.singles?.browseId && (
                    <div className={styles.showAllButton}>
                        <Link to={``}>Show all</Link>
                    </div>
                )}
            </div>
            <div className={styles.relatedArtists}>
                <div className={styles.title}>Fans might also like</div>
                <div className={styles.relatedArtist}>
                    {data?.related.results.map((artist, index) => {
                        return (
                            <Artist
                                key={index}
                                id={artist?.browseId}
                                name={artist?.title}
                                thumbnails={artist?.thumbnails}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default ArtistDetail;
