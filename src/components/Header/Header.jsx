import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMode } from "../../redux/mode/modeSlice";
import SearchBox from "./SearchBox";
import NotificationButton from "./NotificationButton/NotificationButton";
import Messenger from "./MessengerButton/Messenger";
import ProfileButton from "./ProfileButton/ProfileButton";
function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);

    const [openNoti, setOpenNoti] = useState(false);
    const [openMess, setOpenMess] = useState(false);
    return (
        <div className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navList}>
                    <div
                        className={`${styles.navItem} ${
                            mode === "social" ? styles.selected : ""
                        }`}
                        onClick={() => {
                            dispatch(setMode("social"));
                        }}
                    >
                        <p title="Most listened songs">Explore</p>
                    </div>
                    <div
                        className={`${styles.navItem} ${
                            mode === "music" ? styles.selected : ""
                        }`}
                        onClick={() => {
                            dispatch(setMode("music"));
                        }}
                    >
                        <p title="Back to Homepage">Music</p>
                    </div>
                </div>
                <div className={styles.search}>
                    <SearchBox />
                </div>
                <div className={styles.buttons}>
                    {user != null ? (
                        <>
                            <div
                                className={styles.button}
                                onClick={() => setOpenNoti(true)}
                            >
                                <NotificationButton
                                    open={openNoti}
                                    setOpen={setOpenNoti}
                                />
                            </div>
                            <div
                                className={styles.button}
                                onClick={() => setOpenMess(true)}
                            >
                                <Messenger
                                    open={openMess}
                                    setOpen={setOpenMess}
                                />
                            </div>
                            <div className={styles.button}>
                                <ProfileButton />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/authentication/login">
                                <div className={styles.signInButton}>
                                    Sign In
                                </div>
                            </Link>
                            <Link to="/authentication/signup">
                                <div className={styles.signUpButton}>
                                    Sign Up
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
export default Header;
