import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Switch from "@radix-ui/react-switch";
import TextareaAutosize from "react-textarea-autosize";

import { FiPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { SelectPrivacy } from "../../../Select";
import { groupService } from "../../../../services";

const GroupCreateButton = () => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("PUBLIC");
    const [verify, setVerify] = useState(false);
    const [visible, setVisible] = useState(true);

    const [open, setOpen] = useState(false);

    const handleStateModal = (e) => {
        setOpen(!open);
    };

    const handleClickCreate = async () => {
        try {
            let data = {};
            if (privacy === "PRIVATE") {
                data = {
                    creator_id: user._id,
                    name: name,
                    description: description,
                    privacy: privacy,
                    requireVerify: verify,
                    visible: visible,
                };
            } else {
                data = {
                    creator_id: user._id,
                    name: name,
                    description: description,
                    privacy: privacy,
                    visible: visible,
                };
            }

            console.log(data);
            const res = await groupService.createGroup(data);
            console.log(res.data);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitForm = async (e) => {};

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => handleStateModal(e)}>
                <Dialog.Trigger asChild>
                    <div
                        className="flex justify-center items-center px-[20px] w-full h-[50px] bg-[#555555]
                 hover:bg-[#676668] shadow-[#676668] rounded-[10px] cursor-pointer gap-[5px] my-[20px]"
                    >
                        <FiPlus size="25px" />
                        Create Group
                    </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                    {/* Modal  */}
                    <Dialog.Content
                        className="data-[state=open]:animate-contentShow fixed top-[50%] 
                        left-[50%] max-h-[750px] min-h-[320px] w-[800px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-neutral-800 p-[25px] overflow-auto
                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    >
                        <div
                            style={{
                                display: "flex",
                                borderBottom: "1px solid #4d4d4d",
                                paddingBottom: "10px",
                            }}
                        >
                            <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                Create New Group
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] ">
                                    <AiOutlineClose
                                        size="25px"
                                        color="#9d9d9d"
                                    />
                                </button>
                            </Dialog.Close>
                        </div>

                        <div className="flex items-center">
                            <Link to={`/profile/${user._id}`}>
                                <div className="w-[50px] h-[50px] rounded-full ">
                                    <img
                                        loading="lazy"
                                        className={`w-full h-full object-contain rounded-full`}
                                        src={`data:${user.avatar.files[0].fileInfo.type};base64,${user.avatar.files[0].dataURL}`}
                                    />
                                </div>
                            </Link>
                            <div className="flex-1 ml-3 mt-2">
                                <p className="text-[#e4e6eb] font-bold">
                                    {user.username}
                                </p>
                                <div>
                                    {/* Privacy Selector */}
                                    <SelectPrivacy
                                        value={privacy}
                                        setValue={setPrivacy}
                                        listValue={["PUBLIC", "PRIVATE"]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <form
                                onSubmit={(e) => handleSubmitForm(e)}
                                className="flex flex-col mt-3 gap-[20px]"
                            >
                                <input
                                    id="title"
                                    type="text"
                                    className={`w-full p-[10px] focus:outline-none text-[20px] rounded-[4px] bg-transparent border-[1px] border-solid border-[#4d4d4d]`}
                                    value={name}
                                    autoFocus
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    autoComplete="off"
                                    maxLength="100"
                                    placeholder="Title"
                                ></input>
                                <TextareaAutosize
                                    className={`w-full p-[10px] focus:outline-none text-[20px] rounded-[4px] resize-none bg-transparent border-[1px] border-solid border-[#4d4d4d]`}
                                    value={description}
                                    minRows="3"
                                    maxRows="8"
                                    maxLength="1000"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    placeholder="Description"
                                ></TextareaAutosize>

                                <div className="flex gap-[10px] items-center">
                                    {privacy === "PRIVATE" && (
                                        <>
                                            <label
                                                className="text-white text-[15px] leading-none pr-[15px]"
                                                htmlFor="verify"
                                            >
                                                Verify to join
                                            </label>
                                            <Switch.Root
                                                className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
                                                id="verify"
                                                style={{
                                                    WebkitTapHighlightColor:
                                                        "rgba(0, 0, 0, 0)",
                                                }}
                                                value={verify}
                                                onCheckedChange={(e) =>
                                                    setVerify(e)
                                                }
                                            >
                                                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                            </Switch.Root>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-[10px] items-center">
                                    <label
                                        className="text-white text-[15px] leading-none pr-[15px]"
                                        htmlFor="visible"
                                    >
                                        Visible
                                    </label>
                                    <Switch.Root
                                        className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
                                        id="visible"
                                        style={{
                                            "-webkit-tap-highlight-color":
                                                "rgba(0, 0, 0, 0)",
                                        }}
                                        value={visible}
                                        onCheckedChange={(e) => setVisible(e)}
                                    >
                                        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                    </Switch.Root>
                                </div>
                            </form>
                        </div>

                        {/* Create Button */}
                        <div className="flex w-full gap-[20px] justify-end">
                            <button
                                className="w-[150px] h-[30px] mt-[25px]
                                     rounded-[4px] text-[#e4e6eb] font-bold hover:bg-[#606060] "
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-[150px] h-[30px] bg-[#3a3b3c] mt-[25px]
                                     rounded-[4px] text-[#e4e6eb] font-bold hover:bg-[#606060] "
                                onClick={() => handleClickCreate()}
                            >
                                Create
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};

export default GroupCreateButton;
