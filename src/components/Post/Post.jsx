import styles from "./Post.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { userService, postService, groupService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BsGlobeAsiaAustralia } from "react-icons/bs";
import {
    FaUserFriends,
    FaRegHeart,
    FaHeart,
    FaRegCommentAlt,
} from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { AiFillLock } from "react-icons/ai";
import { FormatDate } from "../../utils";
import { SlOptions } from "react-icons/sl";
import { MdGroups } from "react-icons/md";

import MiniAudioPlayer from "../MiniAudioPlayer";
import UserInfoPreview from "../UserInfoPreview";
import ImageContainer from "../ImageContainer/ImageContainer";
import Loading from "../Loading";
import ImageViewer from "../ImageViewer";
import LikesViewer from "../LikesViewer";
import CommentModal from "../CommentModal";
import OptionButton from "./OptionButton";
const Post = (props) => {
    const images =
        props?.files?.filter((file) => {
            return file.fileInfo.type.startsWith("image/");
        }) || [];
    const audios =
        props?.files?.filter((file) => {
            return file.fileInfo.type.startsWith("audio/");
        }) || [];

    const user = useSelector((state) => state.user.data);
    const extendMode = useSelector((state) => state.mode.extend);
    const [more, setMore] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.likes);
    const [commentCount, setCommentCount] = useState(props.commentCount);
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [groupData, setGroupData] = useState();

    const [isDeleted, setIsDeleted] = useState(false);

    const fetchUserInfo = async () => {
        const res = await userService.getUserById(props.user_id);
        setUserInfo(res.data.data);
        return res.data.data;
    };
    const fetchGroupData = async () => {
        const res = await groupService.getGroupById(props.group_id, user?._id);
        setGroupData(res.data.data);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["homeUserInfoPreview", props.user_id],
        queryFn: () => fetchUserInfo(),
    });

    useEffect(() => {
        if (likes.find((like) => like.user_id == user._id)) {
            setLiked(true);
        }
        if (props.privacy == "GROUP") {
            fetchGroupData();
        }
    }, []);

    const postRef = useRef(null);
    const timeoutRef = useRef(null);

    // Use IntersectionObserver to detect when the post is in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Clear the previous timeout
                    clearTimeout(timeoutRef.current);

                    // Set timeout to add user to read list after 4 seconds
                    timeoutRef.current = setTimeout(() => {
                        addUserToReadList();
                    }, 4000);
                } else {
                    clearTimeout(timeoutRef.current);
                }
            },
            {
                root: null, // viewport
                rootMargin: "0px",
                threshold: 0.4, // 40% of the post must be visible
            }
        );

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => {
            observer.disconnect();
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const addUserToReadList = async () => {
        const data = {
            user_id: user._id,
        };
        await postService.readPost(props.id, data);
    };

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const handleClickShowMore = (e) => {
        e.preventDefault();
        setMore(!more);
    };
    const handleClickLike = () => {
        try {
            postService.likePost(props.id, user._id);
            setLiked(!liked);
            likes.push({ user_id: user._id });
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickUnLike = () => {
        try {
            postService.unlikePost(props.id, user._id);
            setLiked(!liked);
            setLikes(likes.filter((like) => like.user_id != user._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickComment = () => {
        setOpenCommentModal(true);
    };
    return (
        <>
            <div className={styles.post} key={props.id} ref={postRef}>
                {isDeleted && (
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            This post has been deleted.
                        </div>
                    </div>
                )}
                {extendMode == "groupDetail" ? (
                    <>
                        <div className={styles.infoContainer}>
                            <div className={styles.avatar}>
                                <UserInfoPreview
                                    thumbnailHeight="40px"
                                    thumbnailWidth="40px"
                                    showName={false}
                                    user_id={props.user_id}
                                    bgStyles={false}
                                    displayOnlineStatus={true}
                                />
                            </div>
                            <div className={styles.info}>
                                <Link
                                    to={`/profile/${props.user_id}`}
                                    className="w-fit"
                                >
                                    <p className={styles.name}>
                                        {data?.username}
                                    </p>
                                </Link>

                                <p className={styles.createAt}>
                                    {FormatDate(props.createAt)}

                                    <span className={styles.privacy}>
                                        <MdGroups size="20px" title="Group" />
                                    </span>
                                </p>
                            </div>

                            <div className={styles.optionButtons}>
                                <Link
                                    to={`/social/groups/${props.group_id}/post/${props.id}`}
                                >
                                    <div
                                        className={styles.detailButton}
                                        title="Detail"
                                    >
                                        <BiDetail className={styles.icon} />
                                    </div>
                                </Link>
                                {props.user_id == user?._id && (
                                    <OptionButton
                                        user_id={props.user_id}
                                        post_id={props.id}
                                        setIsDeleted={setIsDeleted}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {props.privacy == "GROUP" ? (
                            <div className={styles.infoContainer}>
                                <div className={styles.groupPostAvatar}>
                                    <div className={styles.groupThumbnail}>
                                        <Link
                                            to={`/social/groups/${groupData?._id}`}
                                        >
                                            <img
                                                src={`data:${groupData?.thumbnail?.files[0].fileInfo.type};base64,${groupData?.thumbnail?.files[0].dataURL}`}
                                                alt=""
                                                className="rounded-full w-10 h-10 object-cover"
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.avatar}>
                                        <UserInfoPreview
                                            thumbnailHeight="30px"
                                            thumbnailWidth="30px"
                                            showName={false}
                                            user_id={props.user_id}
                                            bgStyles={false}
                                            displayOnlineStatus={true}
                                        />
                                    </div>
                                </div>
                                <div className={styles.groupPostInfo}>
                                    <Link
                                        to={`/social/groups/${groupData?._id}`}
                                        className="w-fit"
                                    >
                                        <p className={styles.groupName}>
                                            {groupData?.name}
                                        </p>
                                    </Link>
                                    <div className={styles.bottomInfo}>
                                        <Link
                                            to={`/profile/${props.user_id}`}
                                            className="w-fit"
                                        >
                                            <p className={styles.name}>
                                                {data?.username}
                                            </p>
                                        </Link>
                                        <span className={styles.dot}></span>
                                        <p className={styles.createAt}>
                                            {FormatDate(props.createAt)}

                                            <span className={styles.privacy}>
                                                <MdGroups
                                                    size="20px"
                                                    title="Group"
                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.optionButtons}>
                                    <Link
                                        to={`/social/groups/${props.group_id}/post/${props.id}`}
                                    >
                                        <div
                                            className={styles.detailButton}
                                            title="Detail"
                                        >
                                            <BiDetail className={styles.icon} />
                                        </div>
                                    </Link>
                                    {props.user_id == user?._id && (
                                        <OptionButton
                                            user_id={props.user_id}
                                            post_id={props.id}
                                            setIsDeleted={setIsDeleted}
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoContainer}>
                                <div className={styles.avatar}>
                                    <UserInfoPreview
                                        thumbnailHeight="40px"
                                        thumbnailWidth="40px"
                                        showName={false}
                                        user_id={props.user_id}
                                        bgStyles={false}
                                        displayOnlineStatus={true}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <Link
                                        to={`/profile/${props.user_id}`}
                                        className="w-fit"
                                    >
                                        <p className={styles.name}>
                                            {data?.username}
                                        </p>
                                    </Link>

                                    <p className={styles.createAt}>
                                        {FormatDate(props.createAt)}

                                        <span className={styles.privacy}>
                                            {props.privacy == "PUBLIC" && (
                                                <BsGlobeAsiaAustralia
                                                    size="15px"
                                                    title="Public"
                                                />
                                            )}
                                            {props.privacy == "FRIEND" && (
                                                <FaUserFriends
                                                    size="15px"
                                                    title="Friend"
                                                />
                                            )}
                                            {props.privacy == "PRIVATE" && (
                                                <AiFillLock
                                                    size="15px"
                                                    Private
                                                />
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div className={styles.optionButtons}>
                                    <Link to={`/social/post/${props.id}`}>
                                        <div
                                            className={styles.detailButton}
                                            title="Detail"
                                        >
                                            <BiDetail className={styles.icon} />
                                        </div>
                                    </Link>
                                    {props.user_id == user?._id && (
                                        <OptionButton
                                            user_id={props.user_id}
                                            post_id={props.id}
                                            setIsDeleted={setIsDeleted}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className={styles.content}>
                    <p className={styles.text}>
                        {props.text.length > 300 ? (
                            <>
                                {more ? (
                                    <>
                                        {props.text}
                                        <span
                                            className={styles.readMore}
                                            onClick={(e) =>
                                                handleClickShowMore(e)
                                            }
                                        >
                                            Show less
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {props.text.slice(0, 300) + "..."}
                                        <span
                                            className={styles.readMore}
                                            onClick={(e) =>
                                                handleClickShowMore(e)
                                            }
                                        >
                                            Show more
                                        </span>
                                    </>
                                )}
                            </>
                        ) : (
                            <>{props.text}</>
                        )}
                    </p>

                    <div className={styles.files}>
                        <div className={styles.audios}>
                            {audios.length > 0 && (
                                <>
                                    {audios.map((audio, index) => {
                                        return (
                                            <div
                                                className={
                                                    styles.audioContainer
                                                }
                                                key={index}
                                            >
                                                <MiniAudioPlayer
                                                    dataURL={`data:${audio.fileInfo.type};base64,${audio.dataURL}`}
                                                />
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {images?.length > 0 && (
                            <>
                                <ImageContainer images={images} />
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.reactions}>
                    {likes.length > 0 && (
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute left-2"
                            onClick={() => {
                                setOpenImageViewer(true);
                            }}
                        >
                            <FaHeart />
                            <span>{props.likes.length + " likes"}</span>
                            <LikesViewer
                                likes={likes}
                                open={openImageViewer}
                                setOpen={setOpenImageViewer}
                            />
                        </div>
                    )}

                    {props.inCommentModal ? (
                        <div
                            className={`flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute right-2`}
                        >
                            <FaRegCommentAlt className="" />
                            <span>{props.commentCount + " comments"}</span>
                        </div>
                    ) : (
                        <CommentModal
                            username={data?.username}
                            id={props.id}
                            user_id={props.user_id}
                            text={props.text}
                            createAt={props.createAt}
                            updateAt={props.updateAt}
                            privacy={props.privacy}
                            files={props.files}
                            likes={props.likes}
                            commentCount={commentCount}
                            setCommentCount={setCommentCount}
                            openCommentModal={openCommentModal}
                            setOpenCommentModal={setOpenCommentModal}
                        />
                    )}
                </div>
                {user && (
                    <div className={styles.actions}>
                        {liked ? (
                            <div
                                className={styles.liked}
                                onClick={() => handleClickUnLike()}
                            >
                                <FaHeart className={styles.icon} />
                                <span>Liked</span>
                            </div>
                        ) : (
                            <div
                                className={styles.like}
                                onClick={() => handleClickLike()}
                            >
                                <FaRegHeart className={styles.icon} />
                                <span>Like</span>
                            </div>
                        )}
                        {props.inCommentModal ? (
                            <div className={styles.comment}>
                                <FaRegCommentAlt className={styles.icon} />
                                <span>Comment</span>
                            </div>
                        ) : (
                            <div
                                className={styles.comment}
                                onClick={() => handleClickComment()}
                            >
                                <FaRegCommentAlt className={styles.icon} />
                                <span>Comment</span>
                            </div>
                        )}

                        {/* <div className={styles.share}>
                        <FaRegShareFromSquare className={styles.icon} />
                        <span>Share</span>
                    </div> */}
                    </div>
                )}
            </div>
        </>
    );
};
export default Post;
