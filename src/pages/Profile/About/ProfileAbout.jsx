import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./day-picker.scss";

import {
    FaClock,
    FaPhoneAlt,
    FaEnvelope,
    FaBirthdayCake,
    FaPen,
    FaLock,
    FaUserFriends,
    FaGlobeAsia,
} from "react-icons/fa";

import { userService } from "../../../services";
import Loading from "../../../components/Loading";
import SelectPrivacy from "../../../components/Select/SelectPrivacy";
import { setUser } from "../../../redux/user/userSlice";
import ProfileFriends from "../Friends/ProfileFriends";
const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
};
const ProfileAbout = ({ user_id }) => {
    const user = useSelector((state) => state.user.data);

    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    const [isEditIntro, setIsEditIntro] = useState(false);
    const [description, setDescription] = useState("");

    const [isEditPhone, setIsEditPhone] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneVisible, setPhoneVisible] = useState("");

    const [isEditBirthday, setIsEditBirthday] = useState(false);
    const [birthdayDate, setBirthdayDate] = useState();
    const [birthdayVisible, setBirthdayVisible] = useState("");
    const [defaultMonth, setDefaultMonth] = useState();

    const [edittingMusic, setEdittingMusic] = useState(false);

    const fetchUserData = async () => {
        const res = await userService.getUserById(user_id);
        setUserData(res.data.data);
        setDescription(res.data.data.description);
        setPhoneNumber(res.data.data.phone.number);
        setPhoneVisible(res.data.data.phone.visible);

        setBirthdayDate(new Date(res.data.data.birthday.date));
        setBirthdayVisible(res.data.data.birthday.visible);

        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["profileAbout", user_id],
        queryFn: () => fetchUserData(),
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleEditIntro = async () => {
        try {
            const userdata = {
                description: description,
                user_id: user_id,
                username: userData.username,
                musicType: userData.musicType,
                phone: userData.phone,
                birthday: userData.birthday,
            };
            console.log(userdata);
            const res = await userService.updateUserInfo(userdata);
            setUserData(res.data.data);

            dispatch(
                setUser({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    description: res.data.data.description,
                    musicType: user.musicType,
                    avatar: user.avatar,
                    registration_date: user.registration_date,
                })
            );
            setIsEditIntro(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditBirthday = async () => {
        try {
            const userdata = {
                description: userData.description,
                user_id: user_id,
                username: userData.username,
                musicType: userData.musicType,
                phone: userData.phone,
                birthday: {
                    date: birthdayDate,
                    visible: birthdayVisible,
                },
            };
            console.log(userdata);
            const res = await userService.updateUserInfo(userdata);

            setUserData(res.data.data);

            setIsEditBirthday(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditPhone = async () => {
        try {
            const userdata = {
                description: userData.description,
                user_id: user_id,
                username: userData.username,
                musicType: userData.musicType,
                phone: {
                    number: phoneNumber,
                    visible: phoneVisible,
                },
                birthday: userData.birthday,
            };
            console.log(userdata);
            const res = await userService.updateUserInfo(userdata);
            setUserData(res.data.data);
            setIsEditPhone(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-full flex flex-col gap-[20px]">
            <div className="w-full flex gap-[20px]">
                <div className="left w-[40%] flex flex-col gap-[20px]">
                    <div className="flex flex-col w-full p-[20px] bg-[#303030] rounded-[20px] gap-[10px]">
                        <div className="w-full flex-1 text-[25px] font-bold">
                            Intro
                        </div>
                        {/*description*/}
                        <div className="w-full flex flex-col items-center gap-[10px]">
                            {userData && (
                                <>
                                    {userData?.description != "" &&
                                    userData?._id == user._id ? (
                                        <>
                                            {isEditIntro ? (
                                                <div className="w-full relative">
                                                    <TextareaAutosize
                                                        className={`w-full p-[10px] border-[1px] border-solid border-[#ffff] text-[20px] rounded-[4px] resize-none bg-transparent`}
                                                        value={description}
                                                        minRows="3"
                                                        maxRows="6"
                                                        maxLength="100"
                                                        autoFocus
                                                        onChange={(e) => {
                                                            setDescription(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <div className="w-full flex gap-[10px]">
                                                        <div
                                                            className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                            onClick={() => {
                                                                setIsEditIntro(
                                                                    false
                                                                );
                                                                setDescription(
                                                                    userData?.description
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </div>
                                                        {description !=
                                                        userData?.description ? (
                                                            <div
                                                                className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                onClick={() =>
                                                                    handleEditIntro()
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
                                                <>
                                                    <div className="w-full flex-1 text-[20px] text-center">
                                                        {userData?.description}
                                                    </div>
                                                    <div
                                                        className="w-full h-[30px] text-[18px] text-center cursor-pointer font-[500] bg-[#555555] hover:bg-[#676668] hover:text-[#fff] text-[#e4e6eb] rounded-[5px]"
                                                        onClick={() => {
                                                            setIsEditIntro(
                                                                true
                                                            );
                                                            setDescription(
                                                                userData?.description
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="w-full flex gap-[10px] items-center">
                            <FaClock size="20px" />
                            <div className="w-full flex-1 text-[18px] ">
                                Joined{" "}
                                {moment(userData?.registration_date).format(
                                    "LL"
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col w-full p-[20px] bg-[#303030] rounded-[20px] gap-[10px]">
                        <div className="w-full flex-1 text-[25px] font-bold">
                            Music
                        </div>
                        <div className="w-full flex flex-col items-center gap-[10px]">
                            {userData && (
                                <>
                                    <div className="w-full flex-1 text-[20px] text-center">
                                        {userData?.musicType.map(
                                            (item, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="mr-[10px] text-[#adadad]"
                                                    >
                                                        {item}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                    {userData?.description &&
                                        userData?._id == user._id && (
                                            <button className="w-full h-[30px] text-[18px] font-[500] bg-[#555555] hover:bg-[#676668] hover:text-[#fff] text-[#e4e6eb] rounded-[5px]" onClick={() => setEdittingMusic(true)}>
                                                Edit
                                            </button>
                                        )}
                                </>
                            )}
                        </div>
                    </div> */}
                </div>
                <div className="right w-[60%] flex flex-col gap-[20px]">
                    <div className="flex flex-col w-full p-[20px] bg-[#303030] rounded-[20px] gap-[10px]">
                        <div className="w-full flex-1 text-[25px] font-bold">
                            About
                        </div>
                        <div className="w-full flex gap-[10px] items-center">
                            <FaEnvelope size="25px" />
                            <div className="w-full">
                                <div className="text-[18px] flex-1">
                                    {userData?.email}
                                </div>
                                <div className="text-[15px] text-[#adadad]">
                                    Email
                                </div>
                            </div>
                        </div>
                        {user._id != userData?._id ? (
                            <>
                                {/*phone*/}
                                {userData?.phone.visible == "PUBLIC" && (
                                    <div className="w-full flex gap-[10px] items-center">
                                        <FaPhoneAlt size="25px" />
                                        {isEditPhone ? (
                                            <div className="flex flex-col w-full">
                                                <input
                                                    className="w-full p-[10px] border-[1px] border-solid border-[#ffff] text-[20px] rounded-[4px] resize-none bg-transparent"
                                                    type="tel"
                                                    maxLength="10"
                                                    value={phoneNumber}
                                                    onChange={(e) =>
                                                        setPhoneNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className="w-full flex items-start mt-[20px]">
                                                    <div className="flex-1">
                                                        <div className="w-[150px] h-[50px]">
                                                            <SelectPrivacy
                                                                value={
                                                                    phoneVisible
                                                                }
                                                                setValue={
                                                                    setPhoneVisible
                                                                }
                                                                listValue={[
                                                                    "PUBLIC",
                                                                    "PRIVATE",
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="w-full flex gap-[10px]">
                                                        <div
                                                            className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]"
                                                            onClick={() => {
                                                                setIsEditPhone(
                                                                    false
                                                                );
                                                                setPhoneNumber(
                                                                    userData
                                                                        ?.phone
                                                                        .number
                                                                );
                                                                setPhoneVisible(
                                                                    userData
                                                                        ?.phone
                                                                        .visible
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </div>
                                                        {phoneNumber !=
                                                            userData?.phone
                                                                .number ||
                                                        phoneVisible !=
                                                            userData?.phone
                                                                .visible ? (
                                                            <div
                                                                className="flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px] 
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                                                onClick={() =>
                                                                    handleEditPhone()
                                                                }
                                                            >
                                                                Save
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                                            >
                                                                Save
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-full">
                                                    <div className="text-[18px] flex-1">
                                                        {userData?.phone.number}
                                                    </div>
                                                    <div className="text-[15px] text-[#adadad]">
                                                        Phone
                                                    </div>
                                                </div>
                                                {userData?._id == user._id && (
                                                    <>
                                                        {userData?.phone
                                                            .visible ==
                                                            "PUBLIC" && (
                                                            <div
                                                                className="mr-[10px]"
                                                                title="Public"
                                                            >
                                                                <FaGlobeAsia size="20px" />
                                                            </div>
                                                        )}
                                                        {userData?.phone
                                                            .visible ==
                                                            "PRIVATE" && (
                                                            <div
                                                                className="mr-[10px]"
                                                                title="Private"
                                                            >
                                                                <FaLock size="20px" />
                                                            </div>
                                                        )}
                                                        <button
                                                            className="flex justify-center items-center h-[30px] w-[100px] p-[5px] gap-[5px] bg-[#555555] hover:bg-[#676668] hover:text-[#fff]
                                          rounded-[5px]"
                                                            onClick={() => {
                                                                setIsEditPhone(
                                                                    true
                                                                );
                                                                setPhoneNumber(
                                                                    userData
                                                                        ?.phone
                                                                        .number
                                                                );
                                                            }}
                                                        >
                                                            <FaPen size="15px" />
                                                            <p className="text-[16px] font-[500] text-[#e4e6eb]">
                                                                Edit
                                                            </p>
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}

                                {/*birthday*/}
                                {userData?.birthday.visible == "PUBLIC" && (
                                    <div className="w-full flex gap-[10px] items-center">
                                        <FaBirthdayCake size="25px" />
                                        {isEditBirthday ? (
                                            <div className="w-full">
                                                <div className="w-full">
                                                    <DayPicker
                                                        defaultMonth={
                                                            birthdayDate
                                                        }
                                                        mode="single"
                                                        selected={birthdayDate}
                                                        onSelect={
                                                            setBirthdayDate
                                                        }
                                                        fromDate={
                                                            new Date(
                                                                1800,
                                                                9,
                                                                10
                                                            )
                                                        }
                                                        toDate={new Date()}
                                                        captionLayout="dropdown"
                                                    />
                                                </div>

                                                <div className="w-full flex items-start mt-[20px]">
                                                    <div className="flex-1">
                                                        <div className="w-[150px] h-[50px]">
                                                            <SelectPrivacy
                                                                value={
                                                                    birthdayVisible
                                                                }
                                                                setValue={
                                                                    setBirthdayVisible
                                                                }
                                                                listValue={[
                                                                    "PUBLIC",
                                                                    "PRIVATE",
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex gap-[10px]">
                                                        <div
                                                            className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                            onClick={() => {
                                                                setIsEditBirthday(
                                                                    false
                                                                );

                                                                setBirthdayVisible(
                                                                    userData
                                                                        ?.birthday
                                                                        .visible
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </div>
                                                        {compareDates(
                                                            birthdayDate,
                                                            userData?.birthday
                                                                .date
                                                        ) != 0 ||
                                                        birthdayVisible !=
                                                            userData?.birthday
                                                                .visible ? (
                                                            <div
                                                                className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                onClick={() =>
                                                                    handleEditBirthday()
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
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-full">
                                                    <div className="text-[18px] flex-1">
                                                        {moment(
                                                            birthdayDate
                                                        ).format("LL")}
                                                    </div>
                                                    <div className="text-[15px] text-[#adadad]">
                                                        Birthday
                                                    </div>
                                                </div>
                                                {userData?._id == user._id && (
                                                    <>
                                                        {userData?.birthday
                                                            .visible ==
                                                            "PUBLIC" && (
                                                            <div
                                                                className="mr-[10px]"
                                                                title="Public"
                                                            >
                                                                <FaGlobeAsia size="20px" />
                                                            </div>
                                                        )}
                                                        {userData?.birthday
                                                            .visible ==
                                                            "PRIVATE" && (
                                                            <div
                                                                className="mr-[10px]"
                                                                title="Private"
                                                            >
                                                                <FaLock size="20px" />
                                                            </div>
                                                        )}
                                                        <button
                                                            className="flex justify-center items-center h-[30px] w-[100px] p-[5px] gap-[5px] bg-[#555555] hover:bg-[#676668] hover:text-[#fff]
                                          rounded-[5px]"
                                                            onClick={() => {
                                                                setIsEditBirthday(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <FaPen size="15px" />
                                                            <p className="text-[16px] font-[500] text-[#e4e6eb]">
                                                                Edit
                                                            </p>
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/*phone*/}
                                <div className="w-full flex gap-[10px] items-center">
                                    <FaPhoneAlt size="25px" />
                                    {isEditPhone ? (
                                        <div className="flex flex-col w-full">
                                            <input
                                                className="w-full p-[10px] border-[1px] border-solid border-[#ffff] text-[20px] rounded-[4px] resize-none bg-transparent"
                                                type="tel"
                                                maxLength="10"
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="w-full flex items-start mt-[20px]">
                                                <div className="flex-1">
                                                    <div className="w-[150px] h-[50px]">
                                                        <SelectPrivacy
                                                            value={phoneVisible}
                                                            setValue={
                                                                setPhoneVisible
                                                            }
                                                            listValue={[
                                                                "PUBLIC",
                                                                "PRIVATE",
                                                            ]}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full flex gap-[10px]">
                                                    <div
                                                        className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]"
                                                        onClick={() => {
                                                            setIsEditPhone(
                                                                false
                                                            );
                                                            setPhoneNumber(
                                                                userData?.phone
                                                                    .number
                                                            );
                                                            setPhoneVisible(
                                                                userData?.phone
                                                                    .visible
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    {phoneNumber !=
                                                        userData?.phone
                                                            .number ||
                                                    phoneVisible !=
                                                        userData?.phone
                                                            .visible ? (
                                                        <div
                                                            className="flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px] 
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                                            onClick={() =>
                                                                handleEditPhone()
                                                            }
                                                        >
                                                            Save
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]"
                                                        >
                                                            Save
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-full">
                                                <div className="text-[18px] flex-1">
                                                    {userData?.phone.number}
                                                </div>
                                                <div className="text-[15px] text-[#adadad]">
                                                    Phone
                                                </div>
                                            </div>
                                            {userData?._id == user._id && (
                                                <>
                                                    {userData?.phone.visible ==
                                                        "PUBLIC" && (
                                                        <div
                                                            className="mr-[10px]"
                                                            title="Public"
                                                        >
                                                            <FaGlobeAsia size="20px" />
                                                        </div>
                                                    )}
                                                    {userData?.phone.visible ==
                                                        "PRIVATE" && (
                                                        <div
                                                            className="mr-[10px]"
                                                            title="Private"
                                                        >
                                                            <FaLock size="20px" />
                                                        </div>
                                                    )}
                                                    <button
                                                        className="flex justify-center items-center h-[30px] w-[100px] p-[5px] gap-[5px] bg-[#555555] hover:bg-[#676668] hover:text-[#fff]
                                          rounded-[5px]"
                                                        onClick={() => {
                                                            setIsEditPhone(
                                                                true
                                                            );
                                                            setPhoneNumber(
                                                                userData?.phone
                                                                    .number
                                                            );
                                                        }}
                                                    >
                                                        <FaPen size="15px" />
                                                        <p className="text-[16px] font-[500] text-[#e4e6eb]">
                                                            Edit
                                                        </p>
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/*birthday*/}
                                <div className="w-full flex gap-[10px] items-center">
                                    <FaBirthdayCake size="25px" />
                                    {isEditBirthday ? (
                                        <div className="w-full">
                                            <div className="w-full">
                                                <DayPicker
                                                    defaultMonth={birthdayDate}
                                                    mode="single"
                                                    selected={birthdayDate}
                                                    onSelect={setBirthdayDate}
                                                    fromDate={
                                                        new Date(1800, 9, 10)
                                                    }
                                                    toDate={new Date()}
                                                    captionLayout="dropdown"
                                                />
                                            </div>

                                            <div className="w-full flex items-start mt-[20px]">
                                                <div className="flex-1">
                                                    <div className="w-[150px] h-[50px]">
                                                        <SelectPrivacy
                                                            value={
                                                                birthdayVisible
                                                            }
                                                            setValue={
                                                                setBirthdayVisible
                                                            }
                                                            listValue={[
                                                                "PUBLIC",
                                                                "PRIVATE",
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full flex gap-[10px]">
                                                    <div
                                                        className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                        onClick={() => {
                                                            setIsEditBirthday(
                                                                false
                                                            );

                                                            setBirthdayVisible(
                                                                userData
                                                                    ?.birthday
                                                                    .visible
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                    {compareDates(
                                                        birthdayDate,
                                                        userData?.birthday.date
                                                    ) != 0 ||
                                                    birthdayVisible !=
                                                        userData?.birthday
                                                            .visible ? (
                                                        <div
                                                            className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                            onClick={() =>
                                                                handleEditBirthday()
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
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-full">
                                                <div className="text-[18px] flex-1">
                                                    {moment(
                                                        birthdayDate
                                                    ).format("LL")}
                                                </div>
                                                <div className="text-[15px] text-[#adadad]">
                                                    Birthday
                                                </div>
                                            </div>
                                            {userData?._id == user._id && (
                                                <>
                                                    {userData?.birthday
                                                        .visible ==
                                                        "PUBLIC" && (
                                                        <div
                                                            className="mr-[10px]"
                                                            title="Public"
                                                        >
                                                            <FaGlobeAsia size="20px" />
                                                        </div>
                                                    )}
                                                    {userData?.birthday
                                                        .visible ==
                                                        "PRIVATE" && (
                                                        <div
                                                            className="mr-[10px]"
                                                            title="Private"
                                                        >
                                                            <FaLock size="20px" />
                                                        </div>
                                                    )}
                                                    <button
                                                        className="flex justify-center items-center h-[30px] w-[100px] p-[5px] gap-[5px] bg-[#555555] hover:bg-[#676668] hover:text-[#fff]
                                          rounded-[5px]"
                                                        onClick={() => {
                                                            setIsEditBirthday(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <FaPen size="15px" />
                                                        <p className="text-[16px] font-[500] text-[#e4e6eb]">
                                                            Edit
                                                        </p>
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ProfileFriends user_id={user_id} />
        </div>
    );
};

export default ProfileAbout;
