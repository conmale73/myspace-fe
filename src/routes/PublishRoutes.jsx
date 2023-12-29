import { lazy, Suspense } from "react";
import Loading from "~/components/Loading";
const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));
const Library = lazy(() => import("../pages/Library"));
const LibraryPlaylist = lazy(() => import("../pages/LibraryPlaylist"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));
const SearchResult = lazy(() => import("../pages/SearchResult"));
const AuthenticationPage = lazy(() => import("../pages/AuthenticationPage"));
const SongDetail = lazy(() => import("../pages/SongDetail"));
const YoutubePlaylistDetail = lazy(() =>
    import("../pages/YoutubePlaylistDetail")
);
const PlaylistDetail = lazy(() => import("../pages/PlaylistDetail"));
const ArtistDetail = lazy(() => import("../pages/ArtistDetail"));
const YoutubeAlbumDetail = lazy(() => import("../pages/YoutubeAlbumDetail"));
const Profile = lazy(() => import("../pages/Profile"));
const Playground = lazy(() => import("../pages/Playground"));
const Room = lazy(() => import("../pages/Room"));
const Feed = lazy(() => import("../pages/Feed"));
const SocialHome = lazy(() => import("../pages/SocialHome"));
const Friends = lazy(() => import("../pages/Friends"));
const PostDetail = lazy(() => import("../pages/PostDetail"));

const Groups = lazy(() => import("../pages/Groups"));
const GroupSearch = lazy(() => import("../pages/GroupSearch"));
const GroupDetail = lazy(() => import("../pages/GroupDetail"));
const GroupPostDetail = lazy(() => import("../pages/GroupPostDetail"));

export const publishRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SocialHome title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/authentication/:type",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <AuthenticationPage />
            </Suspense>
        ),
    },
    {
        path: "/profile/:user_id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Profile title="Profile" />
            </Suspense>
        ),
    },
    {
        path: "/playground",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Playground title="Playground" />
            </Suspense>
        ),
    },
    {
        path: "/room/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Room title="Relaxing room" />
            </Suspense>
        ),
    },
    {
        path: "/social/home",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SocialHome title="Home" />
            </Suspense>
        ),
    },
    {
        path: "/social/post/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <PostDetail />
            </Suspense>
        ),
    },
    {
        path: "/social/feed",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Feed title="News feed" />
            </Suspense>
        ),
    },
    {
        path: "/social/friends",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Friends />
            </Suspense>
        ),
    },
    {
        path: "/social/groups",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Groups title="Groups" />
            </Suspense>
        ),
    },
    {
        path: "/social/groups/:group_id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <GroupDetail />
            </Suspense>
        ),
    },
    {
        path: "/social/groups/:group_id/post/:post_id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <GroupPostDetail />
            </Suspense>
        ),
    },
    {
        path: "/social/groups/search/:query",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <GroupSearch title="Groups | Search" />
            </Suspense>
        ),
    },
    {
        path: "/music/home",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Home title="MY SPACE" />
            </Suspense>
        ),
    },
    {
        path: "/music/history",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <History title="Recently Songs/Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/library",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Library title="Library" />
            </Suspense>
        ),
    },
    {
        path: "/music/library/playlists",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <LibraryPlaylist title="My Playlists" />
            </Suspense>
        ),
    },
    {
        path: "/music/leaderboard",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <Leaderboard title="Top 100 songs" />
            </Suspense>
        ),
    },
    {
        path: "/music/search/results",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SearchResult />
            </Suspense>
        ),
    },
    {
        path: "/music/songs/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <SongDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/playlist/youtube/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <YoutubePlaylistDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/album/youtube/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <YoutubeAlbumDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/playlist/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <PlaylistDetail />
            </Suspense>
        ),
    },
    {
        path: "/music/artists/:id",
        element: (
            <Suspense fallback={<Loading isFullScreen={true} />}>
                <ArtistDetail />
            </Suspense>
        ),
    },
];
