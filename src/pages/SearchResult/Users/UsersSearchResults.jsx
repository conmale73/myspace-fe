import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { userService } from "../../../services";
import Loading from "../../../components/Loading";
import UserCard from "../../../components/UserCard/UserCard";
const UserSearchResults = ({ query }) => {
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        const res = await userService.searchUserByUsername(query, page, limit);
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["searchUsers", query],
        queryFn: fetchUsers,
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage(page + 1);
            fetchUsers();
        }
    };

    return (
        <div className="w-full flex items-center flex-col gap-[20px]">
            {users.map((user, index) => (
                <div className="w-[1000px]" key={user._id}>
                    <UserCard userData={user} key={index} />
                </div>
            ))}
        </div>
    );
};

export default UserSearchResults;
