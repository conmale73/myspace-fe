import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { MdOutlineKey } from "react-icons/md";

import { groupService } from "../../../services";
import Loading from "../../../components/Loading";
import UserPreview from "../../../components/UserPreview(FullDataProvided)";
import UserInfoPreview from "../../../components/UserInfoPreview";
import Divider from "../../../components/Divider";
import OptionButton from "./OptionButton";
const Members = ({ group_id, memberList, admins, creator_id, role }) => {
    const user = useSelector((state) => state.user.data);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [members, setMembers] = useState([]);
    const searchMembers = async () => {
        const res = await groupService.searchMembersOfGroupByName(
            group_id,
            searchQuery
        );
        setMembers(res.data.data);
        return res.data.data;
    };
    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        setIsSearching(true);
        try {
            searchMembers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-[10px] max-w-[1000px] h-fit min-h-[500px] rounded-[20px] bg-[#303030] p-[10px]">
            <p className="text-[20px] text-[#e4e6eb] font-[700]">Members</p>
            <p className="text-[16px] text-[#adadad] font-[500]">
                Members of group will appear here
            </p>

            {/*Members search bar*/}
            <div className="w-full h-[40px] ">
                <input
                    className="w-full h-full bg-transparent rounded-[20px] p-[10px]
                 text-[#e4e6eb] text-[16px] border-[1px] border-[#e0d9d9]"
                    type="text"
                    placeholder="Find a member..."
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e)}
                />
            </div>
            {isSearching && searchQuery != "" ? (
                <div className="w-full pt-[10px] pb-[10px] rounded-[5px]">
                    <p>Search results</p>
                    <div className="flex flex-wrap w-full justify-between my-[10px] px-[10px] gap-[20px]">
                        {members.map((member, index) => {
                            if (admins.includes(member._id)) {
                                return (
                                    <div
                                        className="flex w-[45%] p-[5px] hover:bg-[#404040] border-[1px] border-solid border-[#ababab] rounded-[20px] relative"
                                        key={index}
                                    >
                                        <div className="flex-1">
                                            <UserPreview
                                                key={member._id}
                                                thumbnailHeight="50px"
                                                thumbnailWidth="50px"
                                                userData={member}
                                                link={true}
                                                showName={true}
                                                bgStyles={false}
                                            />
                                        </div>
                                        <p
                                            className="absolute top-[-10px] left-[-5px]"
                                            title="Admin"
                                        >
                                            <MdOutlineKey size="20px" />
                                        </p>
                                        {role > 0 && (
                                            <OptionButton
                                                role={role}
                                                creator_id={creator_id}
                                                user_id={member_id}
                                                admins={admins}
                                            />
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className="w-[45%] p-[5px] hover:bg-[#404040] rounded-[20px]"
                                        key={index}
                                    >
                                        <div className="flex-1">
                                            <UserPreview
                                                key={member._id}
                                                thumbnailHeight="50px"
                                                thumbnailWidth="50px"
                                                userData={member}
                                                link={true}
                                                showName={true}
                                                bgStyles={false}
                                            />
                                        </div>
                                        {role > 0 && (
                                            <OptionButton
                                                role={role}
                                                creator_id={creator_id}
                                                user_id={member._id}
                                                admins={admins}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            ) : (
                <div className="w-full mb-[10px] rounded-[5px]">
                    <div className="flex flex-wrap w-full justify-between mb-[20px] mt-[20px] px-[10px] gap-[20px]">
                        {memberList.map((member, index) => {
                            if (admins.includes(member)) {
                                return (
                                    <div
                                        className="flex w-[45%] p-[5px] hover:bg-[#404040] border-[1px] border-solid border-[#ababab] rounded-[20px] relative"
                                        key={index}
                                    >
                                        <div className="flex-1">
                                            <UserInfoPreview
                                                key={member}
                                                thumbnailHeight="50px"
                                                thumbnailWidth="50px"
                                                user_id={member}
                                                link={true}
                                                showName={true}
                                                bgStyles={false}
                                            />
                                        </div>

                                        <p
                                            className="absolute top-[-10px] left-[-5px]"
                                            title="Admin"
                                        >
                                            <MdOutlineKey size="20px" />
                                        </p>
                                        {role > 0 && (
                                            <OptionButton
                                                role={role}
                                                creator_id={creator_id}
                                                user_id={member}
                                                admins={admins}
                                            />
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className="flex w-[45%] p-[5px] hover:bg-[#404040] rounded-[20px]"
                                        key={index}
                                    >
                                        <div className="flex-1">
                                            <UserInfoPreview
                                                key={member}
                                                thumbnailHeight="50px"
                                                thumbnailWidth="50px"
                                                user_id={member}
                                                link={true}
                                                showName={true}
                                                bgStyles={false}
                                            />
                                        </div>
                                        {role > 0 && (
                                            <OptionButton
                                                role={role}
                                                creator_id={creator_id}
                                                user_id={member}
                                                admins={admins}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <Divider />
                    <div className="w-full flex flex-col gap-[10px]">
                        <p className="text-[20px] text-[#e4e6eb] font-[700]">
                            Group Admins
                        </p>
                        <div className="flex flex-wrap w-full justify-between mb-[20px] px-[10px] gap-[20px]">
                            {admins.map((admin, index) => (
                                <div
                                    className="flex w-[45%] p-[5px] hover:bg-[#404040] border-[1px] border-solid border-[#ababab] rounded-[20px] relative"
                                    key={index}
                                >
                                    <div className="flex-1">
                                        <UserInfoPreview
                                            key={admin}
                                            thumbnailHeight="50px"
                                            thumbnailWidth="50px"
                                            user_id={admin}
                                            link={true}
                                            showName={true}
                                            bgStyles={false}
                                        />
                                    </div>
                                    <p
                                        className="absolute top-[-10px] left-[-5px]"
                                        title="Admin"
                                    >
                                        <MdOutlineKey size="20px" />
                                    </p>
                                    {role > 0 && (
                                        <OptionButton
                                            role={role}
                                            creator_id={creator_id}
                                            user_id={admin}
                                            admins={admins}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Members;
