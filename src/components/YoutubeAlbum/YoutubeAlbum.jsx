import styles from "./YoutubeAlbum.module.scss";
import { Link } from "react-router-dom";
const AlbumComponent = (props) => {
    return (
        <Link
            to={`/music/album/youtube/${props?.browseId}`}
            key={props?.browseId}
        >
            <div className={styles.album}>
                <div className={styles.albumImage}>
                    <img
                        src={
                            props?.thumbnails[2]?.url ||
                            props?.thumbnails[1]?.url ||
                            props?.thumbnails[0]?.url ||
                            "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
                        }
                        alt=""
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.albumName} title={props?.title}>
                        {props?.title}
                    </div>

                    <div className={styles.creator}>{props?.year}</div>
                </div>
            </div>
        </Link>
    );
};
export default AlbumComponent;
