import { axiosClient } from "~/api";

export const postService = {
    getPostById(post_id, data) {
        return axiosClient.put(`/api/posts/${post_id}`, data);
    },
    getPostsByUserId(user_id, data, page, limit) {
        return axiosClient.put(
            `/api/posts/user/${user_id}?page=${page}&limit=${limit}`,
            data
        );
    },
    getPostsByGroupId(group_id, page, limit, sortBy) {
        return axiosClient.get(
            `/api/posts/group/${group_id}?page=${page}&limit=${limit}&sortBy=${sortBy}`
        );
    },
    getPublicPostByUserId(id, page, limit) {
        return axiosClient.get(
            `/api/posts/public/${id}?page=${page}&limit=${limit}`
        );
    },
    getHome(id, page, limit) {
        return axiosClient.get(
            `/api/posts/home/${id}?page=${page}&limit=${limit}`
        );
    },
    getNewsFeed(id, page, limit) {
        return axiosClient.get(
            `/api/posts/newsfeed/${id}?page=${page}&limit=${limit}`
        );
    },
    createNewPost(data) {
        return axiosClient.post(`/api/posts/`, data);
    },
    likePost(post_id, user_id) {
        return axiosClient.post(`/api/posts/like/${post_id}`, { user_id });
    },
    unlikePost(post_id, user_id) {
        return axiosClient.patch(`/api/posts/unlike/${post_id}`, { user_id });
    },
    readPost(post_id, data) {
        return axiosClient.post(`/api/posts/read/${post_id}`, data);
    },
    updatePost(data) {
        return axiosClient.put(`/api/posts/`, data);
    },
    deletePost(id, user_id) {
        return axiosClient.delete(`/api/posts/${id}/${user_id}`);
    },
};
