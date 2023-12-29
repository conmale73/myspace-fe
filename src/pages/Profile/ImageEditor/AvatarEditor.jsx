import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";
import AvatarEditor from "react-avatar-editor";

import { FaPen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import Cropper from "./Cropper/Cropper";
import { userService } from "../../../services";
import { setUser } from "../../../redux/user/userSlice";

const AvatarEditorComponent = ({
    image,
    setImage,
    originalImage,
    setUserData,
}) => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user.data);

    const dispatch = useDispatch();

    const handleChange = () => {
        setOpen(!open);
    };

    const handleSaveEditImage = async () => {
        try {
            const data = {
                user_id: user._id,
                avatar: {
                    files: [
                        {
                            dataURL: image.dataURL,
                            fileInfo: {
                                type: image.fileInfo.type,
                                name: image.fileInfo.name,
                                size: image.dataURL.length,
                                lastModified: new Date(),
                            },
                        },
                    ],
                },
            };
            const res = await userService.updateUserAvatar(data);

            if (res.status === 200) {
                setOpen(false);

                dispatch(
                    setUser({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        description: user.description,
                        musicType: user.musicType,
                        avatar: {
                            files: [res.data.data.avatar.files[0]],
                        },
                        registration_date: user.registration_date,
                    })
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        description: user.description,
                        musicType: user.musicType,
                        avatar: {
                            files: [res.data.data.avatar.files[0]],
                        },
                        registration_date: user.registration_date,
                    })
                );
                setUserData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dialog.Root open={open} onOpenChange={handleChange}>
            <Dialog.Trigger asChild>
                <div
                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 top-0 w-fit h-[40px]"
                >
                    <FaPen size="18px" />
                    <div className="text-[18px] font-bold">Edit</div>
                </div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className={` flex data-[state=open]:animate-contentShow fixed top-[50%] 
                                    left-[50%] min-w-[800px] h-fit translate-x-[-50%] translate-y-[-50%] overflow-x-hidden 
                                    rounded-[6px] bg-neutral-800 p-[25px] 
                                    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
                >
                    <div className="flex flex-col gap-2 overflow-auto w-full min-h-[600px] max-h-[1000px] relative">
                        <div
                            style={{
                                display: "flex",
                                borderBottom: "1px solid #4d4d4d",
                                paddingBottom: "10px",
                            }}
                        >
                            <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                Edit Avatar
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button
                                    className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] "
                                    onClick={() => {
                                        setImage(originalImage);
                                        setOpen(false);
                                    }}
                                >
                                    <AiOutlineClose
                                        size="25px"
                                        color="#9d9d9d"
                                    />
                                </button>
                            </Dialog.Close>
                        </div>

                        <Cropper image={image} setImage={setImage} />

                        <div className="w-full flex gap-[10px] justify-center mt-[30px]">
                            <div
                                className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]"
                                onClick={() => {
                                    setImage(originalImage);
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </div>
                            {originalImage.dataURL != image.dataURL ? (
                                <div
                                    className="flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px] 
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                    onClick={() => handleSaveEditImage()}
                                >
                                    Save
                                </div>
                            ) : (
                                <div
                                    className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                >
                                    Save
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AvatarEditorComponent;
