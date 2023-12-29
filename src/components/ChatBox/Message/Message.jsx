import styles from "./Message.module.scss";
import UserInfoPreview from "../../UserInfoPreview";
import FormatDate from "../../../utils/FormatDate";
import { useSelector } from "react-redux";
import * as Tooltip from "@radix-ui/react-tooltip";
const Message = (props) => {
    const singleChat = props.singleChat;
    const user = useSelector((state) => state.user.data);

    return (
        <>
            {singleChat ? (
                <>
                    {props.sender_id === user._id ? (
                        <>
                            <div className={styles.singleChatMessage}>
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <div className={styles.myContainer}>
                                                <p className={styles.myContent}>
                                                    {props.content}
                                                </p>
                                            </div>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
                                                data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
                                                data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
                                                data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
                                                text-[#adadad] select-none rounded-[4px] bg-[#3b3b3b] 
                                                px-[15px] py-[10px] text-[15px] leading-none 
                                                shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                                                will-change-[transform,opacity]"
                                                sideOffset={5}
                                            >
                                                {FormatDate(props.timeStamp)}
                                                <Tooltip.Arrow className="fill-[#3b3b3b]" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            </div>
                        </>
                    ) : (
                        <div className={styles.singleChatMessage}>
                            <UserInfoPreview
                                thumbnailHeight="40px"
                                thumbnailWidth="40px"
                                showName={false}
                                user_id={props.sender_id}
                                bgStyles={false}
                                displayOnlineStatus={true}
                            />
                            <div className={styles.otherUser}>
                                <div className={styles.otherUserName}>
                                    {props.sender_name}
                                </div>
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <div
                                                className={
                                                    styles.otherUserContainer
                                                }
                                            >
                                                <p
                                                    className={
                                                        styles.otherUserContent
                                                    }
                                                >
                                                    {props.content}
                                                </p>
                                            </div>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
                                                data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
                                                data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
                                                data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
                                                text-[#adadad] select-none rounded-[4px] bg-[#3b3b3b] 
                                                px-[15px] py-[10px] text-[15px] leading-none 
                                                shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                                                will-change-[transform,opacity]"
                                                sideOffset={5}
                                            >
                                                {FormatDate(props.timeStamp)}

                                                <Tooltip.Arrow className="fill-[#3b3b3b]" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.message}>
                    <div className={styles.messageAvatar}>
                        <UserInfoPreview
                            thumbnailHeight="40px"
                            thumbnailWidth="40px"
                            showName={true}
                            user_id={props.sender_id}
                            bgStyles={false}
                            displayOnlineStatus={true}
                        />
                        <span className={styles.messageTime}>
                            {FormatDate(props.timeStamp)}
                        </span>
                    </div>
                    <p className={styles.messageContent}>{props.content}</p>
                </div>
            )}
        </>
    );
};
export default Message;
