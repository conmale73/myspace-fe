import React from "react";
import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { recommendationService } from "../../services/recommendation.service";
import HomeModules from "./HomeModules";
import Loading from "../../components/Loading";
import { useQuery, useMutation } from "@tanstack/react-query";

const Home = (props) => {
    document.title = props.title;

    const homeQuery = useQuery({
        queryKey: ["home"],
        queryFn: () =>
            recommendationService.getHome("VN", "en").then((res) => res.data), // Return the data directly
    });
    if (homeQuery.isLoading) return <Loading isFullScreen={true} />;

    if (homeQuery.isError) return <p>{homeQuery.error.message}</p>;

    return (
        <div className={styles.home}>
            <HomeModules data={homeQuery.data} />
        </div>
    );
};
export default Home;
