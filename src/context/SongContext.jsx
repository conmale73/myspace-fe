import { createContext, useContext, useState } from "react";

const SongContext = createContext();

export function useSongContext() {
    return useContext(SongContext);
}

export function SongProvider({ children }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    return (
        <SongContext.Provider
            value={{
                currentSongIndex,
                setCurrentSongIndex,
                isPlaying,
                setIsPlaying,
                currentSong,
                setCurrentSong,
            }}
        >
            {children}
        </SongContext.Provider>
    );
}
