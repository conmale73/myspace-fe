import styles from "./Library.module.scss";
import Singer from "./Artist";
import Playlist from "./Playlist";
import Divider from "../../components/Divider/Divider";

const Library = (props) => {
    document.title = props.title;

    return (
        <div className={styles.library}>
            <h1
                style={{
                    fontWeight: "700",
                    fontSize: "25px",
                }}
            >
                Library
            </h1>
            <Divider />
            <Singer />
            <Playlist />
        </div>
    );
};
export default Library;
