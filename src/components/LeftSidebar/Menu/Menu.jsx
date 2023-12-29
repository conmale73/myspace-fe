import "./Menu.scss";
import { BiLibrary, BiHistory } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { playlistService } from "../../../services";
import { FaUserFriends } from "react-icons/fa";
import { BsCalendarEventFill, BsBox } from "react-icons/bs";
import { MdOutlineGroups2, MdOutlinePlaylistPlay } from "react-icons/md";
import { PiPlaylistFill } from "react-icons/pi";
import { CgFeed } from "react-icons/cg";
import {
    AiFillHome,
    AiFillHeart,
    AiOutlineLineChart,
    AiFillStar,
} from "react-icons/ai";

import {
    setPlaylists,
    getPlaylists,
} from "../../../redux/playlist/playlistSlice";
const Menu = () => {
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);
    const extendMode = useSelector((state) => state.mode.extend);
    const playlists = useSelector((state) => state.playlists.data);

    const dispatch = useDispatch();
    const fetchData = async () => {
        if (user === null) return;
        const res = await playlistService.getAllPlaylistsByUserID(user._id);

        dispatch(setPlaylists(res.data.data));
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["menuPlaylist", user?._id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <></>;
    return (
        <>
            {user ? (
                <>
                    {extendMode === "groups" ? (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/social/groups/joined/">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Your Groups
                                            </div>
                                        </div>
                                    </Link>
                                    {/* <Link to="/music/library">
                                        <div className="button">
                                            <div className="icon">
                                                <BiLibrary
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Library</div>
                                        </div>
                                    </Link>
                                    <Link to="/music/history">
                                        <div className="button">
                                            <div className="icon">
                                                <BiHistory
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">History</div>
                                        </div>
                                    </Link> */}
                                    {/* <Link to="/music/library#likes">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHeart
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Liked Songs
                                            </div>
                                        </div>
                                    </Link> */}
                                </div>
                            </div>
                        </>
                    ) : null}
                    {mode === "music" ? (
                        <>
                            {/* Music routes */}
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/home">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                    {/* <Link to="/music/library">
                                        <div className="button">
                                            <div className="icon">
                                                <BiLibrary
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Library</div>
                                        </div>
                                    </Link>
                                    <Link to="/music/history">
                                        <div className="button">
                                            <div className="icon">
                                                <BiHistory
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">History</div>
                                        </div>
                                    </Link> */}
                                    {/* <Link to="/music/library#likes">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHeart
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Liked Songs
                                            </div>
                                        </div>
                                    </Link> */}
                                </div>
                            </div>
                            {/* Playlists*/}
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/library/playlists">
                                        <div className="button">
                                            <div className="icon">
                                                <MdOutlinePlaylistPlay
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Playlists
                                            </div>
                                        </div>
                                    </Link>
                                    {playlists?.map((playlist, index) => (
                                        <Link
                                            to={`/music/playlist/${playlist._id}`}
                                            key={index}
                                        >
                                            <div className="button">
                                                <div className="icon">
                                                    <PiPlaylistFill
                                                        className="icon"
                                                        size="25px"
                                                    />
                                                </div>
                                                <div className="text">
                                                    {playlist.title}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/leaderboard">
                                        <div className="button">
                                            <div className="icon">
                                                <AiOutlineLineChart
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Leaderboard
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/music/new">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillStar
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                New Songs
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div> */}
                        </>
                    ) : (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/social/">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                    <Link to="/social/feed">
                                        <div className="button">
                                            <div className="icon">
                                                <CgFeed
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Feed</div>
                                        </div>
                                    </Link>
                                    <Link to="/social/friends">
                                        <div className="button">
                                            <div className="icon">
                                                <FaUserFriends
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Friends</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/playground">
                                        <div className="button">
                                            <div className="icon">
                                                <BsBox
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div
                                                className="text"
                                                title="Playground (In development)"
                                            >
                                                Playground (In development)
                                            </div>
                                        </div>
                                    </Link>
                                    {/* <Link to="/social/events">
                                        <div className="button">
                                            <div className="icon">
                                                <BsCalendarEventFill
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Events</div>
                                        </div>
                                    </Link> */}
                                    <Link to="/social/groups">
                                        <div className="button">
                                            <div className="icon">
                                                <MdOutlineGroups2
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Groups</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {mode === "music" ? (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/authentication/login">
                                        <div className="button">
                                            <div className="icon">
                                                <CiLogin
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Sign In</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/home">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="menu">
                        <div className="menu_wrapper">
                            <Link to="/music/leaderboard">
                                <div className="button">
                                    <div className="icon">
                                        <AiOutlineLineChart
                                            className="icon"
                                            size="25px"
                                        />
                                    </div>
                                    <div className="text">Leaderboard</div>
                                </div>
                            </Link>

                            <Link to="/music/new">
                                <div className="button">
                                    <div className="icon">
                                        <AiFillStar
                                            className="icon"
                                            size="25px"
                                        />
                                    </div>
                                    <div className="text">New Songs</div>
                                </div>
                            </Link>
                        </div>
                    </div> */}
                        </>
                    ) : (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/authentication/login">
                                        <div className="button">
                                            <div className="icon">
                                                <CiLogin
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Sign In</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};
export default Menu;
