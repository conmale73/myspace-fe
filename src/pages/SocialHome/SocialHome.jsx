import styles from "./socialHome.module.scss";
import PostTool from "../../components/PostTool";
import { useSelector } from "react-redux";
import PostList from "../../components/PostList";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { postService } from "../../services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SocialHome = () => {
    document.title = "MY SPACE";
    const user = useSelector((state) => state.user.data);
    const navigate = useNavigate();

    if (!user) {
        useEffect(() => {
            navigate("/authentication/login");
        }, []);
    } else {
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(5);
        const [totalPages, setTotalPages] = useState(1);
        const [posts, setPosts] = useState([]);
        const fetchData = async () => {
            const res = await postService.getHome(user._id, page, limit);
            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        };
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["socialHome", user._id],
            queryFn: () => fetchData(),
        });

        if (isLoading) return <Loading isFullScreen={true} />;

        if (error) return <p>{error.message}</p>;

        const handleClickLoadMore = async () => {
            if (page < totalPages) {
                setPage((page) => page + 1);
                const res = await postService.getHome(
                    user._id,
                    page + 1,
                    limit
                );
                setPosts((posts) => [...posts, ...res.data.data]);
            }
        };
        return (
            <div className={styles.socialHome}>
                <PostTool setPosts={setPosts} posts={posts} />
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
        );
    }
};
export default SocialHome;
