import styles from "./Singer.module.scss";
import ListComponent from "../../../components/ListComponent";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const singerList = [
    {
        id: 1,
        singerName: "Bruno Mars",
        image: "/photos/BrunoMars.jpg",
        slug: "bruno-mars",
        category: "singer",
    },
    {
        id: 2,
        singerName: "Charlie Puth",
        image: "/photos/CharliePuth.jpg",
        slug: "charlie-puth",
        category: "singer",
    },
];
const Singer = (props) => {
    const singer = singerList;
    return (
        <div className={styles.singer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Artist</h1>
                <Link to="/music/library/singer">
                    <span className={styles.seeMore}>More...</span>
                </Link>
            </div>
            <ListComponent singers={singer} isSlideSinger={true} />
        </div>
    );
};
export default Singer;
