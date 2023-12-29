import { useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { FaLock, FaEye, FaEyeSlash, FaClock } from "react-icons/fa";

import Divider from "../../../components/Divider";
import { groupService } from "../../../services";
import UserPreview from "../../../components/UserPreview(FullDataProvided)/UserPreview";
const About = ({ group_data }) => {
    const [admins, setAdmins] = useState([]);
    const fetchData = async () => {
        const res = await groupService.getAdminsInfo(group_data?._id);
        setAdmins(res.data.data);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupAdmins", group_data?._id],
        queryFn: () => fetchData(),
    });

    return (
        <div className="flex flex-col gap-[20px] w-full">
            <div className="w-full flex flex-col gap-[10px] max-w-[1000px] h-fit rounded-[20px] bg-[#303030] p-[10px]">
                <div className="w-full px-[20px]">
                    <div className="w-full pt-[5px] pb-[5px] font-bold text-[20px]">
                        About this group
                    </div>
                    <Divider />
                    <div className="w-full flex flex-col">
                        {group_data.description != "" && (
                            <div className="w-full h-[40px] flex items-center">
                                <p className="text-[#e4e6eb]">
                                    {group_data.description}
                                </p>
                            </div>
                        )}

                        <div className="w-full flex flex-col gap-[10px] justify-center">
                            <div className="flex gap-[10px] items-center">
                                <FaLock size="20px" color="#e4e6eb" />
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-[18px] font-bold text-[#e4e6eb]">
                                        Private group
                                    </p>
                                    <p className="text-[15px] text-[#e4e6eb]">
                                        Only members can see who's in the group
                                        and what they post.
                                    </p>
                                </div>
                            </div>
                            {group_data.visible == true ? (
                                <div className="flex gap-[10px] items-center">
                                    <FaEye size="20px" color="#e4e6eb" />
                                    <div className="flex flex-col gap-[5px]">
                                        <p className="text-[18px] font-bold text-[#e4e6eb]">
                                            Visible
                                        </p>
                                        <p className="text-[15px] text-[#e4e6eb]">
                                            Anyone can find this group.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-[10px] items-center">
                                    <FaEyeSlash size="20px" color="#e4e6eb" />
                                    <div className="flex flex-col gap-[5px]">
                                        <p className="text-[18px] font-bold text-[#e4e6eb]">
                                            Visible
                                        </p>
                                        <p className="text-[15px] text-[#e4e6eb]">
                                            Only members can find this group.
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-[10px] items-center">
                                <FaClock size="20px" color="#e4e6eb" />
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-[18px] font-bold text-[#e4e6eb]">
                                        History
                                    </p>
                                    <p className="text-[15px] text-[#e4e6eb]">
                                        Group create on{" "}
                                        {moment(group_data.created_at).format(
                                            "LL"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-[10px] max-w-[1000px] h-fit rounded-[20px] bg-[#303030] p-[10px]">
                <div className="w-full px-[20px]">
                    <div className="flex gap-[5px] items-center">
                        <div className="pt-[5px] pb-[5px] font-bold text-[20px]">
                            Members
                        </div>
                        <span>•</span>
                        <p className="text-[#e4e6eb]">
                            {group_data.members.length}
                        </p>
                    </div>
                    <Divider />
                    <div className="my-[5px] flex">
                        {admins?.map((admin, index) => {
                            if (index < 10) {
                                return (
                                    <UserPreview
                                        thumbnailWidth="30px"
                                        thumbnailHeight="30px"
                                        key={index}
                                        userData={admin}
                                        showName={false}
                                        displayOnlineStatus={false}
                                    />
                                );
                            } else {
                                return (
                                    <div className="flex justify-center items-center">
                                        <p className="text-[#e4e6eb]">
                                            and {admins.length - 10} more
                                        </p>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="mt-[10px]">
                        {admins.length == 1 && (
                            <div className="">
                                {`${admins[0]?.username} is admin of this group`}
                            </div>
                        )}
                        {admins.length == 2 && (
                            <div className="">
                                {`${admins[0]?.username} and ${admins[1]?.username} are admins of this group`}
                            </div>
                        )}
                        {admins.length == 3 && (
                            <div className="">
                                {`${admins[0]?.username}, ${admins[1]?.username} and ${admins[2]?.username} are admins of this group`}
                            </div>
                        )}
                        {admins.length > 3 && (
                            <div className="">
                                {`${admins[0]?.username}, ${
                                    admins[1]?.username
                                }, ${admins[2]?.username} and ${
                                    admins.length - 3
                                } more... are admins of this group`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
