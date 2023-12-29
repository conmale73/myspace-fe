import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { roomService } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import RoomThumbnail from "../../components/RoomThumbnail";
import { FiPlus } from "react-icons/fi";
import * as Dialog from "@radix-ui/react-dialog";
import {
    AiOutlineClose,
    AiOutlineLink,
    AiOutlineCheck,
    AiFillLock,
} from "react-icons/ai";
import {
    BsChevronDown,
    BsChevronUp,
    BsGlobeAsiaAustralia,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import * as Select from "@radix-ui/react-select";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState, useEffect } from "react";
import Divider from "../../components/Divider/Divider";
import { set } from "immutable";

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
const Playground = () => {
    document.title = "Playground";
    const user = useSelector((state) => state.user.data);

    const [rooms, setRooms] = useState([]);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(user.username + "'s Room");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("PUBLIC");

    const dispatch = useDispatch();
    const fetchData = async () => {
        const res = await roomService.getAllPublicRooms();
        setRooms(res.data.data);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["playground"],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const handleStateModal = (e) => {
        setOpen(!open);
    };
    const handleClickCreate = async (e) => {
        e.preventDefault();
        const newRoom = {
            name: title,
            creator_id: user._id,
            description: description,
            privacy: privacy,
        };
        const res = await roomService.createRoom(newRoom);
        console.log(res);
        setRooms((rooms) => [res.data, ...rooms]);
        setOpen(false);
        setTitle("");
        setDescription("");
    };
    return (
        <div className="w-full h-fit">
            <h1 className="font-bold text-[25px]">Playground</h1>
            <div className="flex w-full justify-start">
                <Dialog.Root
                    open={open}
                    onOpenChange={(e) => handleStateModal(e)}
                >
                    <Dialog.Trigger asChild>
                        <div
                            className="flex justify-center items-center px-[20px] min-w-[100px] h-[50px] bg-[#555555]
                 hover:bg-[#676668] shadow-[#676668] rounded-[10px] cursor-pointer gap-[5px] my-[20px]"
                        >
                            <FiPlus size="25px" />
                            Create Room
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
                                    Create New Room
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
                                                                <SelectItem value="UNLISTED">
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: "10px",
                                                                        }}
                                                                    >
                                                                        <AiOutlineLink size="15px" />
                                                                        Ulisted
                                                                        (Anyone
                                                                        with the
                                                                        link can
                                                                        view)
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
                                <div className="">
                                    <form
                                        onSubmit={(e) => handleSubmitForm(e)}
                                        className="flex flex-col mt-3 gap-[20px]"
                                    >
                                        <input
                                            id="title"
                                            type="text"
                                            className={`w-full p-[10px] focus:outline-none text-[20px] rounded-[4px] bg-transparent border-[1px] border-solid border-[#4d4d4d]`}
                                            value={title}
                                            autoFocus
                                            onChange={(e) => {
                                                setTitle(e.target.value);
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
                                    </form>
                                </div>
                            </Dialog.Description>

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
                                    onClick={handleClickCreate}
                                >
                                    Create
                                </button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div className="flex flex-col gap-[30px]">
                {rooms?.map((room, index) => {
                    return <RoomThumbnail key={index} data={room} />;
                })}
            </div>
        </div>
    );
};
export default Playground;
