import { axiosClient } from "~/api";

export const notificationService = {
    getNotificationsByUserId(user_id, page, limit) {
        return axiosClient.get(
            `/api/notifications/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getUnreadNotificationsByUserId(user_id) {
        return axiosClient.get(`/api/notifications/unread/${user_id}`);
    },
    countUnreadNotifications(user_id) {
        return axiosClient.get(`/api/notifications/unread/count/${user_id}`);
    },
    markAsRead(notification_id) {
        return axiosClient.put(
            `/api/notifications/markAsRead/${notification_id}`
        );
    },
    markAllAsRead(user_id) {
        return axiosClient.put(`/api/notifications/markAllAsRead/${user_id}`);
    },
    deleteNotification(notification_id) {
        return axiosClient.delete(`/api/notifications/${notification_id}`);
    },
};
