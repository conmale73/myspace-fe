import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { userService } from "../../../services";
import Loading from "../../../components/Loading";
import UserCard from "../../../components/UserCard/UserCard";
import FriendRequest from "./FriendRequest";
const FriendRequests = ({ user_id }) => {
    const [friendData, setFriendData] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFriendData = async () => {
        const res = await userService.getFriendRequests(user_id, page, limit);
        setFriendData(res.data.data);
        setTotalPages(res.data.totalPages);

        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["friendRequests", user_id],
        queryFn: fetchFriendData,
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    if (friendData?.length == 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-[#f0f0f0] text-[20px] font-bold">
                    No friend requests
                </p>
            </div>
        );
    }
    return (
        <div className="flex gap-[20px] flex-wrap">
            {friendData?.map((friend, index) => (
                <FriendRequest key={index} friendRequest={friend} />
            ))}
        </div>
    );
};

export default FriendRequests;
