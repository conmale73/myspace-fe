import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { SlOptions } from "react-icons/sl";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { commentService } from "../../../services";
import UserInfoPreview from "../../UserInfoPreview";
import styles from "./Comment.module.scss";
import moment from "moment";
import { FormatDate } from "../../../utils";
import LikesViewer from "../../LikesViewer";
import ReplyTool from "../ReplyTool/ReplyTool";
import ReplyList from "./ReplyList/ReplyList";
const Comment = (props) => {
    const user = useSelector((state) => state.user.data);
    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [openReplyTool, setOpenReplyTool] = useState(false);

    const [text, setText] = useState("");
    const [replies, setReplies] = useState([]);
    useEffect(() => {
        if (likes.find((like) => like.user_id == user._id)) {
            setLiked(true);
        }
    }, []);

    const handleClickLike = () => {
        try {
            commentService.likeComment(props.comment_id, user._id);
            setLiked(!liked);
            likes.push({ user_id: user._id });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickUnlike = () => {
        try {
            commentService.unlikeComment(props.comment_id, user._id);
            setLiked(!liked);
            setLikes(likes.filter((like) => like.user_id != user._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickReply = () => {
        setOpenReplyTool(!openReplyTool);
    };

    const handleClickDelete = async (e) => {
        try {
            await commentService.deleteComment(props.comment_id);
            props.setComments(
                props.comments?.filter(
                    (comment) => comment._id != props.comment_id
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col w-full" key={props.comment_id}>
            <div className={`${styles.commentContainer} flex w-full h-fit `}>
                <div className={`${styles.avatarContainer} flex-0 `}>
                    <UserInfoPreview
                        thumbnailHeight="40px"
                        thumbnailWidth="40px"
                        showName={false}
                        user_id={props.creator?.user_id}
                        bgStyles={false}
                        displayOnlineStatus={false}
                    />
                </div>
                <div
                    className={`${styles.midContainer} w-fit h-full pb-[10px] min-w-[300px] relative bg-[#303030] rounded-[10px] break-words whitespace-pre-line`}
                >
                    <div className="flex flex-col ml-[10px] mr-[10px]">
                        <div className="flex items-center w-fit h-[50px]">
                            <Link to={`/profile/${props.creator?.user_id}`}>
                                {props.creator?.username}
                            </Link>
                        </div>
                        <div
                            className={`${styles.textContent} flex flex-1 flex-wrap mb-[10px] break-words whitespace-pre-line`}
                        >
                            {props.content.text}
                        </div>
                    </div>
                    {likes?.length > 0 && (
                        <div
                            className="absolute bottom-[-15px] right-[20px] rounded-full w-[30px] h-[30px] bg-[#303030]"
                            onClick={() => {
                                setOpenImageViewer(true);
                            }}
                        >
                            <div className="flex justify-around items-center h-full w-full cursor-pointer text-[#9d9d9d] hover:text-[#ffffff] ">
                                <span className="text-[15px]">
                                    {likes?.length}
                                </span>
                                <FaHeart size="15px" />
                            </div>
                            <LikesViewer
                                likes={likes}
                                open={openImageViewer}
                                setOpen={setOpenImageViewer}
                            />
                        </div>
                    )}
                </div>

                {user && props.creator?.user_id == user?._id && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <div
                                className={`${styles.optionButtonContainer} flex-0 my-auto p-[5px] hover:bg-[#676668] cursor-pointer rounded-full ml-[20px]`}
                            >
                                <SlOptions size="20px" color="#9d9d9d" />
                            </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            className="w-[200px] h-fit bg-[#2a2c2e] p-[10px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade  rounded-[5px]
                        data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        >
                            <div
                                className="text-[#9d9d9d] hover:bg-[#676668] hover:text-[#ffffff] cursor-pointer px-[5px] rounded-[5px]"
                                onClick={(e) => handleClickDelete(e)}
                            >
                                Delete
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </div>
            <div className="w-full h-fit py-[5px]">
                <div className="flex justify-start items-center ml-[45px] gap-[20px]">
                    <div className="text-[#9d9d9d] text-[15px]">
                        {moment(props.createAt).fromNow()}
                    </div>
                    {user && (
                        <>
                            {liked ? (
                                <div
                                    className="flex gap-[5px] items-center text-[#9d9d9d] hover:text-[#ffffff] cursor-pointer"
                                    onClick={() => handleClickUnlike()}
                                >
                                    <FaHeart size="15px" color="#9d9d9d" />
                                    <span className="text-[#ffffff] text-[15px] ">
                                        Unlike
                                    </span>
                                </div>
                            ) : (
                                <div
                                    className="flex gap-[5px] items-center text-[#9d9d9d] hover:text-[#ffffff] cursor-pointer"
                                    onClick={() => handleClickLike()}
                                >
                                    <FaRegHeart size="15px" className="" />
                                    <span className=" text-[15px]">Like</span>
                                </div>
                            )}
                            <div
                                className="flex justify-center items-center text-[#9d9d9d] hover:text-[#ffffff] cursor-pointer"
                                onClick={(e) => handleClickReply()}
                            >
                                <span className=" text-[15px]">Reply</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {props.replyCount > 0 && (
                <div className="w-full ml-[50px]">
                    <ReplyList
                        comment_id={props.comment_id}
                        replies={replies}
                        replyCount={props.replyCount}
                        setReplies={setReplies}
                        setCommentCount={props.setCommentCount}
                    />
                </div>
            )}

            {openReplyTool && (
                <div
                    className="w-full"
                    style={{
                        display: openReplyTool ? "flex" : "none",
                    }}
                >
                    <ReplyTool
                        comment_id={props.comment_id}
                        text={text}
                        setText={setText}
                        post_id={props.post_id}
                        creator={props.creator}
                        setReplies={setReplies}
                        replyCount={props.replyCount}
                        setCommentCount={props.setCommentCount}
                        setOpenReplyTool={setOpenReplyTool}
                    />
                </div>
            )}
        </div>
    );
};
export default Comment;
