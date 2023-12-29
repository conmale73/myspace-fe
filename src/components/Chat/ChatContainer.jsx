import ChatBox from "../ChatBox";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineMinimize, MdOutlineClose } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import UserInfoPreview from "../UserInfoPreview";
import {
    removeChat,
    closeChat,
} from "../../redux/currentChatList/currentChatListSlice";
import ImageViewer from "../ImageViewer";
import { messageService } from "../../services";
import {
    setCount,
    setHightlightChats,
} from "../../redux/unreadMessages/unreadMessagesSlice";
const ChatContainer = (props) => {
    const user = useSelector((state) => state.user.data);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    const count = useSelector((state) => state.unreadMessages.count);
    const hightlightChats = useSelector(
        (state) => state.unreadMessages.hightlightChats
    );
    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const handleOnClickChatContainer = async () => {
        const data = {
            user_id: user?._id,
        };
        const res = await messageService.readAllMessages(currentChat._id, data);
        dispatch(setCount(count - res.data.data));
        dispatch(
            setHightlightChats(
                hightlightChats?.filter((chat) => chat !== currentChat._id)
            )
        );
    };
    return (
        <>
            {" "}
            {user && (
                <>
                    {currentChat.group_id ? (
                        <div
                            className="chatContainer flex flex-col w-[330px]  bg-[#303030] h-[455px] scroll rounded-t-md shadow-lg"
                            onClick={() => handleOnClickChatContainer()}
                        >
                            <div
                                className="flex w-full h-[48px] bg-[#303030] pl-2 pt-2 pb-1
                border-b-[1px] border-[#545454] 
                "
                            >
                                <div className="w-full flex items-center">
                                    <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
                                        <ImageViewer
                                            image={currentChat.group_thumbnail}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p
                                        className="text-[16px] text-white text-center line-clamp-1"
                                        title={currentChat.group_name}
                                    >
                                        {currentChat.group_name}
                                    </p>
                                </div>
                                <div className="flex w-[45%] gap-[10px] justify-end items-center">
                                    <TiMinus
                                        size="20px"
                                        className="flex items-center w-fit h-fit hover:bg-[#545454] rounded-full cursor-pointer p-[5px]"
                                        onClick={() => {
                                            dispatch(closeChat());
                                        }}
                                    />
                                    <MdOutlineClose
                                        size="20px"
                                        className="flex items-center w-fit h-fit hover:bg-[#545454] rounded-full cursor-pointer p-[5px]"
                                        onClick={() => {
                                            dispatch(
                                                removeChat(currentChat._id)
                                            );
                                            dispatch(closeChat());
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[407px]">
                                <ChatBox
                                    chat_id={currentChat._id}
                                    showTextarea={true}
                                    text={text}
                                    setText={setText}
                                    singleChat={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="chatContainer flex flex-col w-[330px]  bg-[#303030] h-[455px] scroll rounded-t-md shadow-lg"
                            onClick={() => handleOnClickChatContainer()}
                        >
                            <div
                                className="flex w-full h-[48px] bg-[#303030] pl-2 pt-2 pb-1
                border-b-[1px] border-[#545454] 
                "
                            >
                                <div className="w-[50%]">
                                    <UserInfoPreview
                                        thumbnailHeight="40px"
                                        thumbnailWidth="40px"
                                        showName={true}
                                        bgStyles={false}
                                        link={true}
                                        user_id={currentChat.members.find(
                                            (member) => member !== user._id
                                        )}
                                        displayOnlineStatus={true}
                                    />
                                </div>
                                <div className="flex w-[45%] gap-[10px] justify-end items-center">
                                    <TiMinus
                                        size="20px"
                                        className="flex items-center w-fit h-fit hover:bg-[#545454] rounded-full cursor-pointer p-[5px]"
                                        onClick={() => {
                                            dispatch(closeChat());
                                        }}
                                    />
                                    <MdOutlineClose
                                        size="20px"
                                        className="flex items-center w-fit h-fit hover:bg-[#545454] rounded-full cursor-pointer p-[5px]"
                                        onClick={() => {
                                            dispatch(
                                                removeChat(currentChat._id)
                                            );
                                            dispatch(closeChat());
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[407px]">
                                <ChatBox
                                    chat_id={currentChat._id}
                                    showTextarea={true}
                                    text={text}
                                    setText={setText}
                                    singleChat={true}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ChatContainer;
