import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { userService } from "../../../../services";
import ImageViewer from "../../../../components/ImageViewer";
import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";

const FriendRequest = ({ friendRequest }) => {
    const user = useSelector((state) => state.user.data);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);

    const [mutualFriends, setMutualFriends] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const getMutualFriends = async () => {
        const res = await userService.getMutualFriends(
            friendRequest._id,
            user._id,
            1,
            1000
        );
        setMutualFriends(res.data.data);
        setTotalResults(res.data.totalResults);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["mutualFriends", friendRequest._id],
        queryFn: getMutualFriends,
    });

    if (isLoading) return null;
    if (error) return <p>{error.message}</p>;

    const handleClickAccept = async () => {
        setIsAccepted(true);

        try {
            const data = {
                user_id: user._id,
                friend_id: friendRequest._id,
                notification_id: friendRequest?.friendRequestSent?.find(
                    (request) => request.user_id == user._id
                ).notification_id,
            };
            console.log(data);

            const res = await userService.acceptFriendRequest(data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickDecline = async () => {
        setIsDeclined(true);

        try {
            const data = {
                user_id: user._id,
                friend_id: friendRequest._id,
                notification_id: friendRequest?.friendRequestSent?.find(
                    (request) => request.user_id == user._id
                ).notification_id,
            };
            console.log(data);
            const res = await userService.declineFriendRequest(data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-w-[200px] min-h-[350px] bg-[#303030] flex flex-col p-[5px] rounded-[10px] gap-[10px] overflow-hidden relative">
            <div className="flex w-full h-[200px] justify-center items-center">
                {friendRequest?.avatar ? (
                    <ImageViewer
                        image={friendRequest?.avatar?.files[0]}
                        objectFit="contain"
                    />
                ) : null}
            </div>
            <div className="flex flex-col p-[5px] items-start gap-[5px] ">
                <div className="flex w-full text-ellipsis line-clamp-1 font-[600] text-[18px]">
                    <Link to={`/profile/${friendRequest._id}`}>
                        {friendRequest?.username}
                    </Link>
                </div>
                {totalResults > 0 ? (
                    <div className="flex w-full">
                        <div className="relative">
                            {mutualFriends?.map((friend, index) => {
                                const left = index * 10;
                                if (index > 2) return null;
                                return (
                                    <div
                                        className="absolute"
                                        key={index}
                                        style={{
                                            left: `${left}px`,
                                            zIndex: `${index}`,
                                        }}
                                    >
                                        <UserPreview
                                            thumbnailHeight="20px"
                                            thumbnailWidth="20px"
                                            bgStyles={false}
                                            userData={friend}
                                            showName={false}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {mutualFriends.length == 1 ? (
                            <div className="ml-[30px] text-[14px] font-[500] text-[#adadad]">{`${totalResults} mutual friends`}</div>
                        ) : (
                            <div className="ml-[50px] text-[14px] font-[500] text-[#adadad]">{`${totalResults} mutual friends`}</div>
                        )}
                    </div>
                ) : null}
            </div>
            <div className="flex flex-col gap-[5px] p-[5px] mt-auto w-full">
                {!isAccepted && !isDeclined && (
                    <>
                        <div
                            className="flex justify-center items-center w-full h-[50px] bg-[#505050] cursor-pointer hover:bg-[#555555] rounded-[10px] font-[600]"
                            onClick={() => handleClickAccept()}
                        >
                            Confirm
                        </div>
                        <div
                            className="flex justify-center items-center w-full h-[50px] bg-[#404040] cursor-pointer hover:bg-[#454545] rounded-[10px] font-[500]"
                            onClick={() => handleClickDecline()}
                        >
                            Decline
                        </div>
                    </>
                )}
                {isDeclined && (
                    <div className="opacity-70 flex justify-center items-center w-full h-[50px] bg-[#505050] cursor-not-allowed hover:bg-[#555555] rounded-[10px] font-[600]">
                        Request declined
                    </div>
                )}
                {isAccepted && (
                    <div className="opacity-70 flex justify-center items-center w-full h-[50px] bg-[#505050] cursor-not-allowed hover:bg-[#555555] rounded-[10px] font-[600]">
                        Request accepted
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendRequest;
