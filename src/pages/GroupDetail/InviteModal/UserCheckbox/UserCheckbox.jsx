import { useState, useEffect } from "react";

import UserPreview from "../../../../components/UserPreview(FullDataProvided)/UserPreview";
const UserCheckbox = ({ userData, checkedList, setCheckedList }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checkedList.some((user) => user._id === userData._id)) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [checkedList]);
    const handleClickCheckbox = (e) => {
        setChecked(!checked);
        if (!checked) {
            setCheckedList((checkedList) => [
                ...checkedList,
                {
                    _id: userData._id,
                    username: userData.username,
                    avatar: userData.avatar,
                },
            ]);
        } else {
            setCheckedList((checkedList) =>
                checkedList.filter((user) => user._id !== userData._id)
            );
        }
    };
    return (
        <div
            className="w-full h-fit flex gap-[10px] hover:bg-[#545454] items-center rounded-[10px] cursor-pointer"
            onClick={() => handleClickCheckbox()}
        >
            <div className="flex-1">
                <UserPreview
                    key={userData._id}
                    thumbnailHeight="50px"
                    thumbnailWidth="50px"
                    userData={userData}
                    link={false}
                    showName={true}
                    bgStyles={true}
                />
            </div>
            <div className="w-[40px] h-[40px] flex items-center justify-center">
                <input
                    className="w-[20px] h-[20px]"
                    type="checkbox"
                    checked={checked}
                    value={userData._id}
                    onChange={(e) => handleClickCheckbox(e)}
                />
            </div>
        </div>
    );
};

export default UserCheckbox;
