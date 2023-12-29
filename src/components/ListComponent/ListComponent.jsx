import "./ListComponent.scss";
import MediumSong from "../Song/SongMedium";
import Playlist from "../YoutubePlaylist";
import SingerComponent from "../Singer";
import { useState } from "react";
const ListComponent = (props) => {
    const isSlideSong = props.isSlideSong;
    const [songs, setSongs] = useState(props);

    const isSlidePlaylist = props.isSlidePlaylist;
    const playlists = props.playlists;

    const isSlideSinger = props.isSlideSinger;
    const singers = props.singers;
    return (
        <>
            <div className="listComponent">
                {isSlideSong ? (
                    <div className="inlineList">
                        {songs?.map((song) => (
                            <MediumSong {...song} />
                        ))}
                    </div>
                ) : isSlidePlaylist ? (
                    <div className="inlineListPlaylist">
                        {playlists.map((playlist) => (
                            <Playlist {...playlist} />
                        ))}
                    </div>
                ) : isSlideSinger ? (
                    <div className="inlineListSinger">
                        {singers.map((singer) => (
                            <SingerComponent {...singer} />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
export default ListComponent;
