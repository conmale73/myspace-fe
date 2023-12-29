import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Select from "@radix-ui/react-select";

import Loading from "../../../Loading";
import { commentService } from "../../../../services";
import Comment from "../../Comment";

import { MdDateRange } from "react-icons/md";
import { FaHeart, FaClock } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import Reply from "./Reply/Reply";

const ReplyList = ({
    comment_id,
    replies,
    setReplies,
    replyCount,
    setCommentCount,
    commentToScroll,
}) => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const [totalPages, setTotalPages] = useState(1);
    const [totalReplies, setTotalReplies] = useState(replyCount);

    const [likes, setLikes] = useState([]);
    const [show, setShow] = useState(false);

    const handleLoadReplies = async () => {
        setShow(true);
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await commentService.getRepliesByCommentId(
                comment_id,
                page + 1,
                limit
            );
            console.log("button", res.data);
            setReplies((replies) => [...replies, ...res.data.data]);
        }
    };

    return (
        <div className="flex flex-col h-fit my-[10px] relative">
            <div className="flex flex-col items-start">
                {show && (
                    <>
                        {replies.map((reply, index) => (
                            <Reply
                                key={reply._id}
                                replyData={reply}
                                replies={replies}
                                setReplies={setReplies}
                                setCommentCount={setCommentCount}
                                commentToScroll={commentToScroll}
                            />
                        ))}
                    </>
                )}
                <div className="flex items-start h-full">
                    {page < totalPages && (
                        <div
                            className="text-[16px] text-[#adadad] cursor-pointer hover:underline"
                            onClick={(e) => handleLoadReplies()}
                        >
                            View {totalReplies - page * limit} replies
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ReplyList;
