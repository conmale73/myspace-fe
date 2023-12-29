import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { groupService } from "../../../../../services";
import ImageViewer from "../../../../../components/ImageViewer";
import { setGroupDetail } from "../../../../../redux/groupDetail/groupDetailSlice";

const PendingRequest = ({ groupRequest, group_id }) => {
    const user = useSelector((state) => state.user.data);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);

    const dispatch = useDispatch();

    const handleClickAccept = async () => {
        setIsAccepted(true);

        try {
            const data = {
                user_id: user._id,
                sender_id: groupRequest?._id,
                notification_id: groupRequest?.notification_id,
            };
            console.log(data);

            const res = await groupService.acceptRequestJoinGroup(
                group_id,
                data
            );
            console.log(res.data);
            dispatch(setGroupDetail(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickDecline = async () => {
        setIsDeclined(true);

        try {
            const data = {
                user_id: user._id,
                sender_id: groupRequest?._id,
                notification_id: groupRequest?.notification_id,
            };
            console.log(data);
            const res = await groupService.declineRequestJoinGroup(
                group_id,
                data
            );
            dispatch(setGroupDetail(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };
    console.log(groupRequest);
    return (
        <div className="min-w-[200px] min-h-[350px] bg-[#454545] flex flex-col p-[5px] rounded-[10px] gap-[10px] overflow-hidden relative">
            <div className="flex w-full h-[180px] justify-center items-center">
                {groupRequest?.avatar?.files && (
                    <ImageViewer image={groupRequest?.avatar?.files[0]} />
                )}
            </div>
            <div className="flex flex-col p-[5px] items-start gap-[5px] ">
                <div className="flex w-full text-ellipsis line-clamp-1 font-[600] text-[18px]">
                    <Link to={`/profile/${groupRequest?._id}`}>
                        {groupRequest?.username}
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-[5px] p-[5px] mt-auto w-full">
                {!isAccepted && !isDeclined && (
                    <>
                        <div
                            className="flex justify-center items-center w-full h-[50px] bg-[#555555] cursor-pointer hover:bg-[#606060] rounded-[10px] font-[600] shadow-lg border-[1px] border-[#303030]"
                            onClick={() => handleClickAccept()}
                        >
                            Accept
                        </div>
                        <div
                            className="flex justify-center items-center w-full h-[50px] bg-[#454545] cursor-pointer hover:bg-[#505050] rounded-[10px] font-[500] shadow-lg border-[1px] border-[#303030]"
                            onClick={() => handleClickDecline()}
                        >
                            Decline
                        </div>
                    </>
                )}
                {isDeclined && (
                    <div className="opacity-70 flex justify-center items-center w-full h-[50px] bg-[#555555] cursor-not-allowed hover:bg-[#606060] rounded-[10px] font-[600]">
                        Request declined
                    </div>
                )}
                {isAccepted && (
                    <div className="opacity-70 flex justify-center items-center w-full h-[50px] bg-[#555555] cursor-not-allowed hover:bg-[#606060] rounded-[10px] font-[600]">
                        Request accepted
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingRequest;
