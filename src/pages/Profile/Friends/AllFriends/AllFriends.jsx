import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { userService } from "../../../../services";
import Loading from "../../../../components/Loading";
import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";
import FriendCard from "../FriendCard/FriendCard";
const AllFriends = ({ user_id }) => {
    const user = useSelector((state) => state.user.data);
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const res = await userService.getFriendList(user_id, page, limit);
            setFriends(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        } catch (err) {
            console.log(err);
        }
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["friends", user_id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }
    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await postService.getPublicPostByUserId(
                user._id,
                page + 1,
                limit
            );
            setFriends((posts) => [...posts, ...res.data.data]);
        }
    };
    return (
        <div className="flex justify-around gap-[20px] flex-w w-full h-fit min-h-[90px] max-h-[800px] overflow-y-auto p-[5px]">
            {friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} user={user} />
            ))}
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
};

export default AllFriends;
