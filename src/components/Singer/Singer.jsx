import styles from "./Singer.module.scss";
import { Link } from "react-router-dom";

const SingerComponent = (props) => {
    return (
        <Link to={`/music/${props.category}/${props.slug}`}>
            <div className={styles.singer}>
                <div className={styles.singerImage}>
                    <img src={props.image} />
                </div>
                <div className={styles.info}>
                    <div className={styles.singerName}>{props.singerName}</div>
                </div>
            </div>
        </Link>
    );
};

export default SingerComponent;
