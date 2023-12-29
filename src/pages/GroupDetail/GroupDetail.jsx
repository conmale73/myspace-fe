import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setExtend } from "../../redux/mode/modeSlice";
import { useParams } from "react-router-dom";
import { groupService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FaPlus, FaGlobeAsia, FaLock, FaPen } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonAddDisabled, MdPersonRemove } from "react-icons/md";

import Loading from "../../components/Loading";
import ImageViewer from "../../components/ImageViewer";
import UserInfoPreview from "../../components/UserInfoPreview";
import styles from "./GroupDetail.module.scss";
import Discussion from "./Discussion";
import Members from "./Members";
import Events from "./Events";
import About from "./About";
import GroupSettings from "./GroupSettings";
import GroupModeration from "./GroupModeration";
import { setGroupDetail } from "../../redux/groupDetail/groupDetailSlice";
import InviteModal from "./InviteModal/InviteModal";
import LeaveGroupButton from "./LeaveGroupButton/LeaveGroupButton";
const GroupDetail = () => {
    const { group_id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data) || "0";
    useEffect(() => {
        dispatch(setExtend("groupDetail"));

        return () => {
            dispatch(setExtend(null));
        };
    }, []);
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState("Discussion"); // ["Discussion", "Members", "Events", "GroupSettings"]

    const [group, setGroup] = useState(null);
    const groupDetail = useSelector((state) => state.groupDetail.data);
    const [role, setRole] = useState(0); // 0: member, 1: admin, 2: creator, 3: creator & admin

    const [openInviteModal, setOpenInviteModal] = useState(false);
    const fetchGroup = async () => {
        const res = await groupService.getGroupById(group_id, user._id);
        setGroup(res.data.data);
        dispatch(setGroupDetail(res.data.data));
        document.title = `${res.data.data.name} | MySPACE`;
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupDetail", group_id],
        queryFn: () => fetchGroup(),
    });

    useEffect(() => {
        if (user != "0") {
            const checkRole = () => {
                if (
                    user._id === groupDetail?.creator_id &&
                    groupDetail?.admins.includes(user._id)
                ) {
                    setRole(3);
                } else if (
                    user._id === groupDetail?.creator_id &&
                    !groupDetail?.admins.includes(user._id)
                ) {
                    setRole(2);
                } else if (groupDetail?.admins.includes(user._id)) {
                    setRole(1);
                } else {
                    setRole(0);
                }
            };
            checkRole();
        } else {
            return;
        }
    }, [groupDetail?._id]);

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleClickJoin = async () => {
        if (user != "0") {
            const data = {
                user_id: user._id,
            };

            if (groupDetail?.privacy == "PUBLIC") {
                const res = await groupService.joinGroup(group_id, data);
                dispatch(setGroupDetail(res.data.data));
            } else if (groupDetail?.privacy == "PRIVATE") {
                const res = await groupService.requestJoinGroup(group_id, data);
                dispatch(setGroupDetail(res.data.data));
            }
        } else {
            navigate("/authentication/login");
        }
    };

    const handleClickCancelRequest = async () => {
        const data = {
            user_id: user._id,
            notification_id: groupDetail?.pendingRequests.find(
                (request) => request.user_id == user._id
            ).notification_id,
        };
        console.log(data);
        const res = await groupService.cancelRequestJoinGroup(group_id, data);
        dispatch(setGroupDetail(res.data.data));
    };

    const handleAcceptInvitation = async () => {
        const data = {
            user_id: user._id,
            notification_id: groupDetail?.pendingMembers.find(
                (member) => member.receiver_id == user._id
            ).notification_id,
        };
        console.log(data);
        const res = await groupService.acceptInvitationToGroup(group_id, data);
        dispatch(setGroupDetail(res.data.data));
    };

    const handleDeclineInvitation = async () => {
        const data = {
            user_id: user._id,
            notification_id: groupDetail?.pendingMembers.find(
                (member) => member.receiver_id == user._id
            ).notification_id,
        };
        console.log(data);

        const res = await groupService.declineInvitationToGroup(group_id, data);
        console.log(res.data);
        dispatch(setGroupDetail(res.data.data));
    };

    if (
        groupDetail?.members?.includes(user?._id) ||
        (groupDetail?.privacy == "PUBLIC" &&
            !groupDetail?.members?.includes(user?._id))
    ) {
        return (
            <div
                className={`${styles.groupDetail} flex w-full flex-col gap-[20px] items-center`}
            >
                <div
                    className={`groupHeader w-full h-fit flex flex-col items-center bg-[#303030] rounded-[20px]`}
                >
                    <div
                        className="imageContainer flex justify-center groupThumbnail w-[80%] h-[400px] 
                object-fill relative"
                    >
                        {group && (
                            <ImageViewer
                                image={groupDetail?.thumbnail?.files[0]}
                                objectFit="cover"
                            />
                        )}

                        <div className="groupBy flex items-center gap-2 pl-[10px] absolute bottom-0 h-[50px] w-full bg-[#414141]">
                            <span className="">{`Group by`}</span>
                            {group && user && (
                                <UserInfoPreview
                                    nameOnly={true}
                                    user_id={groupDetail?.creator_id}
                                    link={true}
                                />
                            )}
                        </div>
                    </div>
                    <div className="groupInfo w-full h-fit flex justify-center">
                        <div className="w-[80%]">
                            <div className="groupName text-[30px] font-bold text-start">
                                {groupDetail?.name}
                            </div>
                            <div className="groupDescription flex gap-[10px] items-center mt-[5px] mb-[10px]">
                                {groupDetail?.privacy == "PUBLIC" ? (
                                    <div className="groupPrivacy flex gap-[5px] items-center">
                                        <FaGlobeAsia
                                            size="14px"
                                            color="#adadad"
                                        />
                                        <p className="text-[14px] text-[#adadad]">
                                            Public group
                                        </p>
                                    </div>
                                ) : (
                                    <div className="groupPrivacy flex gap-[5px] items-center">
                                        <FaLock size="20px" color="#adadad" />
                                        <p className="text-[14px] text-[#adadad]">
                                            Private group
                                        </p>
                                    </div>
                                )}
                                <span>•</span>
                                <p
                                    className="text-[16px] font-[600] hover:underline cursor-pointer"
                                    onClick={() => setSelectedTab("Members")}
                                >{`${groupDetail?.members.length} members`}</p>
                                <span>•</span>

                                <p className="text-[16px] font-[500] flex-1 text-ellipsis">
                                    {groupDetail?.description}
                                </p>
                            </div>
                            <div className="groupMemberPreview flex w-full h-fit items-center gap-2 relative">
                                {groupDetail?.members?.map((member, index) => {
                                    if (index < 10) {
                                        return (
                                            <UserInfoPreview
                                                thumbnailWidth="30px"
                                                thumbnailHeight="30px"
                                                key={index}
                                                user_id={member}
                                                showName={false}
                                                displayOnlineStatus={false}
                                            />
                                        );
                                    }
                                })}
                                {groupDetail?.members.includes(user._id) ? (
                                    <div className="flex gap-[10px] absolute right-0">
                                        <InviteModal
                                            key="invitemodal"
                                            open={openInviteModal}
                                            setOpen={setOpenInviteModal}
                                            memberList={groupDetail?.members}
                                        />
                                        <LeaveGroupButton
                                            group_id={group_id}
                                            key="leaveGroupButton"
                                            creator_id={groupDetail?.creator_id}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {groupDetail?.pendingMembers.some(
                                            (member) =>
                                                member.receiver_id == user._id
                                        ) ? (
                                            <div className="flex absolute right-0 gap-[10px]">
                                                <div
                                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#404040]
            hover:bg-[#555555] w-fit h-[40px]"
                                                    onClick={() =>
                                                        handleDeclineInvitation()
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
                                                        handleAcceptInvitation()
                                                    }
                                                >
                                                    <IoMdPersonAdd size="18px" />
                                                    <div className="text-[18px] font-bold">
                                                        Accept invitation
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {groupDetail?.pendingRequests.some(
                                                    (request) =>
                                                        request.user_id ==
                                                        user._id
                                                ) ? (
                                                    <span
                                                        className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                                 hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                                        onClick={() =>
                                                            handleClickCancelRequest()
                                                        }
                                                    >
                                                        <FaUserGroup size="18px" />
                                                        <div className="text-[18px] font-bold">
                                                            Cancel request
                                                        </div>
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                                        onClick={() =>
                                                            handleClickJoin()
                                                        }
                                                    >
                                                        <FaUserGroup size="18px" />
                                                        <div className="text-[18px] font-bold">
                                                            Join group
                                                        </div>
                                                    </span>
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
                                            selectedTab == "Discussion"
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={(e) =>
                                            setSelectedTab("Discussion")
                                        }
                                    >
                                        <p
                                            className={`${styles.text} ${
                                                selectedTab == "Discussion"
                                                    ? styles.selectedText
                                                    : ""
                                            }`}
                                        >
                                            Discussion
                                        </p>
                                    </div>
                                    <div
                                        className={`${styles.navItem} ${
                                            selectedTab == "Members"
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={(e) =>
                                            setSelectedTab("Members")
                                        }
                                    >
                                        <p
                                            className={`${styles.text} ${
                                                selectedTab == "Members"
                                                    ? styles.selectedText
                                                    : ""
                                            }`}
                                        >
                                            Members
                                        </p>
                                    </div>
                                    {groupDetail?.admins.some(
                                        (admin) => admin == user._id
                                    ) && (
                                        <div
                                            className={`${styles.navItem} ${
                                                selectedTab == "Requests"
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={(e) =>
                                                setSelectedTab("Requests")
                                            }
                                        >
                                            <p
                                                className={`${styles.text} ${
                                                    selectedTab == "Requests"
                                                        ? styles.selectedText
                                                        : ""
                                                }`}
                                            >
                                                Requests
                                            </p>
                                        </div>
                                    )}
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

                                    {/* <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "Events"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("Events")}
                                >
                                    <p
                                        className={`${styles.text} ${
                                            selectedTab == "Events"
                                                ? styles.selectedText
                                                : ""
                                        }`}
                                    >
                                        Events
                                    </p>
                                </div> */}

                                    {/* {groupDetail?.creator_id == user._id ? (
                                    <div
                                        className={`${styles.navItem} ${
                                            selectedTab == "GroupSettings"
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={(e) =>
                                            setSelectedTab("GroupSettings")
                                        }
                                    >
                                        <p
                                            className={`${styles.text} ${
                                                selectedTab == "GroupSettings"
                                                    ? styles.selectedText
                                                    : ""
                                            }`}
                                        >
                                            Settings
                                        </p>
                                    </div>
                                ) : null} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] h-fit min-h-[1000px] flex justify-center">
                    {selectedTab == "Discussion" && (
                        <Discussion
                            group_id={group_id}
                            group_name={groupDetail?.name}
                        />
                    )}
                    {selectedTab == "Members" && (
                        <Members
                            group_id={group_id}
                            memberList={groupDetail?.members}
                            admins={groupDetail?.admins}
                            creator_id={groupDetail?.creator_id}
                            role={role}
                        />
                    )}
                    {selectedTab == "Events" && <Events group_id={group_id} />}
                    {selectedTab == "GroupSettings" && (
                        <>
                            {groupDetail?.creator_id == user._id ? (
                                <GroupSettings group_id={group_id} />
                            ) : null}
                        </>
                    )}
                    {selectedTab == "Requests" && (
                        <>
                            {groupDetail?.admins.some(
                                (admin) => admin == user._id
                            ) ? (
                                <GroupModeration group_id={group_id} />
                            ) : null}
                        </>
                    )}
                    {selectedTab == "About" && (
                        <About group_data={groupDetail} />
                    )}
                </div>
            </div>
        );
    } else if (
        groupDetail?.privacy == "PRIVATE" &&
        !groupDetail?.members?.includes(user?._id)
    ) {
        return (
            <div
                className={`${styles.groupDetail} flex w-full flex-col gap-[20px] items-center`}
            >
                <div
                    className={`groupHeader w-full h-fit flex flex-col items-center bg-[#303030] rounded-[20px]`}
                >
                    <div
                        className="imageContainer flex justify-center groupThumbnail w-[80%] h-[400px] 
                object-fill relative"
                    >
                        {group && (
                            <ImageViewer
                                image={groupDetail?.thumbnail?.files[0]}
                                objectFit="cover"
                            />
                        )}

                        <div className="groupBy flex items-center gap-2 pl-[10px] absolute bottom-0 h-[50px] w-full bg-[#414141]">
                            <span className="">{`Group by`}</span>
                            {group && (
                                <UserInfoPreview
                                    nameOnly={true}
                                    user_id={groupDetail?.creator_id}
                                    link={true}
                                />
                            )}
                        </div>
                    </div>
                    <div className="groupInfo w-full h-fit flex justify-center">
                        <div className="w-[80%]">
                            <div className="groupName text-[30px] font-bold text-start">
                                {groupDetail?.name}
                            </div>
                            <div className="groupDescription flex gap-[10px] items-center mt-[5px] mb-[10px]">
                                <div className="groupPrivacy flex gap-[5px] items-center">
                                    <FaLock size="20px" color="#adadad" />
                                    <p className="text-[14px] text-[#adadad]">
                                        Private group
                                    </p>
                                </div>
                                <span>•</span>
                                <p
                                    className="text-[16px] font-[600] text-[#adadad]"
                                    onClick={() => setSelectedTab("Members")}
                                >{`${groupDetail?.members.length} members`}</p>
                                <span>•</span>
                            </div>
                            <div className="groupMemberPreview flex w-full h-fit items-center gap-2 relative">
                                <>
                                    {groupDetail?.pendingMembers.some(
                                        (member) =>
                                            member.receiver_id == user._id
                                    ) ? (
                                        <div className="flex absolute right-0 gap-[10px]">
                                            <div
                                                className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#404040]
            hover:bg-[#555555] w-fit h-[40px]"
                                                onClick={() =>
                                                    handleDeclineInvitation()
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
                                                    handleAcceptInvitation()
                                                }
                                            >
                                                <IoMdPersonAdd size="18px" />
                                                <div className="text-[18px] font-bold">
                                                    Accept invitation
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {groupDetail?.pendingRequests.some(
                                                (request) =>
                                                    request.user_id == user._id
                                            ) ? (
                                                <span
                                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                                 hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                                    onClick={() =>
                                                        handleClickCancelRequest()
                                                    }
                                                >
                                                    <FaUserGroup size="18px" />
                                                    <div className="text-[18px] font-bold">
                                                        Cancel request
                                                    </div>
                                                </span>
                                            ) : (
                                                <span
                                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                                    onClick={() =>
                                                        handleClickJoin()
                                                    }
                                                >
                                                    <FaUserGroup size="18px" />
                                                    <div className="text-[18px] font-bold">
                                                        Join group
                                                    </div>
                                                </span>
                                            )}
                                        </>
                                    )}
                                </>
                            </div>

                            <div className={`${styles.nav}`}>
                                <div className={`${styles.navMenu}`}>
                                    <div
                                        className={`${styles.navItem} ${styles.selected}`}
                                        onClick={(e) => setSelectedTab("About")}
                                    >
                                        <p
                                            className={`${styles.text} ${styles.selectedText}`}
                                        >
                                            About
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] h-fit min-h-[1000px] flex justify-center">
                    <About group_data={groupDetail} />
                </div>
            </div>
        );
    }
};

export default GroupDetail;
