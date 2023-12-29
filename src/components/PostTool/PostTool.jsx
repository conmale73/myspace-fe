import styles from "./postTool.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TextareaAutosize from "react-textarea-autosize";
import * as Select from "@radix-ui/react-select";
import { AiOutlineClose, AiOutlineCheck, AiFillLock } from "react-icons/ai";
import {
    BsChevronDown,
    BsChevronUp,
    BsGlobeAsiaAustralia,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import FilePicker from "../FilePicker";
import { setImage } from "../../redux/imageStore/imageStoreSlice";
import { postService } from "../../services";

const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className="text-[13px] leading-none hover:bg-[#555555]
                rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative 
                select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none 
                data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <AiOutlineCheck size="15px" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);
const PostTool = ({ setPosts, group_name, group_id }) => {
    const user = useSelector((state) => state.user.data);
    const [textContent, setTextContent] = useState("");
    const [placeholder, setPlaceholder] = useState("What's on your mind?");
    const [open, setOpen] = useState(false);
    const [privacy, setPrivacy] = useState("PUBLIC");
    const [files, setFiles] = useState([]);

    const dispatch = useDispatch();

    const handleSubmitForm = (e) => {
        e.preventDefault();
    };

    async function post(dataPost) {
        try {
            const res = await postService.createNewPost(dataPost);

            setPosts((posts) => [res.data, ...posts]);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleClickPost = () => {
        const dataPost = {
            user_id: user._id,
            content: {
                text: textContent,
                files: files,
            },
            privacy: privacy,
        };
        const dataPostGroup = {
            user_id: user._id,
            content: {
                text: textContent,
                files: files,
            },
            privacy: "GROUP",
            group_id: group_id,
        };

        try {
            if (group_id) {
                post(dataPostGroup);
            } else {
                post(dataPost);
            }

            setOpen(!open);

            // Reset state
            setTextContent("");
            setPlaceholder("What's on your mind?");
            setFiles([]);
        } catch (err) {
            console.log(err);
        }
    };
    const handleStateModal = (e) => {
        setOpen(!open);
        if (textContent === "") {
            setPlaceholder("What's on your mind?");
        }
    };

    return (
        <div className={styles.postTool}>
            <div className={styles.top}>
                <Link to={`/profile/${user._id}`}>
                    <div className={styles.avatar}>
                        <img
                            loading="lazy"
                            className={`w-full h-full object-contain rounded-full`}
                            src={`data:${user.avatar.files[0].fileInfo.type};base64,${user.avatar.files[0].dataURL}`}
                        />
                    </div>
                </Link>

                <Dialog.Root
                    open={open}
                    onOpenChange={(e) => handleStateModal(e)}
                >
                    <Dialog.Trigger asChild>
                        <div className={styles.textarea}>
                            <p className={styles.placeholder}>{placeholder}</p>
                        </div>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                        {/* Modal  */}
                        <Dialog.Content
                            className="data-[state=open]:animate-contentShow fixed top-[50%] 
                        left-[50%] max-h-[750px] min-h-[420px] w-[800px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-neutral-800 p-[25px] overflow-y-scroll 
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
                                    Create Post
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

                            <Dialog.Description>
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
                                            <Select.Root
                                                value={privacy}
                                                onValueChange={(e) =>
                                                    setPrivacy(e)
                                                }
                                            >
                                                {group_name ? (
                                                    <div
                                                        className="inline-flex items-center justify-center 
                                                    bg-[#3A3B3C] cursor-not-allowed
                                                    rounded px-[15px] text-[13px] leading-none h-[30px] gap-[5px] 
                                                    text-violet11 shadow-[0_2px_10px] shadow-white/10 
                                                    hover:bg-[#606060] focus:shadow-[0_0_0_2px] focus:shadow-white 
                                                    data-[placeholder]:text-violet9 outline-none"
                                                        aria-label="Privacy"
                                                    >
                                                        {`Members of ${group_name}`}
                                                    </div>
                                                ) : (
                                                    <Select.Trigger
                                                        className="inline-flex items-center justify-center 
                                                    bg-[#3A3B3C]
                                                    rounded px-[15px] text-[13px] leading-none h-[30px] gap-[5px] 
                                                    text-violet11 shadow-[0_2px_10px] shadow-white/10 
                                                    hover:bg-[#606060] focus:shadow-[0_0_0_2px] focus:shadow-white 
                                                    data-[placeholder]:text-violet9 outline-none"
                                                        aria-label="Privacy"
                                                    >
                                                        <Select.Value placeholder="Select privacy for your post..." />
                                                        <Select.Icon className="text-violet11">
                                                            <BsChevronDown size="15px" />
                                                        </Select.Icon>
                                                    </Select.Trigger>
                                                )}

                                                <Select.Portal>
                                                    <Select.Content
                                                        className="overflow-hidden rounded-md 
                                                    shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]
                                                    bg-[#3A3B3C]"
                                                    >
                                                        <Select.ScrollUpButton
                                                            className="flex items-center 
                                                        justify-center h-[25px] text-violet11 cursor-default"
                                                        >
                                                            <BsChevronUp size="15px" />
                                                        </Select.ScrollUpButton>
                                                        <Select.Viewport className="p-[5px]">
                                                            <Select.Group>
                                                                <SelectItem value="PUBLIC">
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: "10px",
                                                                        }}
                                                                    >
                                                                        <BsGlobeAsiaAustralia size="15px" />
                                                                        Public
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="FRIEND">
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: "10px",
                                                                        }}
                                                                    >
                                                                        <FaUserFriends size="15px" />
                                                                        Friends
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="PRIVATE">
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: "10px",
                                                                        }}
                                                                    >
                                                                        <AiFillLock size="15px" />
                                                                        Only me
                                                                    </div>
                                                                </SelectItem>
                                                            </Select.Group>
                                                        </Select.Viewport>
                                                        <Select.ScrollDownButton
                                                            className="flex items-center justify-center h-[25px] 
                                                         text-violet11 cursor-default"
                                                        >
                                                            <BsChevronDown size="15px" />
                                                        </Select.ScrollDownButton>
                                                    </Select.Content>
                                                </Select.Portal>
                                            </Select.Root>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <form
                                        onSubmit={(e) => handleSubmitForm(e)}
                                        className="mt-3"
                                    >
                                        <TextareaAutosize
                                            className={`${styles.textareaForm} w-full p-[10px] border-none focus:outline-none text-[20px] rounded-[4px] resize-none bg-transparent`}
                                            value={textContent}
                                            minRows="5"
                                            maxRows="8"
                                            autoFocus
                                            onChange={(e) => {
                                                setTextContent(e.target.value);
                                                setPlaceholder(e.target.value);
                                            }}
                                            placeholder="What's on your mind?"
                                        ></TextareaAutosize>
                                    </form>
                                </div>
                            </Dialog.Description>

                            <FilePicker files={files} setFiles={setFiles} />
                            {/* Post Button */}
                            <div className="w-full">
                                <button
                                    className="w-full h-[30px] bg-[#3a3b3c] mt-[25px]
                                     rounded-[4px] text-[#e4e6eb] font-bold hover:bg-[#606060] "
                                    onClick={handleClickPost}
                                >
                                    Post
                                </button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.bottom}>
                <div className={styles.buttons}>
                    <div
                        className={styles.button}
                        onClick={() => setOpen(true)}
                    >
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />
                        <p className={styles.text}>Photo/Audio</p>
                    </div>
                    <div
                        className={styles.button}
                        onClick={() => setOpen(true)}
                    >
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" />
                        <p className={styles.text}>Feeling/Activity</p>
                    </div>
                    {/* <div className={styles.button}>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png" />
                        <p className={styles.text}>Event</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
export default PostTool;
