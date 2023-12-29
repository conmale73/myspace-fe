import styles from "./UserCard.module.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";
import { userService } from "../../services";

const UserCard = ({ userData }) => {
    const user = useSelector((state) => state.user.data);

    const [currentData, setCurrentData] = useState(userData);

    const handleAddFriend = async () => {
        try {
            const data = {
                user_id: user._id,
                friend_id: currentData._id,
            };
            const res = await userService.addFriend(data);
            setCurrentData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelRequest = async () => {
        try {
            const data = {
                user_id: user._id,
                friend_id: currentData._id,
                notification_id: currentData?.friendRequest?.find(
                    (request) => request.user_id == user._id
                ).notification_id,
            };

            const res = await userService.cancelFriendRequest(data);
            console.log(res.data);
            setCurrentData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptRequest = async () => {
        try {
            const data = {
                user_id: user._id,
                friend_id: currentData._id,
                notification_id: currentData?.friendRequestSent?.find(
                    (request) => request.user_id == user._id
                ).notification_id,
            };

            const res = await userService.acceptFriendRequest(data);
            console.log(res.data);
            setCurrentData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.userCard}>
            <div className={styles.content}>
                <div className={styles.avatar}>
                    {currentData?.avatar && (
                        <ImageViewer
                            image={currentData?.avatar.files[0]}
                            objectFit="cover"
                        />
                    )}
                </div>
                <div className={styles.info}>
                    <Link
                        to={`/profile/${currentData?._id}`}
                        className={styles.username}
                    >
                        {currentData?.username}
                    </Link>

                    <div className={styles.musicType}>
                        <p className="text-[15px]">Music Types: </p>
                        {currentData?.musicType?.map((type, index) => (
                            <span className={styles.type} key={index}>
                                {type}
                            </span>
                        ))}
                    </div>
                    {currentData?.description ? (
                        <p
                            className={styles.description}
                        >{`Intro: ${currentData?.description}`}</p>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={styles.actions}>
                    {currentData?.friendList.includes(user._id) ? (
                        <Link
                            to={`/profile/${currentData?._id}`}
                            className={styles.friendButton}
                        >
                            Friends
                        </Link>
                    ) : (
                        <>
                            {currentData?.friendRequest.some(
                                (request) => request.user_id === user._id
                            ) ? (
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => handleCancelRequest()}
                                >
                                    Cancel Request
                                </button>
                            ) : (
                                <>
                                    {currentData?.friendRequestSent.some(
                                        (request) =>
                                            request.user_id === user._id
                                    ) ? (
                                        <button
                                            className={styles.acceptButton}
                                            onClick={() =>
                                                handleAcceptRequest()
                                            }
                                        >
                                            Accept Request
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.addFriendButton}
                                            onClick={() => handleAddFriend()}
                                        >
                                            Add friend
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
