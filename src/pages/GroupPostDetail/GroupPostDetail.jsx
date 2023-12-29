import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { postService, groupService } from "../../services";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Post from "../../components/Post";
import CommentList from "../../components/CommentModal/CommentList/CommentList";
import CommentTool from "../../components/CommentModal/CommentTool";

const GroupPostDetail = () => {
    const { post_id, group_id } = useParams();
    const user = useSelector((state) => state.user.data);

    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

    const [groupData, setGroupData] = useState();

    const fetchData = async () => {
        try {
            const data = {
                user_id: user?._id,
                group_id: group_id,
            };
            console.log(data);
            const res = await postService.getPostById(post_id, data);
            setCommentCount(res.data.data.commentCount);
            console.log(res.data);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupPostDetail", post_id],
        queryFn: fetchData,
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <Error />;

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
                    group_id={data.group_id}
                    files={data.content.files}
                    likes={data.likes}
                    inCommentModal={true}
                    commentCount={commentCount}
                />
                {user && (
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
                )}

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

export default GroupPostDetail;
