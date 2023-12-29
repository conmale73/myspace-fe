import { GiSpeaker } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import * as Tooltip from "@radix-ui/react-tooltip";
import { voiceChannelService } from "../../services";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentVoiceChannel } from "../../redux/currentVoiceChannel/currentVoiceChannelSlice";
import { useQueries, useQuery, useMutation } from "@tanstack/react-query";
import UserInfoPreview from "../UserInfoPreview";
import Loading from "../Loading";
import io from "socket.io-client";
import ReactPlayer from "react-player";

var socket = io("http://localhost:3000");

const VoiceChatChannel = ({ index, _id, room_id, name, currentMembers }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [playJoinSound, setPlayJoinSound] = useState(false);
    const [playLeaveSound, setPlayLeaveSound] = useState(false);
    const currentVoiceChannel = useSelector(
        (state) => state.currentVoiceChannel.data
    );
    useEffect(() => {
        if (currentMembers.some((member) => member === user._id)) {
            dispatch(
                setCurrentVoiceChannel({ _id, room_id, name, currentMembers })
            );
            setPlayJoinSound(true);
            socket.emit("joinVoiceChannel", _id, user._id, room_id);
        }
    }, []);
    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(
                `Voice Channel ${_id} Received event '${event}':`,
                args
            );
        });
        socket.onAnyOutgoing((event, ...args) => {
            console.log(`Voice Channel ${_id} Sent event '${event}':`, args);
        });
        socket.on("receiveJoinVoiceChannel", (voiceChannel) => {
            setPlayJoinSound(true);
        });
        socket.on("receiveLeaveVoiceChannel", () => {
            setPlayLeaveSound(true);
        });
    });

    const joinChannelMutation = useMutation({
        mutationFn: () => voiceChannelService.joinVoiceChannel(_id, user._id),
        onSuccess: () => {
            socket.emit(
                "joinVoiceChannel",
                _id,
                user._id,
                room_id,
                currentVoiceChannel?._id
            );
            dispatch(
                setCurrentVoiceChannel({ _id, room_id, name, currentMembers })
            );
            setPlayJoinSound(true);
        },
    });

    return (
        <div className="w-full h-fit">
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <div
                            className="group flex items-center w-full h-fit 
        hover:bg-[#676668] gap-[5px] p-[3px] cursor-pointer rounded-[5px]"
                            onClick={() => {
                                if (currentMembers?.includes(user._id)) {
                                    return;
                                } else {
                                    joinChannelMutation.mutate();
                                }
                            }}
                        >
                            <div>
                                <GiSpeaker className="" size="25px" />
                            </div>
                            <ReactPlayer
                                width="0px"
                                height="0px"
                                url="/sounds/ah!!.mp3"
                                playing={playJoinSound}
                                onEnded={() => setPlayJoinSound(false)}
                                controls={false}
                                volume={0.5}
                            />
                            <ReactPlayer
                                width="0px"
                                height="0px"
                                url="/sounds/pussy-sound-effect_1.mp3"
                                playing={playLeaveSound}
                                onEnded={() => setPlayLeaveSound(false)}
                                controls={false}
                                volume={0.5}
                            />
                            <div className="text-[18px] line-clamp-1 w-[50%]">
                                {name}
                            </div>
                            <div className="w-[35%] flex flex-row-reverse right-0">
                                <AiFillSetting
                                    className="hidden group-hover:flex hover:text-white"
                                    size="25px"
                                    title="Setting"
                                />
                            </div>
                        </div>
                    </Tooltip.Trigger>
                    <div className="flex flex-col w-full h-fit ml-[10px] pr-[10px]">
                        {currentMembers?.map((member, index) => {
                            return (
                                <div key={index} id={index}>
                                    <UserInfoPreview
                                        thumbnailHeight="30px"
                                        thumbnailWidth="30px"
                                        user_id={member}
                                        bgStyles={true}
                                        showName={true}
                                        displayOnlineStatus={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
             data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
             data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
             data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
             text-[#adadad] select-none rounded-[4px] bg-[#303030] 
             px-[15px] py-[10px] text-[15px] leading-none 
             shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
             will-change-[transform,opacity]"
                            sideOffset={5}
                        >
                            {name}
                            <Tooltip.Arrow className="fill-[#303030]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        </div>
    );
};
export default VoiceChatChannel;
