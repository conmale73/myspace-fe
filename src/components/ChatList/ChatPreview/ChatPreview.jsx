import UserInfoPreview from "../../UserInfoPreview";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    openChat,
    addChat,
} from "../../../redux/currentChatList/currentChatListSlice";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "../../../services";
import Loading from "../../Loading";
import {
    setCount,
    setHightlightChats,
} from "../../../redux/unreadMessages/unreadMessagesSlice";
const ChatPreview = (props) => {
    const user = useSelector((state) => state.user.data);
    const hightlightChats = useSelector(
        (state) => state.unreadMessages.hightlightChats
    );
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState(props.lastMessage);
    const count = useSelector((state) => state.unreadMessages.count);
    const handleOnClick = async () => {
        dispatch(addChat(props.chat));
        dispatch(openChat(props.chat));

        const data = {
            user_id: user._id,
        };
        const res = await messageService.readAllMessages(props.chat._id, data);
        console.log(res.data.data);
        dispatch(setCount(count - res.data.data));
        dispatch(
            setHightlightChats(
                hightlightChats.filter((chat) => chat !== props.chat._id)
            )
        );
    };

    return (
        <>
            {hightlightChats?.some((chat) => chat == props.chat?._id) ? (
                <div
                    className="chatPreviewContainer w-full h-[80px] p-[5px] rounded-[5px]"
                    key={props.index}
                >
                    <div
                        className="p-[5px] m-[5px] hover:bg-[#505050] rounded-[10px] cursor-pointer text-[18px] relative"
                        onClick={handleOnClick}
                    >
                        <div className="absolute border-[2px] border-neutral-950 w-[15px] h-[15px] top-[50%] translate-y-[-50%] translate-x-[-50%] right-[20px] rounded-full flex justify-center items-center bg-[#e4e6eb]"></div>
                        {props.chat?.group_id ? (
                            <div className="flex gap-[5px]">
                                <img
                                    className="w-[50px] h-[50px] rounded-full object-contain border-[1px] border-[#505050]"
                                    src={`data:${props.chat?.group_thumbnail?.fileInfo?.type};base64,${props.chat?.group_thumbnail?.dataURL}`}
                                    alt=""
                                />
                                <div className="flex flex-col flex-1">
                                    <p className="text-[18px] line-clamp-1 max-w-[100%] text-[#e4e6eb] font-bold">
                                        {props.chat?.group_name}
                                    </p>
                                    <p
                                        className="text-[14px] text-ellipsis line-clamp-1 
                            max-w-[100%] font-[600] text-[#e4e6eb]"
                                    >
                                        {`${
                                            lastMessage?.sender_id === user._id
                                                ? "You"
                                                : lastMessage?.sender_name
                                        }: ${lastMessage?.content}`}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <UserInfoPreview
                                    thumbnailHeight="50px"
                                    thumbnailWidth="50px"
                                    showName={true}
                                    bgStyles={false}
                                    user_id={props.chat?.members.find(
                                        (member) => member !== user._id
                                    )}
                                    lastMessage={lastMessage}
                                    displayOnlineStatus={true}
                                    hightlightLastMessage={true}
                                />
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className="chatPreviewContainer w-full h-[80px] p-[5px] rounded-[5px]"
                    key={props.index}
                >
                    <div
                        className="p-[5px] m-[5px] hover:bg-[#505050] rounded-[10px] cursor-pointer text-[18px]"
                        onClick={handleOnClick}
                    >
                        {props.chat?.group_id ? (
                            <div className="flex gap-[5px]">
                                <img
                                    className="w-[50px] h-[50px] rounded-full object-contain border-[1px] border-[#505050]"
                                    src={`data:${props.chat?.group_thumbnail?.fileInfo?.type};base64,${props.chat?.group_thumbnail?.dataURL}`}
                                    alt=""
                                />
                                <div className="flex flex-col flex-1">
                                    <p className="text-[18px] line-clamp-1 max-w-[100%]">
                                        {props.chat?.group_name}
                                    </p>
                                    <p
                                        className="text-[14px] text-ellipsis line-clamp-1 
                            max-w-[100%] font-[400] text-[#adadad]"
                                    >
                                        {`${
                                            lastMessage?.sender_id === user._id
                                                ? "You"
                                                : lastMessage?.sender_name
                                        }: ${lastMessage?.content}`}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <UserInfoPreview
                                    thumbnailHeight="50px"
                                    thumbnailWidth="50px"
                                    showName={true}
                                    bgStyles={false}
                                    user_id={props.chat?.members.find(
                                        (member) => member !== user._id
                                    )}
                                    lastMessage={lastMessage}
                                    displayOnlineStatus={true}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatPreview;
