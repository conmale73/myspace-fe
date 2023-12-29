import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { userService } from "../../../../services";
import ImageViewer from "../../../../components/ImageViewer";
import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";

const Friend = ({ friend }) => {
    const user = useSelector((state) => state.user.data);
    const [isUnfriended, setIsUnfriended] = useState(false);

    const [mutualFriends, setMutualFriends] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const getMutualFriends = async () => {
        const res = await userService.getMutualFriends(
            friend._id,
            user._id,
            1,
            1000
        );
        setMutualFriends(res.data.data);
        setTotalResults(res.data.totalResults);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["mutualFriends", friend._id],
        queryFn: getMutualFriends,
    });

    if (isLoading) return null;
    if (error) return <p>{error.message}</p>;

    const handleClickRemoveFriend = async () => {
        setIsUnfriended(true);
        try {
            const data = {
                user_id: user._id,
                friend_id: friend._id,
            };
            const res = await userService.removeFriend(data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-w-[200px] min-h-[350px] bg-[#303030] flex flex-col p-[5px] rounded-[10px] gap-[10px] overflow-hidden relative">
            <div className="flex w-full h-[200px] justify-center items-center">
                {friend?.avatar ? (
                    <ImageViewer
                        image={friend?.avatar?.files[0]}
                        objectFit="contain"
                    />
                ) : null}
            </div>
            <div className="flex flex-col p-[5px] items-start gap-[5px] ">
                <div className="flex w-full text-ellipsis line-clamp-1 font-[600] text-[18px]">
                    <Link to={`/profile/${friend._id}`}>
                        {friend?.username}
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
                {!isUnfriended && (
                    <>
                        <div
                            className="flex justify-center items-center w-full h-[50px] bg-[#505050] cursor-pointer hover:bg-[#555555] rounded-[10px] font-[600]"
                            onClick={() => handleClickRemoveFriend()}
                        >
                            Remove Friend
                        </div>
                    </>
                )}
                {isUnfriended && (
                    <div className="opacity-70 flex justify-center items-center w-full h-[50px] bg-[#505050] cursor-not-allowed hover:bg-[#555555] rounded-[10px] font-[600]">
                        Friend removed
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friend;
