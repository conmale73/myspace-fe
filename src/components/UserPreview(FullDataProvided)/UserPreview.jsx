import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageViewer from "../ImageViewer";
const UserPreview = ({
    userData,
    thumbnailWidth,
    thumbnailHeight,
    bgStyles,
    link,
    lastMessage,
    showName,
    nameOnly,
    displayOnlineStatus,
}) => {
    const user = useSelector((state) => state.user.data);
    const onlineUsers = useSelector((state) => state.onlineUsers.data);

    if (userData._id === user?._id) {
        return (
            <>
                <HoverCard.Root>
                    {nameOnly ? (
                        <HoverCard.Trigger asChild>
                            {link ? (
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="w-fit"
                                >
                                    <div
                                        className="w-fit text-[18px] line-clamp-1 hover:underline"
                                        title={user.username}
                                    >
                                        {user.username}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="w-fit text-[18px] line-clamp-1"
                                    title={user.username}
                                >
                                    {user.username}
                                </div>
                            )}
                        </HoverCard.Trigger>
                    ) : (
                        <>
                            {bgStyles ? (
                                <div
                                    className={`flex items-center gap-[5px] hover:bg-[#545454] w-full p-[5px] rounded-[10px]`}
                                >
                                    <HoverCard.Trigger asChild>
                                        <div
                                            className="relative border-[1px] border-[#545454] rounded-full"
                                            style={{
                                                minWidth: thumbnailWidth,
                                                minHeight: thumbnailHeight,
                                                width: thumbnailWidth,
                                                height: thumbnailHeight,
                                            }}
                                        >
                                            <img
                                                loading="lazy"
                                                className={`w-full h-full object-contain rounded-full`}
                                                src={`data:${user.avatar?.files[0]?.fileInfo?.type};base64,${user.avatar?.files[0]?.dataURL}`}
                                                alt={user.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    <div
                                                        className="w-[15px] h-[15px] absolute bottom-[-3px] 
                                right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                                    ></div>
                                                </>
                                            )}
                                        </div>
                                    </HoverCard.Trigger>
                                    {showName && (
                                        <>
                                            {link ? (
                                                <Link
                                                    to={`/profile/${user._id}`}
                                                    className="w-fit"
                                                >
                                                    <div
                                                        className="w-fit text-[18px] line-clamp-1 hover:underline"
                                                        title={user.username}
                                                    >
                                                        {user.username}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div
                                                    className="text-[18px] line-clamp-1"
                                                    title={user.username}
                                                >
                                                    {user.username}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className={`flex items-center gap-[5px]`}>
                                    <HoverCard.Trigger asChild>
                                        <div
                                            className="w-fit h-fit relative border-[1px] border-[#676668] rounded-full"
                                            style={{
                                                minWidth: thumbnailWidth,
                                                minHeight: thumbnailHeight,
                                                width: thumbnailWidth,
                                                height: thumbnailHeight,
                                            }}
                                        >
                                            <img
                                                loading="lazy"
                                                className={`w-full h-full object-contain rounded-full`}
                                                src={`data:${user.avatar?.files[0]?.fileInfo?.type};base64,${user.avatar?.files[0]?.dataURL}`}
                                                alt={user.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    {onlineUsers?.some(
                                                        (user) =>
                                                            user?.user_id ===
                                                            user._id
                                                    ) && (
                                                        <div
                                                            className="w-[15px] h-[15px] absolute bottom-[-3px] 
                                right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                                        ></div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </HoverCard.Trigger>
                                    <div className="flex flex-col w-[90%]">
                                        {showName && (
                                            <>
                                                {link ? (
                                                    <Link
                                                        to={`/profile/${user._id}`}
                                                        className="w-fit"
                                                    >
                                                        <div
                                                            className="w-fit text-[18px] line-clamp-1 hover:underline"
                                                            title={
                                                                user.username
                                                            }
                                                        >
                                                            {user.username}
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="text-[18px] line-clamp-1"
                                                        title={user.username}
                                                    >
                                                        {user.username}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {lastMessage && (
                                            <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                                {`${
                                                    lastMessage?.sender_id ===
                                                    user._id
                                                        ? "You"
                                                        : lastMessage?.sender_name
                                                }: ${lastMessage?.content}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <HoverCard.Portal>
                        <HoverCard.Content
                            className="data-[side=bottom]:animate-slideUpAndFade 
                            data-[side=right]:animate-slideLeftAndFade 
                            data-[side=left]:animate-slideRightAndFade 
                            data-[side=top]:animate-slideDownAndFade 
                            data-[state=open]:transition-all
                            w-[300px] rounded-md bg-[#303030] p-5 
                            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] "
                            sideOffset={5}
                        >
                            <div className="flex flex-col gap-[7px]">
                                {user.avatar?.files[0] && (
                                    <div className="flex justify-center w-full">
                                        <div className="w-[100px] h-[100px]">
                                            <ImageViewer
                                                image={user.avatar?.files[0]}
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col gap-[15px]">
                                    <div>
                                        <Link
                                            to={`/profile/${user._id}`}
                                            className="w-fit"
                                        >
                                            <div className="w-fit text-[18px] line-clamp-1 max-w-[100%] hover:underline m-0  font-medium leading-[1.5]">
                                                {user.username}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="flex gap-[5px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Email:</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="flex gap-[10px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Intro:</p>
                                        <p>{user.description}</p>
                                    </div>
                                    {/* <div className="flex m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Music:</p>
                                        {user.musicType.map((type, index) => (
                                            <div
                                                key={index}
                                                className="ml-[10px]"
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            </div>

                            <HoverCard.Arrow className="fill-[#303030]" />
                        </HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </>
        );
    } else {
        return (
            <>
                <HoverCard.Root>
                    {nameOnly ? (
                        <HoverCard.Trigger asChild>
                            {link ? (
                                <Link
                                    to={`/profile/${userData._id}`}
                                    className="flex w-fit"
                                >
                                    <div
                                        className="w-fit text-[18px] line-clamp-1 hover:underline"
                                        title={userData.username}
                                    >
                                        {userData.username}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="text-[18px] line-clamp-1"
                                    title={userData.username}
                                >
                                    {userData.username}
                                </div>
                            )}
                        </HoverCard.Trigger>
                    ) : (
                        <>
                            {bgStyles ? (
                                <div
                                    className={`flex items-center gap-[5px] hover:bg-[#545454] w-full p-[5px] rounded-[10px]`}
                                >
                                    <HoverCard.Trigger asChild>
                                        <div
                                            className="relative border-[1px] border-[#545454] rounded-full"
                                            style={{
                                                minWidth: thumbnailWidth,
                                                minHeight: thumbnailHeight,
                                                width: thumbnailWidth,
                                                height: thumbnailHeight,
                                            }}
                                        >
                                            <img
                                                loading="lazy"
                                                className={`w-full h-full object-contain rounded-full`}
                                                src={`data:${userData?.avatar?.files[0]?.fileInfo?.type};base64,${userData?.avatar?.files[0]?.dataURL}`}
                                                alt={userData.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    {onlineUsers?.some(
                                                        (user) =>
                                                            user?.user_id ===
                                                            userData._id
                                                    ) && (
                                                        <div
                                                            className="w-[15px] h-[15px] absolute bottom-[-3px] 
                                right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                                        ></div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </HoverCard.Trigger>
                                    {showName && (
                                        <>
                                            {link ? (
                                                <Link
                                                    to={`/profile/${userData._id}`}
                                                    className="w-fit"
                                                >
                                                    <div
                                                        className="w-fit text-[18px] line-clamp-1 hover:underline"
                                                        title={
                                                            userData.username
                                                        }
                                                    >
                                                        {userData.username}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div
                                                    className="text-[18px] line-clamp-1"
                                                    title={userData.username}
                                                >
                                                    {userData.username}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className={`flex items-center gap-[5px]`}>
                                    <HoverCard.Trigger asChild>
                                        <div
                                            className="w-fit h-fit relative border-[1px] border-[#676668] rounded-full"
                                            style={{
                                                minWidth: thumbnailWidth,
                                                minHeight: thumbnailHeight,
                                                width: thumbnailWidth,
                                                height: thumbnailHeight,
                                            }}
                                        >
                                            <img
                                                loading="lazy"
                                                className={`w-full h-full object-contain rounded-full`}
                                                src={`data:${userData?.avatar?.files[0]?.fileInfo?.type};base64,${userData?.avatar?.files[0]?.dataURL}`}
                                                alt={userData.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    {onlineUsers?.some(
                                                        (user) =>
                                                            user?.user_id ===
                                                            userData._id
                                                    ) && (
                                                        <div
                                                            className="w-[15px] h-[15px] absolute bottom-[-3px] 
                                right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                                        ></div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </HoverCard.Trigger>
                                    <div className="flex flex-col w-[90%]">
                                        {showName && (
                                            <>
                                                {link ? (
                                                    <Link
                                                        to={`/profile/${userData._id}`}
                                                        className="w-fit"
                                                    >
                                                        <div
                                                            className="w-fit text-[18px] line-clamp-1 hover:underline"
                                                            title={
                                                                userData.username
                                                            }
                                                        >
                                                            {userData.username}
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="text-[18px] line-clamp-1"
                                                        title={
                                                            userData.username
                                                        }
                                                    >
                                                        {userData.username}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {lastMessage && (
                                            <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                                {`${
                                                    lastMessage?.sender_id ===
                                                    user._id
                                                        ? "You"
                                                        : lastMessage?.sender_name
                                                }: ${lastMessage?.content}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <HoverCard.Portal>
                        <HoverCard.Content
                            className="data-[side=bottom]:animate-slideUpAndFade 
                            data-[side=right]:animate-slideLeftAndFade 
                            data-[side=left]:animate-slideRightAndFade 
                            data-[side=top]:animate-slideDownAndFade 
                            data-[state=open]:transition-all
                            w-[300px] rounded-md bg-[#303030] p-5 
                            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] "
                            sideOffset={5}
                        >
                            <div className="flex flex-col gap-[7px]">
                                {userData?.avatar?.files[0] && (
                                    <div className="flex justify-center w-full">
                                        <div className="w-[100px] h-[100px]">
                                            <ImageViewer
                                                image={
                                                    userData?.avatar?.files[0]
                                                }
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col gap-[15px]">
                                    <div>
                                        <Link
                                            to={`/profile/${userData._id}`}
                                            className="w-fit"
                                        >
                                            <div className="w-fit text-[18px] line-clamp-1 max-w-[100%] hover:underline m-0  font-medium leading-[1.5]">
                                                {userData.username}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="flex gap-[5px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Email:</p>
                                        <p>{userData.email}</p>
                                    </div>
                                    <div className="flex gap-[10px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Intro:</p>
                                        <p>{userData.description}</p>
                                    </div>
                                    {/* <div className="flex m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Music:</p>
                                        {userData.musicType.map(
                                            (type, index) => (
                                                <div
                                                    key={index}
                                                    className="ml-[10px]"
                                                >
                                                    {type}
                                                </div>
                                            )
                                        )}
                                    </div> */}
                                </div>
                            </div>

                            <HoverCard.Arrow className="fill-[#303030]" />
                        </HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </>
        );
    }
};

export default UserPreview;
