import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Select from "@radix-ui/react-select";

import Loading from "../../Loading";
import { commentService } from "../../../services";
import Comment from "../Comment";

import { MdDateRange } from "react-icons/md";
import { FaHeart, FaClock } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className="text-[13px] leading-none hover:bg-[#555555]
                rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative 
                select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none 
                data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <AiOutlineCheck size="15px" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);
const CommentList = (props) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState("likesDesc");
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        const res = await commentService.getCommentsByPostId(
            props.post_id,
            page,
            limit,
            sortBy
        );
        props.setComments(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["commentList", props.post_id],
        queryFn: () => fetchData(),
    });

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            const res = await commentService.getCommentsByPostId(
                props.post_id,
                page + 1,
                limit,
                sortBy
            );
            setPage((page) => page + 1);
            console.log(res.data);
            props.setComments((comments) => [...comments, ...res.data.data]);
        } else {
            setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        setPage(1);
        props.setComments([]);
        fetchData();
    }, [sortBy]);

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="flex flex-col h-fit pb-[110px]">
            <div className="flex w-full h-[40px] justify-start mx-[20px] my-[10px]">
                {/* Sort Selector */}
                <Select.Root value={sortBy} onValueChange={(e) => setSortBy(e)}>
                    <Select.Trigger
                        className="inline-flex items-center justify-center 
                                bg-[#3A3B3C]
                                rounded px-[15px] text-[13px] leading-none h-[30px] gap-[5px] 
                                text-violet11 shadow-[0_2px_10px] shadow-white/10 
                                hover:bg-[#606060] focus:shadow-[0_0_0_2px] focus:shadow-white 
                                data-[placeholder]:text-violet9 outline-none"
                        aria-label="Privacy"
                    >
                        <Select.Value placeholder="Select privacy for your post..." />
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content
                            className="overflow-hidden rounded-md 
                            shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]
                        bg-[#3A3B3C]"
                        >
                            <Select.Viewport className="p-[5px]">
                                <Select.Group>
                                    <SelectItem value="likesDesc">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <FaHeart size="15px" />
                                            Top Comments
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="createAtAsc">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <FaClock size="15px" />
                                            Most Recent
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="createAtDesc">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <MdDateRange size="15px" />
                                            All Comments
                                        </div>
                                    </SelectItem>
                                </Select.Group>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>

            {props.comments?.map((comment, index) => (
                <Comment
                    key={index}
                    comment_id={comment._id}
                    creator={comment.creator}
                    post_id={comment.post_id}
                    content={comment.content}
                    likes={comment.likes}
                    replyCount={comment.replyCount}
                    createAt={comment.createAt}
                    comments={props.comments}
                    setComments={props.setComments}
                    setCommentCount={props.setCommentCount}
                />
            ))}
            {page < totalPages && (
                <p
                    className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer"
                    onClick={handleClickLoadMore}
                >
                    Load more...
                </p>
            )}
        </div>
    );
};
export default CommentList;
