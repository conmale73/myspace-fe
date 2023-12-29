import clsx from "clsx";
import styles from "./History.module.scss";
import { useState, useRef } from "react";
import SongsHistory from "./SongsHistory";
import PlaylistsHistory from "./PlaylistsHistory";
import Divider from "../../components/Divider";

const History = (props) => {
    document.title = props.title;
    const [tab, setTab] = useState(0);
    const activeTabStyle = "underline";
    return (
        <div className={styles.history}>
            <div className={clsx(styles.topBar)}>
                <h1
                    style={{
                        display: "inline-block",
                        fontWeight: "700",
                        fontSize: "25px",
                    }}
                >
                    History
                </h1>
                <div className={styles.tabs}>
                    <div
                        onClick={() => setTab(0)}
                        className={clsx(
                            "inline-block items-center cursor-pointer w-fit"
                        )}
                    >
                        <p
                            className={clsx(
                                styles.tab,
                                "text-3xl font-medium underline-offset-4 w-fit",
                                0 === tab && activeTabStyle
                            )}
                        >
                            Songs
                        </p>
                    </div>
                    <div
                        onClick={() => setTab(1)}
                        className={clsx(
                            "inline-block items-center cursor-pointer"
                        )}
                    >
                        <p
                            className={clsx(
                                styles.tab,
                                "text-3xl font-medium underline-offset-4",
                                1 === tab && activeTabStyle
                            )}
                        >
                            Playlists
                        </p>
                    </div>
                </div>
            </div>
            <Divider />
            <div style={{ width: "100%" }}>
                {tab === 0 ? <SongsHistory /> : <PlaylistsHistory />}
            </div>
        </div>
    );
};
export default History;
