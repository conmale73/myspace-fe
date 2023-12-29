import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { MdLogout } from "react-icons/md";

import { groupService } from "../../../services";
import { setGroupDetail } from "../../../redux/groupDetail/groupDetailSlice";

const LeaveGroupButton = ({ group_id, creator_id }) => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const handleLeaveGroup = async () => {
        try {
            const data = {
                user_id: user._id,
            };
            const res = await groupService.leaveGroup(group_id, data);
            dispatch(setGroupDetail(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <span
                    className="flex items-center justify-center gap-2 p-[7px] rounded-[10px] cursor-pointer border-[1px] border-[#ff1313] border-solid
                             hover:bg-[#6d3e3e] w-fit h-[40px]"
                >
                    <MdLogout size="18px" color="#ff1313" />
                    <div className="text-[18px] font-bold text-[#ff1313]">
                        Leave group
                    </div>
                </span>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#303030] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-[#e4e6eb] m-0 text-[17px] font-medium">
                        Are you absolutely sure?
                    </AlertDialog.Title>

                    <AlertDialog.Description className="text-[#e4e6eb] mt-4 mb-5 text-[15px] leading-normal">
                        This action cannot be undone. This will remove your
                        account from the group.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <button className="text-[#e4e6eb] bg-[#404040] hover:bg-[#505050] focus:shadow-[#606060] inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                className="text-[#e4e6eb] bg-[#692828] hover:bg-[#965555] focus:shadow-[#8f5151] inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                onClick={() => handleLeaveGroup()}
                            >
                                Yes, leave group
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default LeaveGroupButton;
