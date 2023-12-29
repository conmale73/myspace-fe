import { axiosClient } from "~/api";

export const groupChatService = {
    getGroupChatByID(id) {
        return axiosClient.get(`/api/groupChats/id/${id}`);
    },
    getGroupChatsByUserID(id) {
        return axiosClient.get(`/api/groupChats/user/${id}`);
    },
    getAllChatsByUserID(id) {
        return axiosClient.get(`/api/groupChats/all/${id}`);
    },
    getGroupChatOfTwoUsers(data) {
        return axiosClient.post(`/api/groupChats/two/`, data);
    },
    getChatsHaveMessagesByUserID(user_id, page, limit) {
        return axiosClient.get(
            `/api/groupChats/messages/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getChatsHaveUnreadMessagesByUserID(user_id) {
        return axiosClient.get(`/api/groupChats/unread/${user_id}`);
    },
};
