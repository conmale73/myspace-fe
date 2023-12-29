import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { groupService } from "../../../../services";
import Loading from "../../../../components/Loading";
import UserCard from "../../../../components/UserCard/UserCard";
import PendingRequest from "./PendingRequest";
const PendingRequests = ({ group_id }) => {
    const user = useSelector((state) => state.user.data);
    const [groupRequests, setGroupRequests] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchRequests = async () => {
        const data = {
            user_id: user._id,
        };
        const res = await groupService.getPendingRequests(
            group_id,
            data,
            page,
            limit
        );
        setGroupRequests(res.data.data);
        setTotalPages(res.data.totalPages);

        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupPendingRequests", group_id],
        queryFn: fetchRequests,
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    if (groupRequests?.length == 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-[#f0f0f0] text-[20px] font-bold">
                    No pending requests
                </p>
            </div>
        );
    }
    return (
        <div className="flex gap-[20px] flex-wrap">
            {groupRequests?.map((request, index) => (
                <PendingRequest
                    key={index}
                    groupRequest={request}
                    group_id={group_id}
                />
            ))}
        </div>
    );
};

export default PendingRequests;
