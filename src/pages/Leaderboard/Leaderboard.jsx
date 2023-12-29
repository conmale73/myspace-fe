import styles from "./Leaderboard.module.scss";
import Divider from "../../components/Divider/Divider";
import { BsPlayCircleFill } from "react-icons/bs";
import Table from "./Table";
import Select from "react-select";
import { useState, useEffect } from "react";

const Leaderboard = (props) => {
    document.title = props.title;
    const [songs, setSongs] = useState([]);

    return (
        <div className={styles.leaderboard}>
            <h1
                style={{
                    fontWeight: "700",
                    fontSize: "25px",
                }}
            >
                Top Music
                <span className={styles.button}>
                    <BsPlayCircleFill size="27px" />
                </span>
            </h1>
            <Divider />
            <Table />
        </div>
    );
};
export default Leaderboard;
