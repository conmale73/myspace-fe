import { useSelector, useDispatch } from "react-redux";
import {
    openChat,
    removeChat,
    closeChat,
} from "../../../redux/currentChatList/currentChatListSlice";
import UserInfoPreview from "../../UserInfoPreview";
import { IoMdClose } from "react-icons/io";
import * as Tooltip from "@radix-ui/react-tooltip";

const ChatThumbnail = ({ index, chat }) => {
    const dispatch = useDispatch();
    const currentChatList = useSelector((state) => state.currentChatList.list);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    const user = useSelector((state) => state.user.data);

    let otherUser = chat.members.find((member) => member !== user._id);

    if (chat.members[0] == user._id && chat.members[1] == user._id) {
        otherUser = user._id;
    }
    const handleClickChatThumbnail = (chat) => {
        dispatch(openChat(chat));
        if (chat._id === currentChat._id) {
            dispatch(closeChat());
        } else {
            dispatch(openChat(chat));
        }
    };
    return (
        <>
            {chat.group_id != null ? (
                <>
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <div
                                    className="flex w-fit h-fit cursor-pointer relative flex-[1_0_21%]"
                                    key={index}
                                >
                                    <div
                                        onClick={() =>
                                            handleClickChatThumbnail(chat)
                                        }
                                    >
                                        <img
                                            loading="lazy"
                                            className={`w-full h-full object-contain rounded-full`}
                                            src={`data:${chat.group_thumbnail.fileInfo.type};base64,${chat.group_thumbnail.dataURL}`}
                                        />
                                    </div>

                                    <div>
                                        <IoMdClose
                                            size="20px"
                                            className="w-fit h-fit rounded-full bg-[#555555] hover:bg-[#676668] 
                absolute top-[-10px] text-[#ffffff] right-[-10px] text-[10px] cursor-pointer hover:scale-125"
                                            onClick={() => {
                                                dispatch(removeChat(chat._id));
                                                dispatch(closeChat());
                                            }}
                                        />
                                    </div>
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
                                                data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
                                                data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
                                                data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
                                                text-[#adadad] select-none rounded-[4px] bg-[#3b3b3b] 
                                                px-[15px] py-[10px] text-[15px] leading-none 
                                                shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                                                will-change-[transform,opacity]"
                                    sideOffset={5}
                                >
                                    {chat.group_name}
                                    <Tooltip.Arrow className="fill-[#3b3b3b]" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </>
            ) : (
                <div
                    className="flex w-fit h-fit cursor-pointer relative flex-[1_0_21%]"
                    key={index}
                >
                    <div onClick={() => handleClickChatThumbnail(chat)}>
                        <UserInfoPreview
                            thumbnailHeight="40px"
                            thumbnailWidth="40px"
                            showName={false}
                            bgStyles={false}
                            user_id={otherUser}
                            displayOnlineStatus={true}
                        />
                    </div>

                    <div>
                        <IoMdClose
                            size="20px"
                            className="w-fit h-fit rounded-full bg-[#555555] hover:bg-[#676668] 
                    absolute top-[-10px] text-[#ffffff] right-[-10px] text-[10px] cursor-pointer hover:scale-125"
                            onClick={() => {
                                dispatch(removeChat(chat._id));
                                dispatch(closeChat());
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
export default ChatThumbnail;
