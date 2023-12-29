import styles from "./Room.module.scss";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {
    roomService,
    messageService,
    voiceChannelService,
} from "../../services";
import UserInfoPreview from "../../components/UserInfoPreview";
import { FiLogOut } from "react-icons/fi";
import ChatBox from "../../components/ChatBox";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineClose, AiFillSetting } from "react-icons/ai";
import { FaMicrophone, FaHeadphones, FaSignInAlt } from "react-icons/fa";
import { BsFillTelephoneXFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import { PiShareFatFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import VoiceChatChannel from "../../components/VoiceChatChannel";
import ImageViewer from "../../components/ImageViewer";

import {
    setVoiceChannels,
    removeUserFromVoiceChannel,
} from "../../redux/voiceChannels/voiceChannelsSlice";
import { setCurrentVoiceChannel } from "../../redux/currentVoiceChannel/currentVoiceChannelSlice";
import { socket } from "../../socket";
const Room = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const user = useSelector((state) => state.user?.data);
    const [roomData, setRoomData] = useState();
    const voiceChannelData = useSelector((state) => state.voiceChannels.data);
    const currentVoiceChannel = useSelector(
        (state) => state.currentVoiceChannel.data
    );
    const dispatch = useDispatch();

    const fetchRoomData = async () => {
        const res = await roomService.getRoomById(id);
        setRoomData(res.data.data);
        return res.data.data;
    };
    const fetchVoiceChannelData = async () => {
        const res = await voiceChannelService.getRoomVoiceChannels(id);
        dispatch(setVoiceChannels(res.data));
        return res.data;
    };
    const { isLoading, error, data } = useQueries({
        queries: [
            {
                queryKey: ["room", id],
                queryFn: () => fetchRoomData(),
            },
            {
                queryKey: ["voiceChannels", id],
                queryFn: () => fetchVoiceChannelData(),
            },
        ],
    });

    useEffect(() => {
        socket.on("receiveJoinVoiceChannelRoom", () => {
            fetchVoiceChannelData();
        });
    }, [currentVoiceChannel]);
    useEffect(() => {
        socket.emit("joinRoom", id, user?._id);
    }, []);
    useEffect(() => {
        socket.on("receiveLeaveVoiceChannelRoom", (user_id) => {
            var temp = [...voiceChannelData];

            temp.forEach((voiceChannel, index) => {
                if (voiceChannel.currentMembers.includes(user_id)) {
                    // Create a new copy of the voiceChannel object
                    const updatedVoiceChannel = { ...voiceChannel };

                    // Update the currentMembers property in the new copy
                    updatedVoiceChannel.currentMembers =
                        updatedVoiceChannel.currentMembers.filter(
                            (member) => member !== user_id
                        );

                    // Update the temp array with the modified voiceChannel
                    temp[index] = updatedVoiceChannel;
                }
            });

            dispatch(setVoiceChannels(temp));
        });
    });

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleClickJoin = async (e) => {
        try {
            const res = await roomService.joinRoom(roomData._id, user?._id);
            setRoomData(res.data);

            fetchVoiceChannelData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleStateModal = (e) => {
        setOpen(!open);
        voiceChannelService.leaveAllVoiceChannel(user?._id);
    };

    const handleClickQuit = async () => {
        try {
            const res = await roomService.quitRoom(roomData._id, user?._id);
            setRoomData(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleClickLeaveVoiceChannel = () => {
        try {
            const res = voiceChannelService.leaveAllVoiceChannel(user?._id);
            var temp = [...voiceChannelData];

            temp.forEach((voiceChannel, index) => {
                if (voiceChannel.currentMembers.includes(user?._id)) {
                    // Create a new copy of the voiceChannel object
                    const updatedVoiceChannel = { ...voiceChannel };

                    // Update the currentMembers property in the new copy
                    updatedVoiceChannel.currentMembers =
                        updatedVoiceChannel.currentMembers.filter(
                            (member) => member !== user?._id
                        );

                    // Update the temp array with the modified voiceChannel
                    temp[index] = updatedVoiceChannel;
                }
            });

            dispatch(setVoiceChannels(temp));

            socket.emit(
                "leaveVoiceChannel",
                currentVoiceChannel._id,
                user?._id,
                currentVoiceChannel.room_id
            );

            dispatch(setCurrentVoiceChannel());
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={styles.room}>
            <div className={styles.roomInfo}>
                <div className={styles.roomThumbnail}>
                    {roomData?.thumbnail?.files[0] && (
                        <ImageViewer
                            image={roomData?.thumbnail?.files[0]}
                            objectFit="cover"
                        />
                    )}
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.roomName}>{roomData?.name}</div>
                    <div className={styles.roomCreator}>
                        <p>Creator: </p>
                        {roomData && (
                            <UserInfoPreview
                                thumbnailHeight="40px"
                                thumbnailWidth="40px"
                                showName={true}
                                link={true}
                                user_id={roomData?.creator_id}
                                displayOnlineStatus={true}
                            />
                        )}
                    </div>
                    <div className={styles.roomDescription}>
                        {`Description: ${roomData?.description}`}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Dialog.Root
                        open={open}
                        onOpenChange={(e) => handleStateModal(e)}
                    >
                        <Dialog.Trigger asChild>
                            <div
                                className={styles.joinButton}
                                onClick={(e) => handleClickJoin(e)}
                            >
                                <FaSignInAlt
                                    size="30px"
                                    className={styles.joinIcon}
                                />
                                <p className={styles.joinText}>Join</p>
                            </div>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                            {/* Modal  */}
                            <Dialog.Content
                                className="data-[state=open]:animate-contentShow fixed top-[50%] 
                                    left-[50%] w-full max-w-[1910px] h-full translate-x-[-50%] translate-y-[-50%] 
                                    rounded-[6px] bg-[#18191a] overflow-y-auto overflow-x-hidden"
                            >
                                {/* Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        borderBottom: "1px solid #4d4d4d",
                                        paddingBottom: "10px",
                                        paddingTop: "10px",
                                    }}
                                >
                                    <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                        {roomData?.name}
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

                                {/* Body */}
                                <div className="w-full h-[calc(100%-60px)] justify-center items-start inline-flex">
                                    {/* Left */}
                                    <div className="flex w-[300px] h-full relative flex-col justify-start items-start gap-[20px]">
                                        <div className="w-[300px] h-[200px] relative">
                                            <div className="opacity-50 w-full h-full object-contain">
                                                <ImageViewer
                                                    image={
                                                        roomData?.thumbnail
                                                            ?.files[0]
                                                    }
                                                    objectFit="cover"
                                                />
                                            </div>

                                            <div className="left-[32px] top-[10px] absolute text-white text-[25px] font-semibold font-['Inter'] line-clamp-1">
                                                {roomData?.name}
                                            </div>
                                        </div>
                                        <div className="w-full h-fit pl-1.5 pr-2 pt-[7px] pb-[79px] flex-col justify-start items-start gap-2 inline-flex">
                                            <div className="text-neutral-200 text-lg font-normal font-['Inter']">
                                                Voice Channels
                                            </div>
                                            <div className="w-full relative flex-col justify-start flex gap-[10px]">
                                                {voiceChannelData?.map(
                                                    (voiceChannel, index) => (
                                                        <VoiceChatChannel
                                                            key={index}
                                                            index={index}
                                                            _id={
                                                                voiceChannel?._id
                                                            }
                                                            room_id={
                                                                roomData?._id
                                                            }
                                                            name={
                                                                voiceChannel?.name
                                                            }
                                                            currentMembers={
                                                                voiceChannel?.currentMembers
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {currentVoiceChannel ? (
                                            <div className="p-[5px] w-full h-[70px] border-t-[1px] border-b-[1px] border-solid border-[#545454] absolute bottom-[70px]">
                                                <div className="w-full h-full flex">
                                                    <div className="flex-1 flex flex-col">
                                                        <div className="w-full h-[30px] text-green-500">
                                                            Voice Connected
                                                        </div>

                                                        <div className="w-full h-[20px] text-[15px] text-[#adadad] text-ellipsis">
                                                            {
                                                                currentVoiceChannel.name
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="w-[50px] h-[50px] flex justify-center items-center">
                                                        <BsFillTelephoneXFill
                                                            size="25px"
                                                            className="text-[#bbbbbb] hover:text-[#ffffff] cursor-pointer"
                                                            onClick={() => {
                                                                handleClickLeaveVoiceChannel();
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <div className=" flex w-[286px] h-[60px] absolute bottom-0">
                                            <div className="w-fit h-fit right-[10px] top-[18px] absolute">
                                                <AiFillSetting size="25px" />
                                            </div>
                                            {/* <div className="w-fit h-fit right-[60px] top-[18px] absolute">
                                                    <FaHeadphones size="25px" />
                                                </div>
                                                <div className="w-fit h-fit right-[110px] top-[18px] absolute">
                                                    <FaMicrophone size="25px" />
                                                </div> */}
                                            <div className="absolute left-0 w-[140px] overflow-hidden">
                                                <UserInfoPreview
                                                    thumbnailHeight="50px"
                                                    thumbnailWidth="50px"
                                                    showName={true}
                                                    user_id={user?._id}
                                                    displayOnlineStatus={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Middle */}
                                    <div className="w-[1300px] h-full bg-[#303030] flex-col justify-end items-center inline-flex">
                                        <ChatBox
                                            chat_id={roomData?.chat_id[0]}
                                            text={text}
                                            setText={setText}
                                            showTextarea={true}
                                            participants={
                                                roomData?.participants
                                            }
                                            singleChat={false}
                                        />
                                    </div>
                                    {/* Right */}
                                    <div className="w-[300px] pl-[13px] pr-3 pt-[9px]  flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="text-white text-[25px] font-bold font-['Inter']">
                                            Participants
                                        </div>
                                        {roomData?.participants.map(
                                            (participant, index) => {
                                                return (
                                                    <UserInfoPreview
                                                        key={index}
                                                        thumbnailHeight="40px"
                                                        thumbnailWidth="40px"
                                                        showName={true}
                                                        bgStyles={true}
                                                        user_id={participant}
                                                        displayOnlineStatus={
                                                            true
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                    <div className={styles.shareButton}>
                        <PiShareFatFill
                            size="30px"
                            className={styles.shareIcon}
                        />
                        <p className={styles.shareText}>Share</p>
                    </div>
                    {roomData?.participants.includes(user?._id) ? (
                        <div
                            className={styles.quitButton}
                            onClick={handleClickQuit}
                        >
                            <FiLogOut size="30px" className={styles.quitIcon} />
                            <p className={styles.quitText}>Quit</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className={styles.roomContent}>
                <div className={styles.roomParticipants}>
                    <div className="text-[30px] font-[500]">Participants:</div>
                    <div className="flex gap-[10px] min-h-[100px] items-start">
                        {roomData?.participants.map((participant, index) => {
                            return (
                                <UserInfoPreview
                                    key={index}
                                    thumbnailHeight="40px"
                                    thumbnailWidth="40px"
                                    showName={false}
                                    user_id={participant}
                                    displayOnlineStatus={true}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={styles.roomChat}>
                    <div className="text-[30px] font-[500] mt-[10px] mb-[10px] h-fit">
                        Live Chat:
                    </div>
                    <div className={styles.chatBox}>
                        <ChatBox
                            chat_id={roomData?.chat_id[0]}
                            showTextarea={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Room;
