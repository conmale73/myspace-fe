import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { postService, userService } from "../../services";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import CommentList from "../../components/CommentModal/CommentList/CommentList";
import CommentTool from "../../components/CommentModal/CommentTool";

const PostDetail = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user.data);

    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

    const fetchData = async () => {
        try {
            const data = {
                user_id: user._id,
            };
            const res = await postService.getPostById(id, data);
            setCommentCount(res.data.data.commentCount);
            console.log(res.data);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["postDetail", id],
        queryFn: fetchData,
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <div className="flex flex-col gap-2">
                <Post
                    id={data._id}
                    user_id={data.user_id}
                    text={data.content.text}
                    createAt={data.createAt}
                    updateAt={data.updateAt}
                    privacy={data.privacy}
                    files={data.content.files}
                    likes={data.likes}
                    inCommentModal={true}
                    commentCount={commentCount}
                />
                <div className="w-full bg-neutral-800">
                    <CommentTool
                        text={text}
                        setText={setText}
                        post_id={data._id}
                        user_id={data.user_id}
                        setComments={setComments}
                        setCommentCount={setCommentCount}
                    />
                </div>
                <div className="bg-neutral-800 pl-[18px]">
                    <CommentList
                        post_id={data._id}
                        comments={comments}
                        setComments={setComments}
                        setCommentCount={setCommentCount}
                    />
                </div>
            </div>
        </>
    );
};

export default PostDetail;
