import PostTool from "../../../components/PostTool";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { postService } from "../../../services";
import Loading from "../../../components/Loading";
import Post from "../../../components/Post";
import PostList from "../../../components/PostList";
const ProfilePosts = ({ user_id }) => {
    const user = useSelector((state) => state.user.data);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        if (!user) {
            const res = await postService.getPublicPostByUserId(
                user_id,
                page,
                limit
            );
            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        } else {
            const data = {
                viewer_id: user._id,
            };
            const res = await postService.getPostsByUserId(
                user_id,
                data,
                page,
                limit
            );
            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        }
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["profilePosts", user_id],
        queryFn: () => fetchPosts(),
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            if (!user) {
                const res = await postService.getPublicPostByUserId(
                    user_id,
                    page + 1,
                    limit
                );
                setPosts((posts) => [...posts, ...res.data.data]);
            } else {
                const data = {
                    viewer_id: user._id,
                };
                const res = await postService.getPostsByUserId(
                    user_id,
                    data,
                    page + 1,
                    limit
                );
                setPosts((posts) => [...posts, ...res.data.data]);
            }
        }
    };
    return (
        <div className="w-full flex flex-col items-center">
            {user_id === user._id ? (
                <div className="w-[90%] flex justify-center">
                    <PostTool setPosts={setPosts} />
                </div>
            ) : (
                <></>
            )}

            <div className="flex flex-col w-[90%] items-center">
                <PostList data={posts} />
                {page < totalPages ? (
                    <p
                        className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer my-[20px]"
                        onClick={handleClickLoadMore}
                    >
                        Load more...
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
export default ProfilePosts;
