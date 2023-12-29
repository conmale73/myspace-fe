import React, { useState } from "react";
import "./leftSidebar.scss";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FaLock } from "react-icons/fa";

import Menu from "./Menu";
import AnimatedText from "../AnimatedText";
import HackedTextEffect from "../HackedTextEffect";
import GroupSearchbar from "./Groups/GroupSearchbar";
import ImageViewer from "../ImageViewer";
import GroupCreateButton from "./Groups/GroupCreateButton";
function LeftSidebar() {
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);
    const extendMode = useSelector((state) => state.mode.extend);
    const groupDetail = useSelector((state) => state.groupDetail.data);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const [searchQuery, setSearchQuery] = useState("");

    const handleClickLogo = () => {
        if (location.pathname === "/social" || location.pathname === "/music") {
            window.location.replace(window.location.href);
        } else {
            if (mode === "music") {
                navigate("/music");
            }
            if (mode === "social") {
                navigate("/social");
            }
        }
    };
    return (
        <>
            {extendMode ? (
                <div
                    className={`groupsLeftSidebar ${
                        sidebarVisible ? "" : "hide"
                    }`}
                >
                    {mode === "music" ? (
                        <div className="logo">
                            <img
                                src="/photos/MySPACE-Logo.png"
                                onClick={() => handleClickLogo()}
                            ></img>
                        </div>
                    ) : (
                        <div className="logo">
                            <img
                                src="/photos/MySPACE-Logo.png"
                                onClick={() => handleClickLogo()}
                            ></img>
                        </div>
                    )}
                    {extendMode === "groups" ? (
                        <div className="w-full">
                            <div>Group</div>
                            <div className="searchBar">
                                <GroupSearchbar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            </div>
                            <div className="w-full h-[60px]">
                                <GroupCreateButton />
                            </div>
                        </div>
                    ) : null}
                    {extendMode === "groupsSearch" ? (
                        <div className="searchBar">
                            <GroupSearchbar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>
                    ) : null}
                    {extendMode === "groupDetail" ? (
                        <>
                            <div className="searchBar">
                                <GroupSearchbar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            </div>
                            <div className="groupDetail">
                                <div className="w-full h-[60px] flex items-center gap-[10px]">
                                    <div className="w-[50px] h-[50px] hover:opacity-80">
                                        {groupDetail && (
                                            <ImageViewer
                                                image={
                                                    groupDetail?.thumbnail
                                                        ?.files[0]
                                                }
                                                objectFit="cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-[10px] justify-start h-full">
                                        <Link
                                            to={`/social/groups/${groupDetail?._id}`}
                                        >
                                            <div className="text-[#e4e6eb] font-[600]">
                                                {groupDetail?.name}
                                            </div>
                                        </Link>
                                        <div className="flex items-center">
                                            <div className="text-[#adadad] font-[400] flex gap-[3px] items-center text-ellipsis">
                                                <span>
                                                    <FaLock size="12px" />
                                                </span>
                                                <span className="text-[12px]">
                                                    Private Group
                                                </span>
                                                <span>•</span>
                                                <span className="text-[12px]">
                                                    {
                                                        groupDetail?.members
                                                            ?.length
                                                    }{" "}
                                                    members
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            ) : (
                <div className={`leftSidebar ${sidebarVisible ? "" : "hide"}`}>
                    {mode === "music" ? (
                        <div className="logo">
                            <img
                                src="/photos/MySPACE-Logo.png"
                                onClick={() => handleClickLogo()}
                            ></img>
                        </div>
                    ) : (
                        <div className="logo">
                            <img
                                src="/photos/MySPACE-Logo.png"
                                onClick={() => handleClickLogo()}
                            ></img>
                        </div>
                    )}

                    {user ? (
                        <div className="info">
                            <div className="avatar">
                                <Link to={`/profile/${user._id}`}>
                                    <img
                                        loading="lazy"
                                        className={`w-full h-full object-contain rounded-full`}
                                        src={`data:${user.avatar.files[0].fileInfo.type};base64,${user.avatar.files[0].dataURL}`}
                                    />
                                </Link>
                            </div>
                            <div className="name">
                                <HackedTextEffect
                                    text={"Welcome, " + user.username}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="info">
                                <div className="avatar">
                                    <img src="/photos/avatar.jpg"></img>
                                </div>
                                <div className="name">
                                    <HackedTextEffect text={"Welcome"} />
                                </div>
                            </div>
                        </>
                    )}

                    <Menu />
                    {/* <button
                className="toggleButton"
                onClick={toggleSidebar}
                title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
            </button> */}
                </div>
            )}
        </>
    );
}

export default LeftSidebar;
