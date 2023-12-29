import styles from "./ChatBox.module.scss";
import Message from "./Message";
import { messageService } from "../../services";
import Loading from "../Loading";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaFaceSmile } from "react-icons/fa6";

import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { socket } from "../../socket.js";
const ChatBox = (props) => {
    const user = useSelector((state) => state.user.data);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const emojiPickerRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [text, setText] = useState("");

    const fetchData = async () => {
        const res = await messageService.getMessagesByChatID(
            props.chat_id,
            page,
            limit
        );
        setMessages(res.data.data);
        setTotalPages(res.data.totalPages);

        return res.data.data;
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["chat", props.chat_id],
        queryFn: () => fetchData(),
    });
    useEffect(() => {
        setMessages([]);
        setPage(1);
    }, [props.chat_id]);

    useEffect(() => {
        socket.emit("joinChat", user._id, props.chat_id);
        socket.on("receiveMessage", (message) => {
            setMessages((messages) => [message, ...messages]);
        });
    }, []);

    const handleSelectEmoji = (emojiObject, e) => {
        if (emojiObject && emojiObject.emoji) {
            setText((prevText) => prevText + emojiObject.emoji);
        }

        // Close the emoji picker
        setIsEmojiPickerVisible(false);
    };
    const handleClickOutside = (event) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target)
        ) {
            setIsEmojiPickerVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }

    const handleClickSendMsg = (e) => {
        if (text !== "") {
            try {
                const newMessage = {
                    chat_id: props.chat_id,
                    content: text,
                    sender_id: user._id,
                    sender_name: user.username,
                    timeStamp: new Date(),
                };
                console.log(newMessage);
                const res = messageService.createMessage(
                    props.chat_id,
                    user._id,
                    user.username,
                    text
                );
                socket.emit("sendMessage", newMessage, newMessage.sender_id);
                setMessages((messages) => [newMessage, ...messages]);
                setText("");
            } catch (err) {
                console.log(err);
            } finally {
            }
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                // Add a newline character at the cursor position
                setText((prevText) => prevText + "\n");
            } else {
                e.preventDefault();
                handleClickSendMsg(e);
            }
        }
    };
    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await messageService.getMessagesByChatID(
                props.chat_id,
                page + 1,
                limit
            );
            setMessages((messages) => [...messages, ...res.data.data]);
        }
    };

    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.chatBox} id="chatBox">
                {messages?.map((message, index) => (
                    <Message
                        key={index}
                        content={message.content}
                        sender_id={message.sender_id}
                        timeStamp={message.timeStamp}
                        singleChat={props.singleChat}
                        sender_name={message.sender_name}
                    />
                ))}
                {page < totalPages ? (
                    <p
                        className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer"
                        onClick={handleClickLoadMore}
                    >
                        Load more...
                    </p>
                ) : (
                    <></>
                )}
            </div>
            {props.showTextarea && (
                <div className="relative w-full h-fit self-stretch px-[9px] pt-[13px] pb-3.5 items-center flex">
                    {isEmojiPickerVisible && (
                        <div
                            ref={emojiPickerRef}
                            style={{
                                position: "absolute",
                                top: -450 + "px",
                            }}
                        >
                            <EmojiPicker
                                skinTonesDisabled={true}
                                onEmojiClick={(emojiObject, e) =>
                                    handleSelectEmoji(emojiObject, e)
                                }
                                theme="dark"
                            />
                        </div>
                    )}
                    <div
                        className="xuk3077 x78zum5 x6prxxf xz9dl7a xsag5q8"
                        style={{ width: 100 + "%" }}
                    >
                        {/* <span className="">
                            <div
                                aria-label="Open more actions"
                                className="text-[#a3a3a3] hover:text-[#d1d1d1] x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz xsgj6o6 xw3qccf x1gslohp x12nagc x1iorvi4 x150jy0e xjkvuk6 x1e558r4"
                                role="button"
                                tabIndex="0"
                            >
                                <BsFillPlusCircleFill
                                    size="20px"
                                    className=""
                                />
                            </div>
                        </span> */}

                        <div className="relative x1iyjqo2 xw2csxc x1n2onr6">
                            <div
                                className="relative x78zum5 x1iyjqo2 x6q2ic0"
                                style={{ marginLeft: 0 + "px" }}
                            >
                                <div className="  xmjcpbm x107yiy2 xv8uw2v x1tfwpuw x2g32xy x9f619 x1iyjqo2 xeuugli">
                                    <div className="bg-[#505050] rounded-[20px] x78zum5 x1a02dak x13a6bvl">
                                        <div className="  x78zum5 x1iyjqo2 x1gja9t x16n37ib x1xmf6yo x1e56ztr xeuugli x1n2onr6">
                                            <TextareaAutosize
                                                value={text}
                                                style={{
                                                    fontSize: 16 + "px",

                                                    backgroundColor:
                                                        "transparent",
                                                    outline: "none",
                                                    width: "100%",
                                                    resize: "none",
                                                    color: "#e4e6eb",
                                                }}
                                                onChange={(e) =>
                                                    setText(e.target.value)
                                                }
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e)
                                                }
                                            ></TextareaAutosize>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="x6s0dn4 x1ey2m1c x78zum5 xl56j7k x10l6tqk x1vjfegm x12nagc xw3qccf xds687c">
                                <span className="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                                    <div
                                        aria-label="Choose an emoji"
                                        className="text-[#a3a3a3] hover:text-[#d1d1d1] x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1iorvi4 x150jy0e xjkvuk6 x1e558r4"
                                        role="button"
                                        tabIndex="0"
                                        onClick={() =>
                                            setIsEmojiPickerVisible(
                                                !isEmojiPickerVisible
                                            )
                                        }
                                    >
                                        <FaFaceSmile size="20px" />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <span className="">
                            <div
                                aria-label="Press enter to send"
                                className="text-[#a3a3a3] hover:text-[#d1d1d1] x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r xat24cr x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1c4vz4f x2lah0s xsgj6o6 xw3qccf x1y1aw1k x1sxyh0 xwib8y2 xurb0ha"
                                role="button"
                                tabIndex="0"
                                title="Press Enter to send"
                                onClick={handleClickSendMsg}
                            >
                                <PiPaperPlaneRightFill size="20px" />
                            </div>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ChatBox;
