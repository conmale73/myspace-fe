import { axiosClient } from "~/api";

export const userService = {
    getAllUsers() {
        return axiosClient.get("/api/users/");
    },
    getUserById(id) {
        return axiosClient.get(`/api/users/${id}`);
    },
    getUserByEmail(email) {
        return axiosClient.get(`/api/users/email/${email}`);
    },
    updateUserPassword(data) {
        return axiosClient.put(`/api/users/updatePassword`, data);
    },
    updateUserInfo(data) {
        return axiosClient.put(`/api/users/updateInfo`, data);
    },
    updateUserAvatar(data) {
        return axiosClient.put(`/api/users/updateAvatar`, data);
    },
    updateUserBackground(data) {
        return axiosClient.put(`/api/users/updateBackground`, data);
    },
    addFriend(data) {
        return axiosClient.post(`/api/users/addFriend`, data);
    },
    acceptFriendRequest(data) {
        return axiosClient.post(`/api/users/acceptFriendRequest`, data);
    },
    declineFriendRequest(data) {
        return axiosClient.post(`/api/users/declineFriendRequest`, data);
    },
    cancelFriendRequest(data) {
        return axiosClient.post(`/api/users/cancelFriendRequest`, data);
    },
    removeFriend(data) {
        return axiosClient.post(`/api/users/removeFriend`, data);
    },
    getFriendRequests(user_id, page, limit) {
        return axiosClient.get(
            `/api/users/friendRequests/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getFriendList(user_id, page, limit) {
        return axiosClient.get(
            `/api/users/friendList/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getMutualFriends(friend_id, user_id, page, limit) {
        return axiosClient.get(
            `/api/users/mutualFriends/${friend_id}/${user_id}/?page=${page}&limit=${limit}`
        );
    },
    searchUserByUsername(username, page, limit) {
        return axiosClient.get(
            `/api/users/search/${username}?page=${page}&limit=${limit}`
        );
    },
    searchFriendsByUsername(username, user_id, page, limit) {
        return axiosClient.get(
            `/api/users/searchFriends/${user_id}/${username}?page=${page}&limit=${limit}`
        );
    },
};
