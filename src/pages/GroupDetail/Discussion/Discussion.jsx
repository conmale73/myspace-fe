import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import PostTool from "../../../components/PostTool";
import { SelectSortBy } from "../../../components/Select";
import { postService } from "../../../services";
import Loading from "../../../components/Loading";
import PostList from "../../../components/PostList";
const Discussion = ({ group_id, group_name }) => {
    const user = useSelector((state) => state.user.data);
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("NEW");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        const res = await postService.getPostsByGroupId(
            group_id,
            page,
            limit,
            sortBy
        );
        setPosts(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupPosts", group_id],
        queryFn: () => fetchPosts(),
    });

    useEffect(() => {
        setPage(1);
        setPosts([]);

        const fetchPosts = async () => {
            const res = await postService.getPostsByGroupId(
                group_id,
                1,
                limit,
                sortBy
            );
            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        };
        fetchPosts();
    }, [sortBy]);

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await postService.getPostsByGroupId(
                group_id,
                page + 1,
                limit,
                sortBy
            );
            setPosts((posts) => [...posts, ...res.data.data]);
        }
    };

    return (
        <div className="w-full flex flex-col gap-[20px]">
            {user && (
                <div className="w-full flex justify-center">
                    <PostTool
                        group_name={group_name}
                        group_id={group_id}
                        setPosts={setPosts}
                    />
                </div>
            )}

            {/* <div className="w-full">
                <SelectSortBy
                    value={sortBy}
                    setValue={setSortBy}
                    listValue={["NEW", "ACTIVITY"]}
                />
            </div> */}
            <div className="w-full flex flex-col">
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

export default Discussion;
