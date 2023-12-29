import styles from "./Profile.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";

import { FaPen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonAddDisabled, MdPersonRemove } from "react-icons/md";

import { userService } from "../../services";
import Loading from "../../components/Loading";
import ImageViewer from "../../components/ImageViewer";
import ProfileAbout from "./About/ProfileAbout";
import ProfileFriends from "./Friends/ProfileFriends";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import AvatarEditorComponent from "./ImageEditor/AvatarEditor";
import BackgroundEditor from "./BackgroundEditor";
import { setUser } from "../../redux/user/userSlice";
const Profile = () => {
    const user = useSelector((state) => state.user.data);
    const { user_id } = useParams();
    const navigator = useNavigate();

    if (user == null) {
        return (
            <>
                <p>You are not signed in. Please sign in to continue</p>
                <button
                    className={styles.signInButton}
                    onClick={() => navigator("/authentication/login")}
                >
                    Sign In
                </button>
            </>
        );
    } else {
        const [userData, setUserData] = useState(null);
        const dispatch = useDispatch();
        const [selectedTab, setSelectedTab] = useState("Posts"); // ["Posts", "About", "Friends", "Change Password""]

        const [file, setFile] = useState(null);
        const [originalFile, setOriginalFile] = useState(null);

        const [backgroundFile, setBackgroundFile] = useState(null);
        const [originalBackgroundFile, setOriginalBackgroundFile] =
            useState(null);

        const [isEditUsername, setIsEditUsername] = useState(false);
        const [username, setUsername] = useState("");

        const [isEditPassword, setIsEditPassword] = useState(false);
        const [isValidPassword, setIsValidPassword] = useState(true);
        const [oldPassword, setOldPassword] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [resMessage, setResMessage] = useState("");
        const [passwordError, setPasswordError] = useState([]);

        const fetchUserData = async () => {
            const res = await userService.getUserById(user_id);
            setUserData(res.data.data);
            setFile({
                dataURL: `data:${res.data.data.avatar.files[0].fileInfo.type};base64,${res.data.data.avatar.files[0].dataURL}`,
                fileInfo: res.data.data.avatar.files[0].fileInfo,
            });
            setOriginalFile({
                dataURL: `data:${res.data.data.avatar.files[0].fileInfo.type};base64,${res.data.data.avatar.files[0].dataURL}`,
                fileInfo: res.data.data.avatar.files[0].fileInfo,
            });

            setBackgroundFile({
                dataURL: res.data.data.background.files[0].dataURL,
                fileInfo: res.data.data.background.files[0].fileInfo,
            });
            setOriginalBackgroundFile({
                dataURL: res.data.data.background.files[0].dataURL,
                fileInfo: res.data.data.background.files[0].fileInfo,
            });

            return res.data.data;
        };
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["profile", user_id],
            queryFn: () => fetchUserData(),
        });

        if (isLoading) return <Loading isFullScreen={true} />;
        if (error) return <p>{error.message}</p>;

        const handleEditUsername = async () => {
            try {
                const userdata = {
                    description: userData.description,
                    user_id: user_id,
                    username: username,
                    musicType: userData.musicType,
                    phone: userData.phone,
                    birthday: userData.birthday,
                };
                console.log(userdata);
                const res = await userService.updateUserInfo(userdata);
                setUserData(res.data.data);
                setIsEditUsername(false);
            } catch (error) {
                console.log(error);
            }
        };

        const handleAddFriend = async () => {
            try {
                const data = {
                    user_id: user._id,
                    friend_id: user_id,
                };
                const res = await userService.addFriend(data);
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const handleUnFriend = async () => {
            try {
                const data = {
                    user_id: user._id,
                    friend_id: user_id,
                };
                const res = await userService.removeFriend(data);
                console.log(res.data);
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const handleCancelRequest = async () => {
            try {
                const data = {
                    user_id: user._id,
                    friend_id: user_id,
                    notification_id: userData?.friendRequest?.find(
                        (request) => request.user_id == user._id
                    ).notification_id,
                };

                const res = await userService.cancelFriendRequest(data);
                console.log(res.data);
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const handleAcceptRequest = async () => {
            try {
                const data = {
                    user_id: user._id,
                    friend_id: user_id,
                    notification_id: userData?.friendRequestSent?.find(
                        (request) => request.user_id == user._id
                    ).notification_id,
                };

                const res = await userService.acceptFriendRequest(data);
                console.log(res.data);
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const handleDeclineRequest = async () => {
            try {
                const data = {
                    user_id: user._id,
                    friend_id: user_id,
                    notification_id: userData?.friendRequestSent?.find(
                        (request) => request.user_id == user._id
                    ).notification_id,
                };
                const res = await userService.declineFriendRequest(data);
                console.log(res.data);
                setUserData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const handleOnChangePassword = (e) => {
            const typedPassword = e.target.value;
            setPassword(typedPassword);

            // Define a regular expression to match only letters and numbers
            const alphanumericRegex = /^[a-zA-Z0-9]+$/;

            if (!alphanumericRegex.test(typedPassword)) {
                if (
                    !passwordError.includes(
                        "Password must contain only letters and numbers"
                    )
                ) {
                    setPasswordError((passwordError) => [
                        ...passwordError,
                        "Password must contain only letters and numbers",
                    ]);
                }
            } else if (typedPassword.length < 6) {
                if (
                    !passwordError.includes(
                        "Password must be at least 6 characters"
                    )
                ) {
                    setPasswordError((passwordError) => [
                        ...passwordError,
                        "Password must be at least 6 characters",
                    ]);
                }
            } else if (typedPassword.length > 20) {
                if (
                    !passwordError.includes(
                        "Password must be less than 20 characters"
                    )
                ) {
                    setPasswordError((passwordError) => [
                        ...passwordError,
                        "Password must be less than 20 characters",
                    ]);
                }
            } else {
                // Clear the error if the password is valid
                setPasswordError([]);
            }
        };

        const handleEditPassword = async () => {
            try {
                const data = {
                    user_id: user._id,
                    password: oldPassword,
                    newPassword: password,
                };
                const res = await userService.updateUserPassword(data);
                // setResMessage(res.data.message);
                console.log(res.data.message);

                setIsEditPassword(false);
                setPassword("");
                setConfirmPassword("");
                setOldPassword("");
            } catch (error) {
                console.log(error);
                setResMessage(error.response.data.message);
                if (error.response.data.message == "Invalid password") {
                    setIsValidPassword(false);
                }
            }
        };
        return (
            <div className="container flex w-full flex-col gap-[20px] rounded-[20px] mb-[110px]">
                <div
                    className={`profileHeader w-full h-[580px] flex flex-col items-center bg-[#303030] rounded-[20px]
             `}
                >
                    <div
                        className="imageContainer flex justify-center w-[90%] h-[400px] 
                object-fill relative z-[1]"
                    >
                        {userData && (
                            <ImageViewer
                                image={userData?.background?.files[0]}
                                objectFit="cover"
                            />
                        )}
                        <div className="profileAvatar w-[150px] h-[150px] flex absolute bottom-[-100px] left-[20px] rounded-full">
                            {userData && (
                                <div className="rounded-full overflow-hidden">
                                    <ImageViewer
                                        image={userData?.avatar?.files[0]}
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profileInfo w-full h-[180px] flex flex-col items-center justify-between relative">
                        <div className="w-[80%] mt-[20px] relative">
                            <div className="profileName pl-[140px] text-[30px] font-bold text-start">
                                {userData?.username}
                            </div>
                            <div className="profileName pl-[140px] text-[18px] font-[400] text-[#adadad] text-start">
                                {userData?.friendList?.length} friends
                            </div>
                            {userData?._id == user._id && (
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <div
                                            className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 top-[10px] w-fit h-[40px]"
                                        >
                                            <FaPen size="18px" />
                                            <div className="text-[18px] font-bold">
                                                Edit Profile
                                            </div>
                                        </div>
                                    </Dialog.Trigger>

                                    <Dialog.Portal>
                                        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                                        <Dialog.Content
                                            className={` flex data-[state=open]:animate-contentShow fixed top-[50%] 
                                    left-[50%] min-w-[600px] h-fit translate-x-[-50%] translate-y-[-50%] overflow-x-hidden 
                                    rounded-[6px] bg-neutral-800 p-[25px] 
                                    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
                                        >
                                            <div className="flex flex-col gap-2 overflow-auto w-full min-h-[600px] max-h-[800px] relative">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        borderBottom:
                                                            "1px solid #4d4d4d",
                                                        paddingBottom: "10px",
                                                    }}
                                                >
                                                    <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                                        Edit Profile
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

                                                <div className="flex flex-col h-fit min-h-[300px] mt-[20px]">
                                                    <div className="w-full h-fit mb-[40px]">
                                                        <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                            Username
                                                            <div
                                                                className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                                                            hover:bg-[#676668] absolute right-0 top-0 w-fit h-[40px]"
                                                                onClick={() => {
                                                                    setIsEditUsername(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <FaPen size="18px" />
                                                                <div className="text-[18px] font-bold">
                                                                    Edit
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-[10px]">
                                                            {isEditUsername ? (
                                                                <div className="w-full">
                                                                    <input
                                                                        value={
                                                                            username
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setUsername(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                        maxLength={
                                                                            24
                                                                        }
                                                                        type="text"
                                                                        className="w-full max-w-[300px] h-[40px] rounded-[5px] bg-[#404040] text-[#e4e6eb] p-[10px] text-[18px] m-[10px]"
                                                                    />
                                                                    <div className="w-full flex gap-[10px] m-[10px]">
                                                                        <div
                                                                            className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                            onClick={() => {
                                                                                setIsEditUsername(
                                                                                    false
                                                                                );
                                                                                setUsername(
                                                                                    userData?.username
                                                                                );
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </div>
                                                                        {username !=
                                                                        userData?.username ? (
                                                                            <div
                                                                                className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                                onClick={() =>
                                                                                    handleEditUsername()
                                                                                }
                                                                            >
                                                                                Save
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                            >
                                                                                Save
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-[#e4e6eb] text-[15px] font-bold m-[10px]">
                                                                    {
                                                                        userData?.username
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-fit mb-[40px]">
                                                        <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                            Password
                                                            <div
                                                                className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                                                            hover:bg-[#676668] absolute right-0 top-0 w-fit h-[40px]"
                                                                onClick={() => {
                                                                    setIsEditPassword(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <FaPen size="18px" />
                                                                <div className="text-[18px] font-bold">
                                                                    Edit
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-[10px]">
                                                            {isEditPassword && (
                                                                <div className="w-full">
                                                                    <div className="flex gap-[10px]">
                                                                        <p className="text-[#e4e6eb] text-[15px] font-bold m-[10px] w-[100px]">
                                                                            Current
                                                                            password
                                                                        </p>
                                                                        <div className="flex flex-col">
                                                                            <input
                                                                                value={
                                                                                    oldPassword
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    setIsValidPassword(
                                                                                        true
                                                                                    );
                                                                                    setOldPassword(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                maxLength={
                                                                                    24
                                                                                }
                                                                                type="password"
                                                                                className="w-full max-w-[300px] h-[40px] rounded-[5px] bg-[#404040] text-[#e4e6eb] p-[10px] text-[18px] m-[10px] border-[1px] border-solid"
                                                                                style={{
                                                                                    borderColor:
                                                                                        !isValidPassword
                                                                                            ? "#ff1313"
                                                                                            : "",
                                                                                }}
                                                                            />
                                                                            {!isValidPassword && (
                                                                                <p className="text-[#ff1313] text-[15px] font-bold m-[10px]">
                                                                                    {
                                                                                        resMessage
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-[10px]">
                                                                        <p className="text-[#e4e6eb] text-[15px] font-bold m-[10px] w-[100px]">
                                                                            New
                                                                            password
                                                                        </p>
                                                                        <div className="flex flex-col">
                                                                            <input
                                                                                value={
                                                                                    password
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleOnChangePassword(
                                                                                        e
                                                                                    )
                                                                                }
                                                                                maxLength={
                                                                                    24
                                                                                }
                                                                                type="password"
                                                                                className="w-full max-w-[300px] h-[40px] rounded-[5px] bg-[#404040] text-[#e4e6eb] p-[10px] text-[18px] m-[10px] border-[1px] border-solid"
                                                                                style={{
                                                                                    borderColor:
                                                                                        password !=
                                                                                        confirmPassword
                                                                                            ? "#ff1313"
                                                                                            : "",
                                                                                }}
                                                                            />
                                                                            <ul className="text-[#ff1313] text-[14px] font-[400] m-[5px]">
                                                                                {passwordError.map(
                                                                                    (
                                                                                        err
                                                                                    ) => (
                                                                                        <li>
                                                                                            {
                                                                                                err
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-[10px]">
                                                                        <p className="text-[#e4e6eb] text-[15px] font-bold m-[10px] w-[100px]">
                                                                            Confirm
                                                                            password
                                                                        </p>
                                                                        <div className="flex flex-col">
                                                                            <input
                                                                                value={
                                                                                    confirmPassword
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    setConfirmPassword(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }}
                                                                                maxLength={
                                                                                    24
                                                                                }
                                                                                type="password"
                                                                                className="w-full max-w-[300px] h-[40px] rounded-[5px] bg-[#404040] text-[#e4e6eb] p-[10px] text-[18px] m-[10px] border-[1px] border-solid"
                                                                                style={{
                                                                                    borderColor:
                                                                                        password !=
                                                                                        confirmPassword
                                                                                            ? "#ff1313"
                                                                                            : "",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full flex gap-[10px] m-[10px]">
                                                                        <div
                                                                            className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                            onClick={() => {
                                                                                setIsEditPassword(
                                                                                    false
                                                                                );
                                                                                setOldPassword(
                                                                                    ""
                                                                                );
                                                                                setPassword(
                                                                                    ""
                                                                                );
                                                                                setConfirmPassword(
                                                                                    ""
                                                                                );
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </div>
                                                                        {password ==
                                                                            confirmPassword &&
                                                                        passwordError.length ==
                                                                            0 ? (
                                                                            <div
                                                                                className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                                onClick={() =>
                                                                                    handleEditPassword()
                                                                                }
                                                                            >
                                                                                Save
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                            >
                                                                                Save
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                            Avatar
                                                            <AvatarEditorComponent
                                                                image={file}
                                                                setImage={
                                                                    setFile
                                                                }
                                                                originalImage={
                                                                    originalFile
                                                                }
                                                                setUserData={
                                                                    setUserData
                                                                }
                                                            />
                                                        </div>
                                                        <div className="w-full h-[200px] rounded-[10px] mt-[10px] flex items-center justify-center">
                                                            <div className="w-[150px] h-[150px]">
                                                                <ImageViewer
                                                                    image={
                                                                        userData
                                                                            ?.avatar
                                                                            ?.files[0]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-fit">
                                                        <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                            Background
                                                            <BackgroundEditor
                                                                image={
                                                                    backgroundFile
                                                                }
                                                                setImage={
                                                                    setBackgroundFile
                                                                }
                                                                originalImage={
                                                                    originalBackgroundFile
                                                                }
                                                                setUserData={
                                                                    setUserData
                                                                }
                                                            />
                                                        </div>
                                                        <div className="w-full h-[200px] rounded-[10px] mt-[30px] flex items-center justify-center">
                                                            <div className="w-[400px] h-[200px]">
                                                                <ImageViewer
                                                                    image={
                                                                        userData
                                                                            ?.background
                                                                            ?.files[0]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            )}

                            {userData?._id != user._id && (
                                <>
                                    {userData?.friendList?.includes(
                                        user._id
                                    ) ? (
                                        <div
                                            className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                         hover:bg-[#676668] absolute right-0 top-[10px] w-fit h-[40px]"
                                            onClick={() => handleUnFriend()}
                                        >
                                            <MdPersonRemove size="18px" />
                                            <div className="text-[18px] font-bold">
                                                Unfriend
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {userData?.friendRequest?.some(
                                                (request) =>
                                                    request.user_id == user._id
                                            ) ? (
                                                <div
                                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                         hover:bg-[#676668] absolute right-0 top-[10px] w-fit h-[40px]"
                                                    onClick={() =>
                                                        handleCancelRequest()
                                                    }
                                                >
                                                    <MdPersonAddDisabled size="18px" />
                                                    <div className="text-[18px] font-bold">
                                                        Cancel Request
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {userData?.friendRequestSent?.some(
                                                        (request) =>
                                                            request.user_id ==
                                                            user._id
                                                    ) ? (
                                                        <div className="flex absolute right-0 top-[10px] gap-[10px]">
                                                            <div
                                                                className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#404040]
                                    hover:bg-[#555555] w-fit h-[40px]"
                                                                onClick={() =>
                                                                    handleDeclineRequest()
                                                                }
                                                            >
                                                                <div className="text-[18px] font-bold">
                                                                    Decline
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                         hover:bg-[#676668]  w-fit h-[40px]"
                                                                onClick={() =>
                                                                    handleAcceptRequest()
                                                                }
                                                            >
                                                                <IoMdPersonAdd size="18px" />
                                                                <div className="text-[18px] font-bold">
                                                                    Accept
                                                                    Friend
                                                                    Request
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                         hover:bg-[#676668] absolute right-0 top-[10px] w-fit h-[40px]"
                                                            onClick={() =>
                                                                handleAddFriend()
                                                            }
                                                        >
                                                            <IoMdPersonAdd size="18px" />
                                                            <div className="text-[18px] font-bold">
                                                                Add Friend
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={`${styles.nav}`}>
                            <div className={`${styles.navMenu}`}>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "Posts"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("Posts")}
                                >
                                    <p
                                        className={`${styles.text} ${
                                            selectedTab == "Posts"
                                                ? styles.selectedText
                                                : ""
                                        }`}
                                    >
                                        Posts
                                    </p>
                                </div>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "About"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("About")}
                                >
                                    <p
                                        className={`${styles.text} ${
                                            selectedTab == "About"
                                                ? styles.selectedText
                                                : ""
                                        }`}
                                    >
                                        About
                                    </p>
                                </div>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "Friends"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("Friends")}
                                >
                                    <p
                                        className={`${styles.text} ${
                                            selectedTab == "Friends"
                                                ? styles.selectedText
                                                : ""
                                        }`}
                                    >
                                        Friends
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {selectedTab == "Posts" && (
                        <ProfilePosts user_id={user_id} />
                    )}
                    {selectedTab == "About" && (
                        <ProfileAbout user_id={user_id} />
                    )}
                    {selectedTab == "Friends" && (
                        <ProfileFriends user_id={user_id} />
                    )}
                </div>
            </div>
        );
    }
};
export default Profile;
