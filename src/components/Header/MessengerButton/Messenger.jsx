import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import io from "socket.io-client";

import { BiSolidMessageRoundedDetail } from "react-icons/bi";

import styles from "./Messenger.module.scss";
import { messageService, groupChatService } from "../../../services";
import {
    setCount,
    setHightlightChats,
} from "../../../redux/unreadMessages/unreadMessagesSlice";
import ChatList from "../../ChatList";
import { socket } from "../../../socket";

const Messenger = ({ open, setOpen }) => {
    const user = useSelector((state) => state.user.data);
    const count = useSelector((state) => state.unreadMessages.count);
    const onlineUsers = useSelector((state) => state.onlineUsers.data);
    const handleStateDropdown = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const res = await messageService.countUnreadMessages(user._id);

            dispatch(setCount(res.data.data));
            dispatch(setHightlightChats(res.data.unreadChatIDs));

            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["unreadChats", user._id],
        queryFn: () => fetchData(),
    });

    useEffect(() => {
        if (user) {
            socket.on("receiveMessage", (message) => {
                fetchData();
            });
        }
    }, []);

    if (isLoading) return null;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }
    return (
        <DropdownMenu.Root
            modal={false}
            open={open}
            onOpenChange={handleStateDropdown}
        >
            <DropdownMenu.Trigger asChild>
                <div className={styles.button} onClick={() => setOpen(true)}>
                    {count > 0 && (
                        <div className="absolute top-[-5px] right-[-5px] rounded-full flex justify-center items-center z-[10]">
                            <div className="w-[15px] h-[15px] rounded-full bg-[#ff0000] text-[10px] text-[#ffffff] flex justify-center items-center">
                                {count}
                            </div>
                        </div>
                    )}
                    <BiSolidMessageRoundedDetail
                        className={styles.button}
                        size="24px"
                        title="Messages"
                    />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-[400px] h-fit min-h-[200px] bg-[#303030] rounded-[10px] shadow-lg">
                    <ChatList />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Messenger;
