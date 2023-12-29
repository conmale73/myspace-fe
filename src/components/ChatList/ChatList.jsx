import { useQuery } from "@tanstack/react-query";
import { groupChatService } from "../../services";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../Loading";
import ChatPreview from "./ChatPreview";
import { setHightlightChats } from "../../redux/unreadMessages/unreadMessagesSlice";
const ChatList = () => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async () => {
        try {
            const res = await groupChatService.getChatsHaveMessagesByUserID(
                user._id,
                page,
                limit
            );
            setChats(res.data.data);
            setTotalPages(res.data.totalPages);
            dispatch(setHightlightChats(res.data.unreadChatIDs));
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["chats", user._id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }
    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await groupChatService.getChatsHaveMessagesByUserID(
                user._id,
                page + 1,
                limit
            );
            setChats((chats) => [...chats, ...res.data.data]);
        }
    };
    return (
        <div className="w-full h-fit max-h-[800px] overflow-y-auto">
            {chats.length === 0 && (
                <div className="text-center text-[20px] text-[#e4e6eb] mt-4">
                    No chat found
                </div>
            )}
            {chats?.map((chat, index) => {
                return (
                    <ChatPreview
                        index={index}
                        chat={chat}
                        key={index}
                        lastMessage={chat.last_message}
                    />
                );
            })}
            {page < totalPages ? (
                <p
                    className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer my-[20px]"
                    onClick={handleClickLoadMore}
                >
                    Load more...
                </p>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ChatList;
