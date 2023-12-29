import UserInfoPreview from "../UserInfoPreview";
import { useDispatch, useSelector } from "react-redux";
import {
    addChat,
    openChat,
} from "../../redux/currentChatList/currentChatListSlice";
import { groupChatService } from "../../services";
import UserPreview from "../UserPreview(FullDataProvided)/UserPreview";
const Contact = ({ contact }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const handleClickContact = async () => {
        const members = [user._id, contact._id];

        try {
            const dataPost = {
                members: members,
            };
            const res = await groupChatService.getGroupChatOfTwoUsers(dataPost);
            dispatch(addChat(res.data));
            dispatch(openChat(res.data));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            key={contact._id}
            className="w-full h-fit cursor-pointer"
            onClick={handleClickContact}
        >
            <UserPreview
                thumbnailHeight="40px"
                thumbnailWidth="40px"
                bgStyles={true}
                userData={contact}
                displayOnlineStatus={true}
                key={contact._id}
                link={false}
                showName={true}
            />
        </div>
    );
};

export default Contact;
