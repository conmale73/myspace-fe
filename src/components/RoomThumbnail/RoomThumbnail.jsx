import styles from "./RoomThumbnail.module.scss";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { userService } from "../../services";
import { Link, useNavigate } from "react-router-dom";
import UserInfoPreview from "../UserInfoPreview";
import ImageViewer from "../ImageViewer";

const RoomThumbnail = (props) => {
    const user = useSelector((state) => state.user.data);
    const navigator = useNavigate();
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["roomThumbnail"],
        queryFn: () =>
            userService
                .getUserById(props.data.creator_id)
                .then((res) => res.data.data),
    });
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const handleClickView = () => {
        navigator("/room/" + props.data._id);
    };
    return (
        <>
            <div className={`${styles.roomThumbnail} flex`}>
                <div className={` ${styles.thumbnail}`}>
                    <ImageViewer
                        image={props.data.thumbnail?.files[0]}
                        objectFit="cover"
                    />
                </div>
                <div className={`${styles.roomInfo}`}>
                    <div className={`${styles.roomName} text-[15px]`}>
                        {props.data.name}
                    </div>
                    <div className={styles.roomCreator}>
                        Creator:
                        <UserInfoPreview
                            thumbnailHeight="40px"
                            thumbnailWidth="40px"
                            showName={true}
                            user_id={props.data.creator_id}
                            bgStyles={false}
                            link={true}
                            displayOnlineStatus={false}
                        />
                    </div>
                    <div className={styles.roomDescription}>
                        {`Description: ${props.data.description}`}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.viewButton}
                        onClick={handleClickView}
                    >
                        View
                    </button>
                </div>
            </div>
        </>
    );
};

export default RoomThumbnail;
