import PendingRequests from "./PendingRequests/PendingRequests";

const GroupModeration = ({ group_id }) => {
    return (
        <div className="w-full flex flex-col gap-[10px] max-w-[1000px] h-fit min-h-[500px] rounded-[20px] bg-[#303030] p-[10px]">
            <p className="text-[20px] text-[#e4e6eb] font-[700]">
                Pending Requests
            </p>
            <PendingRequests group_id={group_id} />
        </div>
    );
};

export default GroupModeration;
