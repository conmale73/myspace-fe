import styles from "./HomeModules.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShortSmallSong from "../../../components/Song/SongShortSmall";
import YoutubeListPlaylists from "../../../components/ListComponent/YoutubeListPlaylists";
import YoutubeListSongs from "../../../components/ListComponent/YoutubeListSongs";
import YoutubeListAlbum from "../../../components/ListComponent/YoutubeListAlbum";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeModules = (props) => {
    const [contents, setContents] = useState(props.data);

    return (
        <>
            {contents.map((content, index) => (
                <div className={styles.homeModules} key={index}>
                    <div className={styles.homeModules__title}>
                        {content.title}
                    </div>
                    <div className={styles.contents}>
                        {index == 0 ? ( // Quick Picks
                            <div className={styles.quickPicks}>
                                <div className={styles.quickPicksItemsWrapper}>
                                    <div className={styles.quickPicksItems}>
                                        {content.contents.map((item, index) => (
                                            <div key={index}>
                                                <ShortSmallSong item={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.content}>
                                {content?.contents[0]?.playlistId && (
                                    <YoutubeListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content?.contents}
                                        uniqueId={`playlist-swiper-${index}`} // Pass a unique ID for each Swiper
                                    />
                                )}
                                {content?.contents[0]?.browseId && (
                                    <YoutubeListAlbum
                                        isSlideAlbum={true}
                                        albums={content?.contents}
                                        uniqueId={`album-swiper-${index}`} // Pass a unique ID for each Swiper
                                    />
                                )}
                                {content?.contents[0]?.videoId && (
                                    <YoutubeListSongs
                                        isSlideSong={true}
                                        songs={content?.contents}
                                        uniqueId={`song-swiper-${index}`} // Pass a unique ID for each Swiper
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};
export default HomeModules;
