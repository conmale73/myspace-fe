import { axiosClient } from "~/api";

export const messageService = {
    getMessagesByChatID(chat_id, page, limit) {
        return axiosClient.get(
            `/api/messages/chat/${chat_id}?page=${page}&limit=${limit}`
        );
    },
    createMessage(chat_id, sender_id, sender_name, content) {
        return axiosClient.post("/api/messages/", {
            chat_id,
            sender_id,
            sender_name,
            content,
        });
    },
    getLastMessage(chat_id) {
        return axiosClient.get(`/api/messages/last/${chat_id}`);
    },
    getUnreadMessages(chat_id, user_id) {
        return axiosClient.get(`/api/messages/unread/${chat_id}/${user_id}`);
    },
    readAllMessages(chat_id, data) {
        return axiosClient.put(`/api/messages/readAll/${chat_id}`, data);
    },
    countUnreadMessages(user_id) {
        return axiosClient.get(`/api/messages/countUnread/${user_id}`);
    },
};
