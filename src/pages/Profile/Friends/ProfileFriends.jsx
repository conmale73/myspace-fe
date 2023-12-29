import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ProfileFriends.module.scss";
import AllFriends from "./AllFriends/AllFriends";
import MutualFriends from "./MutualFriends/MutualFriends";
const ProfileFriends = ({ user_id }) => {
    const user = useSelector((state) => state.user.data);
    const [selectedTab, setSelectedTab] = useState("All Friends"); // ["All Friends", "Mutual Friends"]

    return (
        <div className="w-full flex gap-[20px]">
            <div className="flex flex-col w-full bg-[#303030] rounded-[20px] gap-[10px]">
                <div className="w-full flex-1 text-[25px] font-bold m-[20px]">
                    Friends
                </div>
                <div className={`${styles.nav}`}>
                    <div className={`${styles.navMenu}`}>
                        <div
                            className={`${styles.navItem} ${
                                selectedTab == "All Friends"
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={(e) => setSelectedTab("All Friends")}
                        >
                            <p
                                className={`${styles.text} ${
                                    selectedTab == "All Friends"
                                        ? styles.selectedText
                                        : ""
                                }`}
                            >
                                All Friends
                            </p>
                        </div>
                        {user_id != user._id && (
                            <div
                                className={`${styles.navItem} ${
                                    selectedTab == "Mutual Friends"
                                        ? styles.selected
                                        : ""
                                }`}
                                onClick={(e) =>
                                    setSelectedTab("Mutual Friends")
                                }
                            >
                                <p
                                    className={`${styles.text} ${
                                        selectedTab == "Mutual Friends"
                                            ? styles.selectedText
                                            : ""
                                    }`}
                                >
                                    Mutual Friends
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    {selectedTab == "All Friends" && (
                        <AllFriends user_id={user_id} />
                    )}
                    {user_id != user._id && selectedTab == "Mutual Friends" && (
                        <MutualFriends user_id={user_id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileFriends;
