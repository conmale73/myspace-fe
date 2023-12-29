import { axiosClient } from "~/api";

export const groupService = {
    createGroup(data) {
        return axiosClient.post(`/api/groups/`, data);
    },
    getAllPublicGroups() {
        return axiosClient.get(`/api/groups/public/`);
    },
    getAdminsInfo(group_id) {
        return axiosClient.get(`/api/groups/admins/${group_id}/`);
    },
    getRecommendGroups(user_id) {
        return axiosClient.get(`/api/groups/recommend/${user_id}/`);
    },
    getGroupsByUserId(user_id, page, limit) {
        return axiosClient.get(
            `/api/groups/user/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getGroupById(group_id, user_id) {
        return axiosClient.get(`/api/groups/${group_id}`, { user_id });
    },
    getGroupSearchRecommendation(group_name) {
        return axiosClient.get(
            `/api/groups/searchRecommendation/${group_name}`
        );
    },
    searchGroupsByName(group_name) {
        return axiosClient.get(`/api/groups/search/${group_name}`);
    },
    searchMembersOfGroupByName(group_id, username) {
        return axiosClient.get(
            `/api/groups/${group_id}/search-members/${username}`
        );
    },
    setUserAsAdmin(group_id, data) {
        return axiosClient.put(`/api/groups/set-admin/${group_id}/`, data);
    },
    removeUserAsAdmin(group_id, data) {
        return axiosClient.put(`/api/groups/remove-admin/${group_id}/`, data);
    },
    removeUserFromGroup(group_id, data) {
        return axiosClient.put(`/api/groups/remove-user/${group_id}/`, data);
    },
    inviteFriendToGroup(group_id, data) {
        return axiosClient.put(`/api/groups/invite-user/${group_id}/`, data);
    },
    acceptInvitationToGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/accept-invitation/${group_id}/`,
            data
        );
    },
    declineInvitationToGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/decline-invitation/${group_id}/`,
            data
        );
    },
    joinGroup(group_id, data) {
        return axiosClient.put(`/api/groups/join/${group_id}/`, data);
    },
    requestJoinGroup(group_id, data) {
        return axiosClient.put(`/api/groups/request-join/${group_id}/`, data);
    },
    cancelRequestJoinGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/cancel-request-join/${group_id}/`,
            data
        );
    },
    getPendingRequests(group_id, data, page, limit) {
        return axiosClient.put(
            `/api/groups/pending-requests/${group_id}?page=${page}&limit=${limit}`,
            data
        );
    },
    acceptRequestJoinGroup(group_id, data) {
        return axiosClient.put(`/api/groups/accept-request/${group_id}/`, data);
    },
    declineRequestJoinGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/decline-request/${group_id}/`,
            data
        );
    },
    leaveGroup(group_id, data) {
        return axiosClient.put(`/api/groups/leave/${group_id}/`, data);
    },
    getGroupByCreatorId(id) {
        return axiosClient.get(`/api/groups/?creator_id=${id}`);
    },
};
