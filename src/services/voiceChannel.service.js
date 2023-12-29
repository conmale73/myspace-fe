import { axiosClient } from "~/api";

export const voiceChannelService = {
    createVoiceChannel(name, room_id) {
        return axiosClient.post(`/api/voiceChannels`, { name, room_id });
    },
    getVoiceChannelByID(id) {
        return axiosClient.get(`/api/voiceChannels/id/${id}`);
    },
    getRoomVoiceChannels(room_id) {
        return axiosClient.get(`/api/voiceChannels/room_id/${room_id}`);
    },
    joinVoiceChannel(id, user_id) {
        return axiosClient.post(`/api/voiceChannels/join/${id}`, { user_id });
    },
    leaveVoiceChannel(id, user_id) {
        return axiosClient.post(`/api/voiceChannels/leave/${id}`, { user_id });
    },
    leaveAllVoiceChannel(user_id) {
        return axiosClient.put(`/api/voiceChannels/leaveAll/`, { user_id });
    },
};
