import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { SlOptions } from "react-icons/sl";
import { IoMdPersonAdd, IoMdPerson } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";

import UserInfoPreview from "../../../../UserInfoPreview";
import { notificationService } from "../../../../../services";
import styles from "./NotificationCard.module.scss";
import FormatDate from "../../../../../utils/FormatDate";

const NotificationCard = ({
    notification,
    notifications,
    setNotifications,
    count,
    setCount,
}) => {
    const [notifi, setNotifi] = useState(notification);
    const [open, setOpen] = useState(false);
    const handleClickNoti = async () => {
        try {
            setOpen(false);
            if (notifi.read) return;
            const res = await notificationService.markAsRead(notification._id);
            setNotifi(res.data.data);
            setCount(count - 1);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickRemove = async () => {
        try {
            const res = await notificationService.deleteNotification(
                notification._id
            );
            setNotifications(
                notifications.filter((noti) => noti._id !== notification._id)
            );
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    };
    const handleState = () => {
        setOpen(!open);
    };
    return (
        <>
            {notifi && (
                <div
                    className={`${styles.notiCard} w-full min-h-[70px] max-h-[100px] relative`}
                    key={notifi._id}
                    onClick={() => handleClickNoti()}
                >
                    <DropdownMenu.Root
                        open={open}
                        onOpenChange={() => handleState()}
                    >
                        <DropdownMenu.Trigger asChild>
                            <div
                                className={`${styles.notiCardButton} rounded-full absolute top-[50%] translate-x-[-50%] translate-y-[-50%] right-[30px] p-[5px]`}
                            >
                                <SlOptions className="w-[20px] h-[20px] cursor-pointer" />
                            </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="w-[300px] h-fit min-h-[100px] bg-[#404040] 
                        p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] 
                        will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade 
                        data-[side=right]:animate-slideLeftAndFade 
                        data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            >
                                <div className="flex flex-col gap-[10px]">
                                    <div
                                        className="flex justify-center items-center w-full h-[50px] gap-[10px] hover:bg-[#505050] cursor-pointer rounded-[5px]"
                                        onClick={() => handleClickNoti()}
                                    >
                                        <div className="flex w-[50px] h-[50px] justify-center items-center">
                                            <FaCheck size="25px" />
                                        </div>
                                        <p className="flex-1">Mark as read</p>
                                    </div>
                                    <div
                                        className="flex justify-center items-center w-full h-[50px] gap-[10px] hover:bg-[#505050] cursor-pointer rounded-[5px]"
                                        onClick={() => handleClickRemove()}
                                    >
                                        <div className="flex w-[50px] h-[50px] justify-center items-center">
                                            <CiSquareRemove size="25px" />
                                        </div>
                                        <p className="flex-1">
                                            Remove this notification
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenu.Arrow className="fill-blue-400/25" />
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    <Link
                        to={`${notifi.link}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="p-[5px] m-[5px] hover:bg-[#404040] rounded-[10px] cursor-pointer">
                            <div className="flex gap-[10px]">
                                <div className="w-[50px] h-[50px] flex justify-center items-center object-cover rounded-full relative">
                                    <img
                                        loading="lazy"
                                        className={`w-full h-full object-contain  rounded-full`}
                                        src={`data:${notifi.sender.avatar?.files[0]?.fileInfo.type};base64,${notifi.sender.avatar?.files[0].dataURL}`}
                                    />
                                    {notifi.type === "FRIEND_REQUEST" && (
                                        <div className="absolute bottom-[-5px] right-[-5px] bg-[#505050] rounded-full p-[3px]">
                                            <IoMdPersonAdd size="20px" />
                                        </div>
                                    )}
                                    {notifi.type ===
                                        "FRIEND_REQUEST_ACCEPTED" && (
                                        <div className="absolute bottom-[-5px] right-[-5px] bg-[#505050] rounded-full p-[3px]">
                                            <IoMdPerson size="20px" />
                                        </div>
                                    )}
                                </div>
                                {notifi?.read ? (
                                    <div className="flex flex-1 flex-col">
                                        <p className="text-[16px] line-clamp-3 max-w-[100%] text-[#adadad]">
                                            <span className="inline font-[700]">
                                                {notifi.sender.username}
                                            </span>
                                            <span className="inline">
                                                {" "}
                                                {notifi.content}
                                            </span>
                                        </p>
                                        <p className="text-[14px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                            {FormatDate(notifi.createAt)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-1 flex-col">
                                        <p className="text-[16px] line-clamp-3 max-w-[100%] text-[#e4e6eb]">
                                            <span className="inline font-[700]">
                                                {notifi.sender.username}
                                            </span>
                                            <span className="inline">
                                                {" "}
                                                {notifi.content}
                                            </span>
                                        </p>
                                        <p className="text-[14px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#e4e6eb]">
                                            {FormatDate(notifi.createAt)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default NotificationCard;
