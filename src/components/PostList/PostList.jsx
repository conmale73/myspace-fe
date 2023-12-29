import styles from "./PostList.module.scss";
import Post from "../Post";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../../services";
import Loading from "../Loading";
import { useState } from "react";

const PostList = (props) => {
    return (
        <>
            {" "}
            {props.data.length > 0 ? (
                <div className={styles.postList}>
                    {props.data?.map((post, index) => {
                        return (
                            <div key={index} className="w-full">
                                <Post
                                    key={post._id}
                                    id={post._id}
                                    user_id={post.user_id}
                                    text={post.content.text}
                                    createAt={post.createAt}
                                    updateAt={post.updateAt}
                                    group_id={post.group_id}
                                    privacy={post.privacy}
                                    files={post.content.files}
                                    likes={post.likes}
                                    commentCount={post.commentCount}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <p className="text-[#e4e6eb]">No post to show</p>
                </div>
            )}
        </>
    );
};
export default PostList;
