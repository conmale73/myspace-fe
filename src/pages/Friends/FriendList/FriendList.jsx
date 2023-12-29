import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { userService } from "../../../services";
import Loading from "../../../components/Loading";
import UserCard from "../../../components/UserCard/UserCard";
import Friend from "./Friend";
const FriendList = ({ user_id }) => {
    const [friendData, setFriendData] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFriendData = async () => {
        const res = await userService.getFriendList(user_id, page, limit);
        setFriendData(res.data.data);
        setTotalPages(res.data.totalPages);

        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["friendList", user_id],
        queryFn: fetchFriendData,
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="flex gap-[20px] flex-wrap">
            {friendData?.map((friend, index) => (
                <Friend key={index} friend={friend} />
            ))}
        </div>
    );
};

export default FriendList;
