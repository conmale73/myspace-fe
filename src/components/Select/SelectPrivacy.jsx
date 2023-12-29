import React, { useState } from "react";

import * as Select from "@radix-ui/react-select";
import { AiOutlineCheck, AiFillLock } from "react-icons/ai";
import {
    BsChevronDown,
    BsChevronUp,
    BsGlobeAsiaAustralia,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className="text-[13px] leading-none hover:bg-[#555555]
                rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative 
                select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none 
                data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <AiOutlineCheck size="15px" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);
const SelectPrivacy = ({ value, setValue, listValue }) => {
    return (
        <Select.Root value={value} onValueChange={(e) => setValue(e)}>
            <Select.Trigger
                className="inline-flex items-center justify-center bg-[#3A3B3C]
                            rounded px-[15px] text-[13px] leading-none h-[30px] gap-[5px] 
                            text-violet11 shadow-[0_2px_10px] shadow-white/10 
                            hover:bg-[#606060] focus:shadow-[0_0_0_2px] focus:shadow-white data-[placeholder]:text-violet9 outline-none"
                aria-label="Privacy"
            >
                <Select.Value placeholder="Select privacy for your post..." />
                <Select.Icon className="text-violet11">
                    <BsChevronDown size="15px" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="overflow-hidden rounded-md 
shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] bg-[#3A3B3C]"
                >
                    <Select.ScrollUpButton className="flex items-center justify-center h-[25px] text-violet11 cursor-default">
                        <BsChevronUp size="15px" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px]">
                        <Select.Group>
                            {listValue.includes("PUBLIC") && (
                                <SelectItem value="PUBLIC">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <BsGlobeAsiaAustralia size="15px" />
                                        Public
                                    </div>
                                </SelectItem>
                            )}
                            {listValue.includes("FRIEND") && (
                                <SelectItem value="FRIEND">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <FaUserFriends size="15px" />
                                        Friends
                                    </div>
                                </SelectItem>
                            )}
                            {listValue.includes("PRIVATE") && (
                                <SelectItem value="PRIVATE">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <AiFillLock size="15px" />
                                        Private
                                    </div>
                                </SelectItem>
                            )}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton
                        className="flex items-center justify-center h-[25px] 
                                                         text-violet11 cursor-default"
                    >
                        <BsChevronDown size="15px" />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default SelectPrivacy;
