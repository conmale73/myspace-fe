import React, { useState } from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import LeftSidebar from "../../LeftSidebar";
import RightSidebar from "../../RightSidebar";
import ToReadingButton from "../../ToReadingButton";

import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { setShowFooter } from "../../../redux/showFooter/showFooterSlice";
import { hideToast } from "../../../redux/toast/toastSlice";

function DefaultLayout({ children }) {
    const showFooter = useSelector((state) => state.showFooter.show);
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);
    const extendMode = useSelector((state) => state.mode.extend);

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <LeftSidebar />

                <div className={styles.headerAndContent}>
                    <div className={styles.header}>
                        <Header />
                    </div>

                    <div className={styles.content}>
                        <main role="main" className="wrapper">
                            <Outlet />
                        </main>
                    </div>
                </div>

                <div className={styles.left}>
                    <RightSidebar />
                </div>
            </div>
            <div
                className={`${styles.bottom} ${showFooter ? "" : styles.hide}`}
            >
                <button
                    className={styles.toggleButton}
                    onClick={() => dispatch(setShowFooter(!showFooter))}
                    title={showFooter ? "Hide" : "Show"}
                >
                    {showFooter ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <Footer />
            </div>
            <div
                className="flex items-center p-[20px] w-fit h-[60px] bg-[#303030] absolute bottom-[50px] left-[30px] z-[2147483647] rounded-[10px]"
                style={{ opacity: toast.show ? "1" : "0" }}
            >
                <div className="text-[#e4e6eb] text-[18px] font-bold">
                    {toast.message}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
