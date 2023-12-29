import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { FaRegCommentAlt, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { userService, groupService } from "../../../services";
import Loading from "../../../components/Loading";
import UserPreview from "../../../components/UserPreview(FullDataProvided)";
import UserCheckbox from "./UserCheckbox/UserCheckbox";

const InviteModal = ({ open, setOpen, memberList }) => {
    const user = useSelector((state) => state.user.data);
    const group = useSelector((state) => state.groupDetail.data);

    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searchLimit, setSearchLimit] = useState(10);
    const [searchTotalPages, setSearchTotalPages] = useState(1);

    const [checkedList, setCheckedList] = useState([]);

    const fetchData = async () => {
        const res = await userService.getFriendList(user._id, page, limit);
        const filtered = res.data.data.filter(
            (item) => !memberList.includes(item._id)
        );
        setFriends(filtered);
        setTotalPages(res.data.totalPages);
        return res.data;
    };

    const searchFriends = async () => {
        const res = await userService.searchFriendsByUsername(
            searchQuery,
            user._id,
            searchPage,
            searchLimit
        );
        const filtered = res.data.data.filter(
            (item) => !memberList.includes(item._id)
        );
        setSearchResults(filtered);
        setSearchTotalPages(res.data.totalPages);
        return res.data;
    };

    const inviteFriend = async (friend_id) => {
        const data = {
            user_id: user._id,
            friend_id: friend_id,
        };
        const res = await groupService.inviteFriendToGroup(group._id, data);
        return res.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["inviteFriends", user._id],
        queryFn: fetchData,
    });

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleStateModal = () => {
        setOpen(!open);
    };

    const handleClickInvite = () => {
        checkedList.forEach((friend) => {
            try {
                inviteFriend(friend._id);
                setCheckedList([]);
                setOpen(false);
            } catch (error) {
                console.log(error);
            }
        });
    };

    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        setIsSearching(true);
        try {
            searchFriends();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickLoadMoreFriends = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await userService.getFriendList(
                user._id,
                page + 1,
                limit
            );
            setFriends((friends) => [...friends, ...res.data.data]);
        }
    };

    const handleClickLoadMoreSearchResults = async () => {
        if (searchPage < searchTotalPages) {
            setSearchPage((searchPage) => searchPage + 1);
            const res = await userService.searchFriendsByUsername(
                searchQuery,
                user._id,
                searchPage + 1,
                searchLimit
            );
            setSearchResults((searchResults) => [
                ...searchResults,
                ...res.data.data,
            ]);
        }
    };

    const handleRemoveFromList = (item) => {
        setCheckedList((checkedList) =>
            checkedList.filter((user) => user._id !== item._id)
        );
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => handleStateModal(e)}>
            <Dialog.Trigger asChild>
                <span
                    className="flex items-center justify-center gap-2 p-[7px] rounded-[10px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] w-fit h-[40px]"
                    onClick={() => handleClickInvite()}
                >
                    <FaPlus size="18px" />
                    <div className="text-[18px] font-bold">Invite</div>
                </span>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className={`w-full max-w-[1050px] flex data-[state=open]:animate-contentShow fixed top-[50%] 
            left-[50%] h-fit translate-x-[-50%] translate-y-[-50%] overflow-x-hidden
            rounded-[6px] bg-neutral-800 p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
                >
                    <div className="flex flex-col gap-2 w-full h-[600px] max-h-[800px] relative">
                        <div
                            style={{
                                display: "flex",
                                borderBottom: "1px solid #4d4d4d",
                                paddingBottom: "10px",
                            }}
                        >
                            <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                Invite friends to this group
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] ">
                                    <AiOutlineClose
                                        size="25px"
                                        color="#9d9d9d"
                                    />
                                </button>
                            </Dialog.Close>
                        </div>
                        <div className="w-full">
                            <div className="w-full h-[40px] mb-[10px]">
                                <input
                                    className="w-full h-full bg-transparent rounded-[20px] p-[10px]
                 text-[#e4e6eb] text-[16px] border-[1px] border-[#e0d9d9]"
                                    type="text"
                                    placeholder="Search for friends..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearchInput(e)}
                                />
                            </div>
                            <div className="w-full h-[450px] flex">
                                {/*Friends list*/}
                                <div className="w-[60%] h-full overflow-auto">
                                    {isSearching && searchQuery != "" ? (
                                        <div className="w-full pt-[10px] pb-[10px] rounded-[5px]">
                                            <p className="text-[20px] font-[600]">
                                                Search results
                                            </p>
                                            <div className="flex flex-col w-full justify-start gap-[20px] my-[10px]">
                                                {searchResults.map(
                                                    (friend, index) => {
                                                        return (
                                                            <div
                                                                className="w-full"
                                                                key={friend._id}
                                                            >
                                                                <UserCheckbox
                                                                    userData={
                                                                        friend
                                                                    }
                                                                    checkedList={
                                                                        checkedList
                                                                    }
                                                                    setCheckedList={
                                                                        setCheckedList
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                {searchPage <
                                                searchTotalPages ? (
                                                    <p
                                                        className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer my-[20px]"
                                                        onClick={
                                                            handleClickLoadMoreSearchResults
                                                        }
                                                    >
                                                        Load more...
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full pt-[10px] pb-[10px] rounded-[5px]">
                                            <p className="text-[20px] font-[600]">
                                                Friends
                                            </p>
                                            <div className="flex flex-col w-full justify-start gap-[20px] my-[10px]">
                                                {friends.map(
                                                    (friend, index) => {
                                                        return (
                                                            <div
                                                                className="w-full"
                                                                key={friend._id}
                                                            >
                                                                <UserCheckbox
                                                                    userData={
                                                                        friend
                                                                    }
                                                                    checkedList={
                                                                        checkedList
                                                                    }
                                                                    setCheckedList={
                                                                        setCheckedList
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                {page < totalPages ? (
                                                    <p
                                                        className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer my-[20px]"
                                                        onClick={
                                                            handleClickLoadMoreFriends
                                                        }
                                                    >
                                                        Load more...
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-[40%] bg-[#18191a] h-full p-[10px] overflow-auto">
                                    {checkedList.length > 0 ? (
                                        <div className="flex flex-col gap-[5px]">
                                            <p className="text-[#adadad] text-[14px] font-[500]">{`${checkedList.length} friends selected`}</p>
                                            {checkedList.map((item, index) => {
                                                return (
                                                    <div
                                                        className="w-full h-[50px] flex items-center gap-[10px]"
                                                        key={index}
                                                    >
                                                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                                            <img
                                                                loading="lazy"
                                                                className={`w-full h-full object-contain rounded-full`}
                                                                src={`data:${item.avatar.files[0].fileInfo.type};base64,${item.avatar.files[0].dataURL}`}
                                                            />
                                                        </div>
                                                        <div className="flex-1 text-[#e4e6eb] text-[16px] text-ellipsis">
                                                            {item.username}
                                                        </div>
                                                        <div
                                                            className="w-[30px] h-[30px] p-[3px] hover:bg-[#303030] cursor-pointer rounded-full"
                                                            onClick={() =>
                                                                handleRemoveFromList(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineClose className="w-full h-full" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-[#adadad] text-[20px]">
                                                No friends selected
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[60px] flex justify-end gap-[10px] mt-[10px]">
                            <div
                                className="w-[100px] h-[40px] rounded-[5px] bg-[#353535] hover:bg-[#505050] cursor-pointer flex items-center justify-center"
                                onClick={() => handleStateModal()}
                            >
                                Cancel
                            </div>
                            {checkedList.length > 0 ? (
                                <div
                                    className="w-[100px] h-[40px] rounded-[5px] bg-[#505050] hover:bg-[#606060] cursor-pointer flex items-center justify-center"
                                    onClick={() => handleClickInvite()}
                                >
                                    Invite
                                </div>
                            ) : (
                                <div className="w-[100px] h-[40px] rounded-[5px] bg-[#505050] hover:bg-[#606060] cursor-not-allowed flex items-center justify-center opacity-60">
                                    Invite
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default InviteModal;
