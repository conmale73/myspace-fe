import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TbLogout } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";

import styles from "./ProfileButton.module.scss";
import { logout } from "../../../redux/user/userSlice";
import { emptyChatList } from "../../../redux/currentChatList/currentChatListSlice";
const ProfileButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const navigator = useNavigate();
    const handleLogOut = () => {
        dispatch(logout());
        dispatch(emptyChatList());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigator("/authentication/login");
    };
    const handleProfile = () => {
        navigator("/profile/" + user._id);
    };
    return (
        <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer">
                    <img
                        loading="lazy"
                        className={`w-full h-full object-contain rounded-full`}
                        src={`data:${user.avatar.files[0].fileInfo.type};base64,${user.avatar.files[0].dataURL}`}
                    />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade
                                         data-[side=left]:animate-slideRightAndFade 
                                        data-[side=top]:animate-slideDownAndFade w-[200px] rounded-md bg-neutral-400/25 p-5
                                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                                        data-[state=open]:transition-all"
                    sideOffset={5}
                >
                    <div className={styles.profileMenu}>
                        <div
                            className={styles.profileButton}
                            onClick={handleProfile}
                        >
                            <BsFillPersonFill size="24px" />

                            <p className={styles.text}>Profile</p>
                        </div>
                        <div
                            className={styles.profileButton}
                            onClick={handleLogOut}
                        >
                            <TbLogout color="#EE5151" size="24px" />
                            <p
                                className={styles.text}
                                style={{ color: "#f07676" }}
                            >
                                Log Out
                            </p>
                        </div>
                    </div>
                    <DropdownMenu.Arrow className="fill-blue-400/25" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ProfileButton;
