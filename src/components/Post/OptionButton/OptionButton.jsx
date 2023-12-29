import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSelector } from "react-redux";

import { SlOptions } from "react-icons/sl";
import { FaPen, FaTrash } from "react-icons/fa";

import styles from "./OptionButton.module.scss";
import { postService } from "../../../services";
const OptionButton = ({ post_id, setIsDeleted, user_id }) => {
    const user = useSelector((state) => state.user.data);

    const [open, setOpen] = useState(false);

    const handleDeletePost = () => {
        setIsDeleted(true);
        setOpen(false);

        try {
            const res = postService.deletePost(post_id, user._id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleStateDropdown = () => {
        setOpen(!open);
    };
    return (
        <DropdownMenu.Root
            modal={false}
            open={open}
            onOpenChange={handleStateDropdown}
        >
            <DropdownMenu.Trigger asChild>
                <div className={styles.optionButton}>
                    <SlOptions className={styles.icon} />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    sideOffset={5}
                    className="w-fit h-fit bg-[#303030] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                >
                    <div className="flex flex-col w-full h-full gap-[10px]">
                        {/* <div className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]">
                            <div className="w-full h-[50px] flex items-center justify-center gap-[10px] px-[10px]">
                                <FaPen className="text-[16px] text-[#e4e6eb] w-[20px] h-[20px]" />
                                <p className="text-[16px] text-[#e4e6eb] w-full text-start">
                                    Edit post
                                </p>
                            </div>
                        </div> */}
                        <AlertDialog.Root>
                            <AlertDialog.Trigger asChild>
                                <div className="w-full flex flex-col gap-[5px] cursor-pointer hover:bg-[#454545] rounded-[5px]">
                                    <div className="w-full h-[50px] flex items-center justify-center gap-[10px] px-[10px]">
                                        <FaTrash className="text-[16px] text-[#e4e6eb] w-[20px] h-[20px]" />
                                        <div className="text-[16px] text-[#e4e6eb] w-full text-start">
                                            Delete post
                                        </div>
                                    </div>
                                </div>
                            </AlertDialog.Trigger>
                            <AlertDialog.Portal>
                                <AlertDialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#303030] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                    <AlertDialog.Title className="text-[#e4e6eb] m-0 text-[17px] font-medium">
                                        Are you absolutely sure?
                                    </AlertDialog.Title>

                                    <AlertDialog.Description className="text-[#e4e6eb] mt-4 mb-5 text-[15px] leading-normal">
                                        This action cannot be undone. This will
                                        permanently delete this post from the
                                        database.
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
                                                onClick={() =>
                                                    handleDeletePost()
                                                }
                                            >
                                                Yes, delete post
                                            </button>
                                        </AlertDialog.Action>
                                    </div>
                                </AlertDialog.Content>
                            </AlertDialog.Portal>
                        </AlertDialog.Root>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default OptionButton;
