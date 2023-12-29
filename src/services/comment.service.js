import { axiosClient } from "~/api";

export const commentService = {
    getCommentById(id) {
        return axiosClient.get(`/api/comments/${id}`);
    },
    getCommentsByPostId(post_id, page, limit, sortBy) {
        return axiosClient.get(
            `/api/comments/post/${post_id}?page=${page}&limit=${limit}&sortBy=${sortBy}`
        );
    },
    getRepliesByCommentId(comment_id, page, limit) {
        return axiosClient.get(
            `/api/comments/replies/${comment_id}?page=${page}&limit=${limit}`
        );
    },
    createNewcomment(data) {
        return axiosClient.post(`/api/comments/`, data);
    },
    likeComment(comment_id, user_id) {
        return axiosClient.post(`/api/comments/like/${comment_id}`, {
            user_id,
        });
    },
    unlikeComment(comment_id, user_id) {
        return axiosClient.patch(`/api/comments/unlike/${comment_id}`, {
            user_id,
        });
    },
    updateComment(data) {
        return axiosClient.put(`/api/comments/`, data);
    },
    deleteComment(comment_id) {
        return axiosClient.delete(`/api/comments/${comment_id}`);
    },
};
