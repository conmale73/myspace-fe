import styles from "./Artist.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Artist = (props) => {
    return (
        <div className={styles.artist}>
            <Link to={`/music/artists/${props?.id}`}>
                <div className={styles.artist__thumbnail}>
                    <img src={props?.thumbnails[1].url} alt={props?.name} />
                </div>
            </Link>
            <Link to={`/music/artists/${props?.id}`}>
                <div className={styles.artist__name}>{props?.name}</div>
            </Link>
        </div>
    );
};
export default Artist;
