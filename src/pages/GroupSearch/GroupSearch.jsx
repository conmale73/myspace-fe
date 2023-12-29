import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setExtend } from "../../redux/mode/modeSlice";
import { useSearchParams, useParams } from "react-router-dom";
import GroupCard from "../../components/GroupComponents/GroupCard/GroupCard";
import { groupService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
const GroupSearch = (props) => {
    document.title = props.title || "Groups | Search | MySPACE";
    const { query } = useParams();

    const [groups, setGroups] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const extendMode = useSelector((state) => state.mode.extend);

    const fetchGroups = async () => {
        const res = await groupService.searchGroupsByName(query);
        setGroups(res.data.data);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["searchGroups", query],
        queryFn: () => fetchGroups(),
    });

    useEffect(() => {
        dispatch(setExtend("groupsSearch"));

        return () => {
            dispatch(setExtend(null));
        };
    }, []);

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="w-full min-h-[600px] flex items-center flex-col gap-[20px]">
            {groups?.map((group, index) => (
                <div className="w-[1000px]">
                    <GroupCard group={group} key={index} />
                </div>
            ))}
        </div>
    );
};

export default GroupSearch;
