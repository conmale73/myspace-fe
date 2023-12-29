import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { SlOptions } from "react-icons/sl";
import { MdNotifications } from "react-icons/md";

import NotiList from "./NotiList/NotiList";
import { notificationService } from "../../../services";
import styles from "./NotificationButton.module.scss";

const NotificationButton = ({ open, setOpen }) => {
    const user = useSelector((state) => state.user.data);
    let location = useLocation();

    const [count, setCount] = useState(0);
    const fetchData = async () => {
        try {
            const res = await notificationService.countUnreadNotifications(
                user._id
            );
            setCount(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [location]);

    const handleDropdownState = () => {
        setOpen(!open);
    };

    const handleClickReadAll = async () => {
        try {
            const res = await notificationService.markAllAsRead(user._id);

            fetchData();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <DropdownMenu.Root
                open={open}
                onOpenChange={handleDropdownState}
                modal={false}
            >
                <DropdownMenu.Trigger asChild>
                    <div
                        className="relative"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <MdNotifications
                            className="text-[#bbbbbb] hover:text-[#ffffff] cursor-pointer"
                            size="24px"
                            title="Notifications"
                        />
                        {count > 0 && (
                            <div className="absolute top-[-5px] right-[-5px] rounded-full flex justify-center items-center">
                                <div className="w-[15px] h-[15px] rounded-full bg-[#ff0000] text-[10px] text-[#ffffff] flex justify-center items-center">
                                    {count}
                                </div>
                            </div>
                        )}
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="w-[400px] h-fit bg-[#303030] rounded-[10px] shadow-lg">
                        <div className="w-full flex items-center">
                            <div className="w-fit h-[50px] flex justify-start items-center text-[20px] font-bold pl-[10px]">
                                Notifications
                            </div>
                            <div
                                className={`flex w-fit h-[40px] items-center px-[5px] hover:bg-[#676668] cursor-pointer rounded-[10px] ml-auto mr-[10px] text-[15px]`}
                                onClick={() => handleClickReadAll()}
                            >
                                Mark all as read
                            </div>
                        </div>
                        <NotiList count={count} setCount={setCount} />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};

export default NotificationButton;
