import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SlOptions } from "react-icons/sl";

import { groupService } from "../../../../services";
import { setGroupDetail } from "../../../../redux/groupDetail/groupDetailSlice";

const OptionButton = ({ user_id, admins, members, creator_id, role }) => {
    const user = useSelector((state) => state.user.data);
    const groupDetail = useSelector((state) => state.groupDetail.data);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState(0); // 0: member, 1: admin, 2: creator, 3: creator & admin

    const handleDrowpdownState = () => {
        setOpen(!open);

        const checkRole = (user_id) => {
            if (user_id === creator_id && admins.includes(user_id)) {
                setUserRole(3);
            } else if (user_id === creator_id) {
                setUserRole(2);
            } else if (admins.includes(user_id)) {
                setUserRole(1);
            } else {
                setUserRole(0);
            }
            return userRole;
        };
        checkRole(user_id);
    };

    const handleSetAdmin = async () => {
        try {
            const data = {
                user_id: user_id,
                setter_id: user._id,
            };
            console.log(data);
            const res = await groupService.setUserAsAdmin(
                groupDetail._id,
                data
            );
            dispatch(setGroupDetail(res.data.data));
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveAdmin = async () => {
        try {
            const data = {
                user_id: user_id,
                setter_id: user._id,
            };
            console.log(data);
            const res = await groupService.removeUserAsAdmin(
                groupDetail._id,
                data
            );
            dispatch(setGroupDetail(res.data.data));
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFromGroup = async () => {
        try {
            const data = {
                user_id: user_id,
                setter_id: user._id,
            };
            console.log(data);
            const res = await groupService.removeUserFromGroup(
                groupDetail._id,
                data
            );
            dispatch(setGroupDetail(res.data.data));
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const data = {
                user_id: user_id,
            };
            console.log(data);
            const res = await groupService.leaveGroup(groupDetail._id, data);
            dispatch(setGroupDetail(res.data.data));
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DropdownMenu.Root
            open={open}
            onOpenChange={() => handleDrowpdownState()}
        >
            <DropdownMenu.Trigger asChild>
                <div className="w-[50px] h-full flex items-center justify-center rounded-full hover:bg-[#606060] cursor-pointer">
                    <SlOptions size="20px" />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    sideOffset={5}
                    className="w-[200px] h-fit bg-[#353535] rounded-[5px] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                >
                    <>
                        {/* If clicker is creator & admin*/}
                        {role == 3 && (
                            <>
                                {userRole === 0 && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleSetAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Set as Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() =>
                                                handleRemoveFromGroup()
                                            }
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove from group
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {userRole === 1 && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleRemoveAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove as Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() =>
                                                handleRemoveFromGroup()
                                            }
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove from group
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {user_id === user._id && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleRemoveAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove as Admin
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {/* If clicker is creator only*/}
                        {role == 2 && (
                            <>
                                {userRole === 0 && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleSetAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Set as Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() =>
                                                handleRemoveFromGroup()
                                            }
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove from group
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {userRole === 1 && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleRemoveAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove as Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() =>
                                                handleRemoveFromGroup()
                                            }
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove from group
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {user_id === user._id && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleSetAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Set as Admin
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {/* If clicker is admin only*/}
                        {role == 1 && (
                            <>
                                {userRole === 0 && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() =>
                                                handleRemoveFromGroup()
                                            }
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove from group
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {userRole === 1 && (
                                    <>
                                        <Link to={`/profile/${user_id}`}>
                                            <div className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]">
                                                <div className="w-full h-[50px] flex items-center justify-center">
                                                    <div className="text-[16px] text-[#e4e6eb]">
                                                        View Profile
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                {userRole === 2 && (
                                    <>
                                        <Link to={`/profile/${user_id}`}>
                                            <div className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]">
                                                <div className="w-full h-[50px] flex items-center justify-center">
                                                    <div className="text-[16px] text-[#e4e6eb]">
                                                        View Profile
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                {userRole === 3 && (
                                    <>
                                        <Link to={`/profile/${user_id}`}>
                                            <div className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]">
                                                <div className="w-full h-[50px] flex items-center justify-center">
                                                    <div className="text-[16px] text-[#e4e6eb]">
                                                        View Profile
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                {user_id === user._id && (
                                    <>
                                        <div
                                            className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]"
                                            onClick={() => handleRemoveAdmin()}
                                        >
                                            <div className="w-full h-[50px] flex items-center justify-center">
                                                <div className="text-[16px] text-[#e4e6eb]">
                                                    Remove as Admin
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
export default OptionButton;
