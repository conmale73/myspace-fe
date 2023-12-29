import styles from "./CommentModal.module.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import Post from "../Post";
import CommentTool from "./CommentTool";
import CommentList from "./CommentList/CommentList";
import UserInfoPreview from "../UserInfoPreview";

const CommentModal = (props) => {
    const user = useSelector((state) => state.user.data);
    const [comments, setComments] = useState([]);

    const [text, setText] = useState("");

    const fetchData = async () => {};
    const handleStateModal = () => {
        props.setOpenCommentModal(!props.openCommentModal);
    };

    return (
        <Dialog.Root
            open={props.openCommentModal}
            onOpenChange={(e) => handleStateModal(e)}
        >
            <Dialog.Trigger asChild>
                {props.commentCount > 0 ? (
                    <div
                        className={`flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute right-2`}
                    >
                        <FaRegCommentAlt className="" />
                        <span>{props.commentCount + " comments"}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute right-2">
                        <FaRegCommentAlt className="" />
                        <span>0 comments</span>
                    </div>
                )}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className={`${styles.commentModal} flex data-[state=open]:animate-contentShow fixed top-[50%] 
            left-[50%] h-fit translate-x-[-50%] translate-y-[-50%] overflow-x-hidden
            rounded-[6px] bg-neutral-800 p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
                >
                    <div className="flex flex-col gap-2 overflow-auto w-full h-[800px] max-h-[800px] relative">
                        <div
                            style={{
                                display: "flex",
                                borderBottom: "1px solid #4d4d4d",
                                paddingBottom: "10px",
                            }}
                        >
                            <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                {props.username}'s Post
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
                        <div>
                            <Post
                                key={props.id}
                                id={props.id}
                                user_id={props.user_id}
                                text={props.text}
                                createAt={props.createAt}
                                updateAt={props.updateAt}
                                privacy={props.privacy}
                                files={props.files}
                                likes={props.likes}
                                inCommentModal={true}
                                commentCount={props.commentCount}
                            />
                        </div>

                        <div className="flex flex-col h-fit min-h-[500px] mt-[20px]">
                            <CommentList
                                post_id={props.id}
                                comments={comments}
                                setComments={setComments}
                                setCommentCount={props.setCommentCount}
                            />
                        </div>
                        {user && (
                            <div className="fixed bottom-0 w-full max-w-[1010px] bg-neutral-800">
                                <CommentTool
                                    text={text}
                                    setText={setText}
                                    post_id={props.id}
                                    user_id={props.user_id}
                                    username={props.username}
                                    setComments={setComments}
                                    setCommentCount={props.setCommentCount}
                                />
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CommentModal;
