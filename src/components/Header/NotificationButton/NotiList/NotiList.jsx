import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../../Loading";
import NotificationCard from "./NotificationCard";
import { notificationService } from "../../../../services";
const NotiList = ({ count, setCount }) => {
    const user = useSelector((state) => state.user.data);

    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const res = await notificationService.getNotificationsByUserId(
                user._id,
                page,
                limit
            );
            setNotifications(res.data.data);
            setTotalPages(res.data.totalPages);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["notifications", user._id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }

    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await notificationService.getNotificationsByUserId(
                user._id,
                page + 1,
                limit
            );
            setNotifications((notifications) => [
                ...notifications,
                ...res.data.data,
            ]);
        }
    };
    return (
        <div className="w-full h-fit min-h-[90px] max-h-[800px] overflow-y-auto p-[5px]">
            {notifications.length === 0 && (
                <div className="text-center text-lg text-gray-500 mt-4">
                    No notification found
                </div>
            )}

            {notifications?.map((notification, index) => {
                return (
                    <NotificationCard
                        key={index}
                        notification={notification}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        count={count}
                        setCount={setCount}
                    />
                );
            })}
            {page < totalPages ? (
                <p
                    className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer"
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

export default NotiList;
