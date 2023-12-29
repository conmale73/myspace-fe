import styles from "./GroupCard.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageViewer from "../../ImageViewer";
const GroupCard = ({ group }) => {
    const user = useSelector((state) => state.user.data);
    return (
        <div className={styles.groupCard}>
            <div className={styles.content}>
                <div className={styles.thumbnail}>
                    <ImageViewer
                        image={group?.thumbnail.files[0]}
                        objectFit="cover"
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <Link to={`/social/groups/${group._id}`}>
                            {group.name}
                        </Link>
                    </div>
                    <div className={styles.privacy}>
                        {group.privacy === "PUBLIC" ? "Public" : "Private"}
                        <span className={styles.dot}>•</span>
                        {group.members.length} members
                    </div>
                    <p className={styles.description}>{group.description}</p>
                </div>
                <div className={styles.actions}>
                    {group.members.includes(user?._id) ? (
                        <Link
                            to={`/social/groups/${group._id}`}
                            className={styles.visitButton}
                        >
                            Visit
                        </Link>
                    ) : (
                        <Link
                            to={`/social/groups/${group._id}`}
                            className={styles.joinButton}
                        >
                            Join
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupCard;
