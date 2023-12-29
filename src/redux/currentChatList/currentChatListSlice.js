import { createSlice } from "@reduxjs/toolkit";
const MAX_CHAT_LIST_SIZE = 5;

const currentChatListSlice = createSlice({
    name: "currentChatList",
    initialState: {
        list: [],
        currentChat: null,
    },
    reducers: {
        openChat(state, action) {
            state.currentChat = action.payload;
        },
        closeChat(state) {
            state.currentChat = null;
        },
        addChat(state, action) {
            const newChat = action.payload;
            const duplicateIndex = state.list.findIndex(
                (e) => e._id === newChat._id
            );

            if (duplicateIndex !== -1) {
                // Remove the duplicate
                state.list.splice(duplicateIndex, 1);
            }

            // Add the new chat to the beginning of the list
            state.list = [
                {
                    _id: newChat._id,
                    group_id: newChat.group_id,
                    members: newChat.members,
                    group_name: newChat.group_name,
                    group_thumbnail: newChat.group_thumbnail,
                    createAt: newChat.createAt,
                    updateAt: newChat.updateAt,
                },
                ...state.list.slice(0, MAX_CHAT_LIST_SIZE), // Keep only the first MAX_CHAT_LIST_SIZE items
            ];
        },
        removeChat(state, action) {
            const chatID = action.payload;
            state.list = state.list.filter((chat) => chat._id !== chatID);
        },
        emptyChatList(state) {
            state.list = [];
            state.currentChat = null;
        },
    },
});

export const { addChat, removeChat, openChat, closeChat, emptyChatList } =
    currentChatListSlice.actions;

export default currentChatListSlice.reducer;
