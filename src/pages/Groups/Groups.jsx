import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setExtend } from "../../redux/mode/modeSlice";
import { useQuery } from "@tanstack/react-query";
import { groupService } from "../../services/group.service";
import Loading from "../../components/Loading";
import GroupCard from "../../components/GroupComponents/GroupCard";
import RecommendGroups from "./RecommendGroups/RecommendGroups";
const Groups = (props) => {
    document.title = props.title || "Groups | MySPACE";
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [groups, setGroups] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchGroups = async () => {
        const res = await groupService.getGroupsByUserId(user._id, page, limit);
        setGroups(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groups", user._id],
        queryFn: () => fetchGroups(),
    });

    useEffect(() => {
        dispatch(setExtend("groups"));

        return () => {
            dispatch(setExtend(null));
        };
    }, []);
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await groupService.getGroupsByUserId(
                user._id,
                page + 1,
                limit
            );
            setGroups((groups) => [...groups, ...res.data.data]);
        }
    };
    return (
        <div className="w-full flex items-center flex-col gap-[20px]">
            <div>
                <p className="text-[#ffffff] text-[20px] font-bold">
                    Your groups
                </p>
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
            <div className="w-[1000px]">
                <p className="text-[#ffffff] text-[20px] font-bold my-[10px]">
                    Groups you may like
                </p>
                <RecommendGroups user_id={user._id} />
            </div>
        </div>
    );
};

export default Groups;
