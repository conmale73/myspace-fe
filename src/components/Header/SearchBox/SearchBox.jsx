import "./SearchBox.scss";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { searchService, userService } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMainInput } from "../../../redux/search/searchSlice";
import { IoLogoYoutube } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import UserPreview from "../../UserPreview(FullDataProvided)";
const SearchBox = () => {
    const user = useSelector((state) => state.user.data);
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    const [searchInput, setSearchInput] = useState(query);
    const [youtubeSearchResults, setYoutubeSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const fetchYoutubeQueries = async () => {
        const res = await searchService.query(searchInput);
        setYoutubeSearchResults(res.data);

        return res.data;
    };
    const fetchUsers = async () => {
        const res = await userService.searchUserByUsername(
            searchInput,
            page,
            limit
        );
        setUsers(res.data.data);
        return res.data.data;
    };
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        setIsSearching(true);
        try {
            fetchYoutubeQueries();
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setIsSearching(false);
        navigator(`/music/search/results?q=${encodeURIComponent(searchInput)}`);
        dispatch(setMainInput(searchInput));
        localStorage.setItem("searchInput", JSON.stringify(searchInput));
    };
    const handleClickResult = (e) => {
        setSearchInput(e.target.innerText);
        setIsSearching(false);
        navigator(
            `/music/search/results?q=${encodeURIComponent(e.target.innerText)}`
        );
        dispatch(setMainInput(e.target.innerText));
        localStorage.setItem("searchInput", JSON.stringify(e.target.innerText));
    };

    return (
        <div className="searchBox">
            <div className="box">
                <form
                    onSubmit={(e) => handleSubmitSearch(e)}
                    style={{ width: "100%", display: "flex" }}
                >
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => handleSearchInput(e)}
                    />
                    {searchInput != "" ? (
                        <div
                            className="searchButton"
                            onClick={handleSubmitSearch}
                        >
                            <FaSearch className="icon" size="24px" />
                        </div>
                    ) : (
                        <div className="disableSearchButton">
                            <FaSearch className="icon" size="24px" />
                        </div>
                    )}
                </form>
            </div>

            {isSearching && searchInput != "" && (
                <div className="results">
                    <div className="flex gap-[10px] ml-[20px]">
                        <FaUserFriends size="24px" />
                        People
                    </div>
                    <div className="flex flex-wrap w-full justify-start my-[10px] mx-[10px]">
                        {users.map((user, index) => (
                            <div className="w-[30%]" key={index}>
                                <UserPreview
                                    thumbnailWidth="30px"
                                    thumbnailHeight="30px"
                                    showName={true}
                                    bgStyles={true}
                                    link={true}
                                    userData={user}
                                    displayOnlineStatus={false}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-[10px] ml-[20px]">
                        <IoLogoYoutube size="24px" />
                        YouTube Results
                    </div>
                    {youtubeSearchResults.map((result) => (
                        <div
                            className="result"
                            onClick={(e) => handleClickResult(e)}
                        >
                            <div className="icon">
                                <AiOutlineSearch size="24px" />
                            </div>
                            <div className="text">{result}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SearchBox;
