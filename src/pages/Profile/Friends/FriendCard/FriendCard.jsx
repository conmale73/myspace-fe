import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";

const FriendCard = ({ friend, user }) => {
    const mutualFriends = friend.friendList.filter((item) =>
        user.friendList.includes(item)
    );
    return (
        <div
            key={friend._id}
            className="flex gap-[10px] w-[30%] h-[90px] p-[5px] hover:bg-[#404040] rounded-[10px] items-center"
        >
            <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden">
                <UserPreview
                    thumbnailHeight="60px"
                    thumbnailWidth="60px"
                    bgStyles={false}
                    userData={friend}
                    displayOnlineStatus={true}
                    key={friend._id}
                    link={true}
                    showName={false}
                />
            </div>
            <div className="flex flex-col justify-center flex-1">
                <div className="text-lg font-bold">
                    <UserPreview
                        nameOnly={true}
                        userData={friend}
                        key={friend._id}
                        link={true}
                    />
                </div>
                <div className="text-[16px] text-[#adadad]">
                    {mutualFriends.length > 0 && (
                        <>{mutualFriends.length} mutual friends</>
                    )}
                </div>
            </div>
        </div>
    );
};
export default FriendCard;
