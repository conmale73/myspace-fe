import styles from "./SearchResult.module.scss";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import Divider from "../../components/Divider";
import SongsSearchResult from "./Songs";
import PlaylistsSearchResult from "./Playlists";
import UserSearchResults from "./Users/UsersSearchResults";
import { useSelector, useDispatch } from "react-redux";

const SearchResult = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    document.title = "Search results for " + query;
    const [tab, setTab] = useState(0);
    const activeTabStyle = "underline";

    return (
        <div className={styles.searchResult}>
            <div className={clsx(styles.topBar)}>
                <h1
                    style={{
                        display: "inline-block",
                        fontWeight: "700",
                        fontSize: "25px",
                    }}
                >
                    Search Results
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
                    <div
                        onClick={() => setTab(2)}
                        className={clsx(
                            "inline-block items-center cursor-pointer"
                        )}
                    >
                        <p
                            className={clsx(
                                styles.tab,
                                "text-3xl font-medium underline-offset-4",
                                2 === tab && activeTabStyle
                            )}
                        >
                            Users
                        </p>
                    </div>
                </div>
            </div>
            <Divider />
            <div style={{ width: "100%" }}>
                {tab === 0 && <SongsSearchResult query={query} />}
                {tab === 1 && <PlaylistsSearchResult query={query} />}
                {tab === 2 && <UserSearchResults query={query} />}
            </div>
        </div>
    );
};
export default SearchResult;
