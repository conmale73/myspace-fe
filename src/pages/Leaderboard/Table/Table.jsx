import "./Table.scss";
import { useState, useEffect } from "react";
import LongSong from "../../../components/Song/SongLong";
import { exploreService } from "../../../services";
import Loading from "../../../components/Loading";
const Table = (props) => {
    const numbers = Array.from({ length: 40 }, (_, index) => index + 1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getCellClassName = (index) => {
        switch (index) {
            case 0:
                return "yellow";
            case 1:
                return "silver";
            case 2:
                return "brown";
            default:
                return "";
        }
    };
    const [songs, setSongs] = useState([]);
    async function getChart() {
        try {
            const res = await exploreService.getChart("ZZ");
            setSongs(res.data.videos.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getChart();
        console.log(songs);
    }, []);
    return (
        <div className="table">
            {loading ? (
                <Loading isFullScreen={true} />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {numbers.map((number, index) => (
                        <div className="row" key={number}>
                            <div className={`cell ${getCellClassName(index)}`}>
                                {number}
                            </div>
                            <div className="cell">
                                {songs[index] && (
                                    <LongSong
                                        videoId={songs[index]?.videoId}
                                        title={songs[index]?.title}
                                        artists={songs[index]?.artists}
                                        thumbnails={songs[index]?.thumbnails}
                                        album={songs[index]?.album}
                                        duration={songs[index]?.duration}
                                        liked={songs[index]?.liked}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
export default Table;
