import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearchContext() {
    return useContext(SearchContext);
}

export function SearchProvider({ children }) {
    const [searchInput, setSearchInput] = useState("");
    return (
        <SearchProvider.Provider
            value={{
                searchInput,
                setSearchInput,
            }}
        >
            {children}
        </SearchProvider.Provider>
    );
}
