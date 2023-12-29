import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { groupService } from "../../../services/group.service";
import Loading from "../../../components/Loading";
import GroupCard from "../../../components/GroupComponents/GroupCard";

const RecommendGroups = ({ user_id }) => {
    const [groups, setGroups] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchGroups = async () => {
        const res = await groupService.getRecommendGroups(user_id, page, limit);
        setGroups(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["recommendGroups", user_id],
        queryFn: () => fetchGroups(),
    });

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await groupService.getRecommendGroups(
                user_id,
                page + 1,
                limit
            );
            setGroups((groups) => [...groups, ...res.data.data]);
        }
    };
    return (
        <div className="w-[1000px] flex flex-col items-center gap-[20px]">
            <div className="w-[1000px] flex items-center flex-col gap-[20px]">
                {groups.map((group, index) => (
                    <GroupCard key={index} group={group} />
                ))}
            </div>
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

export default RecommendGroups;
