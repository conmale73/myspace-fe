import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./onlineFriendList.module.scss";
import SmallSong from "../../Song/SongSmall/SongSmall";
import { useQueries } from "@tanstack/react-query";
import { userService } from "../../../services";
import Loading from "../../Loading";
import Contact from "../../Contact";
const OnlineFriendList = () => {
    const user = useSelector((state) => state.user.data);
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchContacts() {
        const res = await userService.getFriendList(user._id, page, limit);
        setContacts(res.data.data);
        setTotalPages(res.data.totalPages);
        return res.data.data;
    }

    const { isLoading, error, data } = useQueries({
        queries: [
            {
                queryKey: ["contacts", user?._id],
                queryFn: () => fetchContacts(),
            },
        ],
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;
    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await userService.getFriendList(
                user._id,
                page + 1,
                limit
            );
            setContacts((posts) => [...posts, ...res.data.data]);
        }
    };
    return (
        <div className="onlineFriendList mt-6">
            {contacts.map((contact, index) => (
                <Contact key={index} contact={contact} />
            ))}
            {page < totalPages ? (
                <p
                    className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer my-[20px]"
                    onClick={handleClickLoadMore}
                >
                    Load more...
                </p>
            ) : (
                <></>
            )}
        </div>
    );
};
export default OnlineFriendList;
