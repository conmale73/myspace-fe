import { axiosClient } from "~/api";

export const roomService = {
    createRoom(data) {
        return axiosClient.post(`/api/rooms/`, data);
    },
    getAllPublicRooms() {
        return axiosClient.get(`/api/rooms/public/`);
    },
    getAllRooms(user_id) {
        return axiosClient.get(`/api/rooms/`, user_id);
    },
    joinRoom(room_id, user_id) {
        return axiosClient.put(`/api/rooms/join/${room_id}/`, { user_id });
    },
    quitRoom(room_id, user_id) {
        return axiosClient.patch(`/api/rooms/quit/${room_id}/`, { user_id });
    },
    getRoomByCreatorId(id) {
        return axiosClient.get(`/api/rooms/?creator_id=${id}`);
    },
    getRoomById(id) {
        return axiosClient.get(`/api/rooms/${id}`);
    },
};
