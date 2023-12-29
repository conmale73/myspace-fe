import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./song/songsSlice";
import listSongsSlice from "./listSong/listSongSlice";
import searchSlice from "./search/searchSlice";
import userSlice from "./user/userSlice";
import modeSlice from "./mode/modeSlice";
import playlistSlice from "./playlist/playlistSlice";
import editingImage from "./editingImage/editingImageSlice";
import onlineUsersSlice from "./onlineUsers/onlineUsersSlice";
import currentVoiceChannelSlice from "./currentVoiceChannel/currentVoiceChannelSlice";
import voiceChannelsSlice from "./voiceChannels/voiceChannelsSlice";
import showFooterSlice from "./showFooter/showFooterSlice";
import currentChatListSlice from "./currentChatList/currentChatListSlice";
import groupDetailSlice from "./groupDetail/groupDetailSlice";
import toastSlice from "./toast/toastSlice";
import unreadMessagesSlice from "./unreadMessages/unreadMessagesSlice";
//initializing store
export const store = configureStore({
    reducer: {
        toast: toastSlice,
        currentChatList: currentChatListSlice,
        listSongs: listSongsSlice,
        search: searchSlice,
        user: userSlice,
        playlists: playlistSlice,
        groupDetail: groupDetailSlice,
        onlineUsers: onlineUsersSlice,
        voiceChannels: voiceChannelsSlice,
        currentVoiceChannel: currentVoiceChannelSlice,
        showFooter: showFooterSlice,
        unreadMessages: unreadMessagesSlice,
        editingImage: editingImage,
        mode: modeSlice,
    },
});
