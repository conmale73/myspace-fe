// ListPlaylists.jsx

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import YoutubePlaylist from "../../YoutubePlaylist";
const YoutubeListPlaylists = (props) => {
    const isSlidePlaylist = props.isSlidePlaylist;
    const playlists = props.playlists;
    const prevButton = useRef(null);
    const nextButton = useRef(null);

    const handleReachBeginning = () => {
        prevButton.current.classList.add("btn_disabled");
    };

    const handleReachEnd = () => {
        nextButton.current.classList.add("btn_disabled");
    };

    const handlePrev = () => {
        nextButton.current.classList.remove("btn_disabled");
    };

    const handleNext = () => {
        prevButton.current.classList.remove("btn_disabled");
    };

    const uniqueId = props.uniqueId;

    return (
        <>
            {isSlidePlaylist ? (
                <div style={{ width: "100%", height: "300px" }}>
                    <div style={{ display: "flex", width: "fit-content" }}>
                        <button
                            className={`custom_prev btn_disabled ${uniqueId}`} // Include unique ID as class
                            onClick={handlePrev}
                            ref={prevButton}
                        >
                            <BsChevronLeft size="40px" />
                        </button>
                        <button
                            className={`custom_next ${uniqueId}`} // Include unique ID as class
                            onClick={handleNext}
                            ref={nextButton}
                        >
                            <BsChevronRight size="40px" />
                        </button>
                    </div>

                    <Swiper
                        navigation={{
                            nextEl: `.${uniqueId}.custom_next`, // Use unique ID class to target specific navigation
                            prevEl: `.${uniqueId}.custom_prev`, // Use unique ID class to target specific navigation
                        }}
                        modules={[Navigation]}
                        className="mySwiper2"
                        slidesPerView={5}
                        spaceBetween={10}
                        onReachBeginning={handleReachBeginning}
                        onReachEnd={handleReachEnd}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {playlists.map((playlist, index) => (
                            <SwiperSlide key={index}>
                                <YoutubePlaylist
                                    {...playlist}
                                    searh={props.search}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className="flex flex-wrap">
                    {playlists.map((playlist, index) => (
                        <div key={index}>
                            <YoutubePlaylist
                                {...playlist}
                                key={index}
                                search={props.search}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default YoutubeListPlaylists;
