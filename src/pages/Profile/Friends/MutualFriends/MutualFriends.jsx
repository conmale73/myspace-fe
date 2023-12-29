import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { userService } from "../../../../services";
import Loading from "../../../../components/Loading";
import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";
import FriendCard from "../FriendCard/FriendCard";
const MutualFriends = ({ user_id }) => {
    const user = useSelector((state) => state.user.data);
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const res = await userService.getMutualFriends(
                user_id.toString(),
                user._id,
                page,
                limit
            );
            setFriends(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        } catch (err) {
            console.log(err);
        }
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["mutualFriends", user_id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }
    return (
        <div className="flex justify-around gap-[20px] flex-w w-full h-fit min-h-[90px] max-h-[800px] overflow-y-auto p-[5px]">
            {friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} user={user} />
            ))}
        </div>
    );
};

export default MutualFriends;
