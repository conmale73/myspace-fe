import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { userService } from "../../services";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageViewer from "../ImageViewer";
const UserInfoPreview = ({
    thumbnailWidth,
    thumbnailHeight,
    bgStyles,
    user_id,
    link,
    lastMessage,
    hightlightLastMessage,
    showName,
    nameOnly,
    displayOnlineStatus,
}) => {
    const onlineUsers = useSelector((state) => state.onlineUsers.data);
    const user = useSelector((state) => state.user.data);

    if (user_id === user?._id) {
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
                                        className="w-fit text-[20px] line-clamp-1 hover:underline"
                                        title={user.username}
                                    >
                                        {user.username}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="text-[20px] line-clamp-1"
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
                                                        className="w-fit text-[20px] line-clamp-1 hover:underline"
                                                        title={user.username}
                                                    >
                                                        {user.username}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div
                                                    className="text-[20px] line-clamp-1"
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
                                                    <div
                                                        className="w-[15px] h-[15px] absolute bottom-[-3px] 
                                right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                                    ></div>
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
                                                            className="w-fit text-[20px] line-clamp-1 hover:underline"
                                                            title={
                                                                user.username
                                                            }
                                                        >
                                                            {user.username}
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="text-[20px] line-clamp-1"
                                                        title={user.username}
                                                    >
                                                        {user.username}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {lastMessage && (
                                            <>
                                                {hightlightLastMessage ? (
                                                    <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[600] text-[#e4e6eb]">
                                                        {`${
                                                            lastMessage?.sender_id ===
                                                            user._id
                                                                ? "You"
                                                                : lastMessage?.sender_name
                                                        }: ${
                                                            lastMessage?.content
                                                        }`}
                                                    </p>
                                                ) : (
                                                    <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                                        {`${
                                                            lastMessage?.sender_id ===
                                                            user._id
                                                                ? "You"
                                                                : lastMessage?.sender_name
                                                        }: ${
                                                            lastMessage?.content
                                                        }`}
                                                    </p>
                                                )}
                                            </>
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
                                            <div className="w-fit text-[20px] line-clamp-1 max-w-[100%] hover:underline m-0  font-medium leading-[1.5]">
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
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["userInfoPreview", user_id],
            queryFn: () =>
                userService.getUserById(user_id).then((res) => res.data.data),
        });
        if (isLoading) return <Loading />;
        if (error) return <p>{error.message}</p>;

        return (
            <>
                <HoverCard.Root>
                    {nameOnly ? (
                        <HoverCard.Trigger asChild>
                            {link ? (
                                <Link
                                    to={`/profile/${data._id}`}
                                    className="w-fit"
                                >
                                    <div
                                        className="w-fit text-[20px] line-clamp-1 hover:underline"
                                        title={data.username}
                                    >
                                        {data.username}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="text-[20px] line-clamp-1"
                                    title={data.username}
                                >
                                    {data.username}
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
                                                src={`data:${data?.avatar?.files[0]?.fileInfo?.type};base64,${data?.avatar?.files[0]?.dataURL}`}
                                                alt={data.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    {onlineUsers?.some(
                                                        (user) =>
                                                            user?.user_id ===
                                                            data._id
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
                                                    to={`/profile/${data._id}`}
                                                    className="w-fit"
                                                >
                                                    <div
                                                        className="w-fit text-[20px] line-clamp-1 hover:underline"
                                                        title={data.username}
                                                    >
                                                        {data.username}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div
                                                    className="text-[20px] line-clamp-1"
                                                    title={data.username}
                                                >
                                                    {data.username}
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
                                                src={`data:${data?.avatar?.files[0]?.fileInfo?.type};base64,${data?.avatar?.files[0]?.dataURL}`}
                                                alt={data.username}
                                            />
                                            {displayOnlineStatus && (
                                                <>
                                                    {onlineUsers?.some(
                                                        (user) =>
                                                            user?.user_id ===
                                                            data._id
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
                                                        to={`/profile/${data._id}`}
                                                        className="w-fit"
                                                    >
                                                        <div
                                                            className="w-fit text-[20px] line-clamp-1 hover:underline"
                                                            title={
                                                                data.username
                                                            }
                                                        >
                                                            {data.username}
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="text-[20px] line-clamp-1"
                                                        title={data.username}
                                                    >
                                                        {data.username}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {lastMessage && (
                                            <>
                                                {hightlightLastMessage ? (
                                                    <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[600] text-[#e4e6eb]">
                                                        {`${
                                                            lastMessage?.sender_id ===
                                                            user._id
                                                                ? "You"
                                                                : lastMessage?.sender_name
                                                        }: ${
                                                            lastMessage?.content
                                                        }`}
                                                    </p>
                                                ) : (
                                                    <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                                        {`${
                                                            lastMessage?.sender_id ===
                                                            user._id
                                                                ? "You"
                                                                : lastMessage?.sender_name
                                                        }: ${
                                                            lastMessage?.content
                                                        }`}
                                                    </p>
                                                )}
                                            </>
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
                                {data?.avatar?.files[0] && (
                                    <div className="flex justify-center w-full">
                                        <div className="w-[100px] h-[100px]">
                                            <ImageViewer
                                                image={data?.avatar?.files[0]}
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col gap-[15px]">
                                    <div>
                                        <Link
                                            to={`/profile/${data._id}`}
                                            className="w-fit"
                                        >
                                            <div className="w-fit text-[20px] line-clamp-1 max-w-[100%] hover:underline m-0  font-medium leading-[1.5]">
                                                {data.username}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="flex gap-[5px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Email:</p>
                                        <p>{data.email}</p>
                                    </div>
                                    <div className="flex gap-[10px] m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Intro:</p>
                                        <p>{data.description}</p>
                                    </div>
                                    {/* <div className="flex m-0 text-[15px] leading-[1.5]">
                                        <p className="font-bold">Music:</p>
                                        {data.musicType.map((type, index) => (
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
    }
};
export default UserInfoPreview;
