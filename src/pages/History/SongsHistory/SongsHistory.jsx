import styles from "./SongsHistory.module.scss";
import LongSong from "../../../components/Song/SongLong";
const soundList = [
    {
        videoId: 0,
        title: "Daylight",
        artists: [
            {
                name: "David Kushner",
                id: "UCqQYKwqkVXZ8p2wZdXZu6iQ",
            },
        ],
        duration: "3:33",
        album: "洗脑节奏 Viral Hits",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/David Kushner Daylight.mp3",
        liked: true,
    },
    {
        videoId: 1,
        title: "Take Me To Church",
        artists: [
            {
                name: "Hozier",
                id: "UC9CuvdOVfMPvKCiwdGKL3cQ",
            },
        ],
        duration: "3:58",
        album: "Take Me To Church E.P.",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/Take Me To Church Hozier.mp3",
        liked: true,
    },
    {
        videoId: 2,
        title: "Aloha",
        artists: [
            {
                name: "Cool",
                id: "UC9CuvdOVfMPvKCiwdGKL3cQ",
            },
        ],
        duration: "4:27",
        album: "First Whisper",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/aloha.mp3",
        liked: false,
    },
    {
        videoId: 3,
        title: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artists: [
            {
                name: "Đặng Tử Kỳ",
                id: "UC9CuvdOVfMPvKCiwdGKL3cQ",
            },
        ],
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
    {
        videoId: 4,
        title: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artists: [
            {
                name: "Đặng Tử Kỳ",
                id: "UC9CuvdOVfMPvKCiwdGKL3cQ",
            },
        ],
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
    {
        videoId: 5,
        title: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artists: [
            {
                name: "Đặng Tử Kỳ",
                id: "UC9CuvdOVfMPvKCiwdGKL3cQ",
            },
        ],
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        thumbnails: [
            {
                url: "/photos/DaoHoaNac_DangTuKy.jpg",
            },
        ],
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
];
const SongsHistory = (props) => {
    return (
        <div className={styles.songsHistory}>
            {soundList.map((song) => {
                return (
                    <LongSong
                        videoId={song.videoId}
                        title={song.title}
                        artists={song.artists}
                        thumbnails={song.thumbnails}
                        album={song.album}
                        duration={song.duration}
                        liked={song.liked}
                        buttons={true}
                    />
                );
            })}
        </div>
    );
};
export default SongsHistory;
