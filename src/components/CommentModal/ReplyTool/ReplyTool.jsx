import { useState, useEffect, useRef } from "react";

import { FaFaceSmileBeam } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";

import { useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "emoji-picker-react";

import UserInfoPreview from "../../UserInfoPreview";
import { commentService } from "../../../services";
const ReplyTool = ({
    comment_id,
    text,
    setText,
    post_id,
    creator,
    setReplies,
    replyCount,
    setCommentCount,
    setOpenReplyTool,
}) => {
    const user = useSelector((state) => state.user.data);

    const [files, setFiles] = useState([]);
    const [typing, setTyping] = useState(false);

    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const emojiPickerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (text.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
        }
    }, [text]);
    const handleSelectImage = () => {};
    const handleInput = (event) => {
        setText(event.target.value);
    };

    const handleSelectEmoji = (emojiObject, e) => {
        if (emojiObject && emojiObject.emoji) {
            setText((prevText) => prevText + emojiObject.emoji);
        }

        // Close the emoji picker
        setIsEmojiPickerVisible(false);
    };
    const handleClickOutside = (event) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target)
        ) {
            setIsEmojiPickerVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleClickSend = async (e) => {
        const commentToPost = {
            post_id: post_id,
            creator: {
                user_id: user._id,
                username: user.username,
                avatar: user.avatar,
            },
            replyTo: {
                user_id: creator.user_id,
                username: creator.username,
                comment_id: comment_id,
            },
            content: {
                text: text,
                files: files,
            },
        };
        if (text.length > 0 || files.length > 0) {
            try {
                console.log(commentToPost);
                const res = await commentService.createNewcomment(
                    commentToPost
                );
                console.log(res);
                replyCount = replyCount + 1;
                setText("");
                setCommentCount((prevCount) => prevCount + 1);
                setReplies((replies) => [...replies, res.data]);
                setOpenReplyTool(false);
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                // Add a newline character at the cursor position
                // setText((prevText) => prevText + "\n");
            } else {
                e.preventDefault();
                handleClickSend();
            }
        }
    };
    return (
        <div className="relative w-full max-w-[500px] x1n2onr6 x1ja2u2z x9f619 x78zum5 xdt5ytf x2lah0s x193iq5w x1xmf6yo x1e56ztr">
            {isEmojiPickerVisible && (
                <div
                    ref={emojiPickerRef}
                    style={{
                        position: "absolute",
                        top: -450 + "px",
                    }}
                >
                    <EmojiPicker
                        skinTonesDisabled={true}
                        onEmojiClick={(emojiObject, e) =>
                            handleSelectEmoji(emojiObject, e)
                        }
                        theme="dark"
                    />
                </div>
            )}
            <div className="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x1iyjqo2 x2lwn1j">
                <div className="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w x1swvt13 x1pi30zi">
                    <div className="">
                        <div className="x78zum5 x1q0g3np x1a2a7pz">
                            <div className="xqcrz7y x14yjl9h xudhj91 x18nykt9 xww2gxu x1lliihq x1w0mnb xr9ek0c x1n2onr6">
                                <UserInfoPreview
                                    thumbnailHeight="40px"
                                    thumbnailWidth="40px"
                                    showName={false}
                                    user_id={user._id}
                                    bgStyles={false}
                                    displayOnlineStatus={false}
                                />
                            </div>
                            <div className="x1r8uery x1iyjqo2 x6ikm8r x10wlt62 x4uap5">
                                <form
                                    className="x1ed109x x1n2onr6 xmjcpbm x1tlxs6b x1g8br2z x1gn5b1j x230xth x972fbf xcfux6l x1qhh985 xm0m39n x78zum5 x1iyjqo2 x13a6bvl"
                                    role="presentation"
                                >
                                    <div className="xh8yej3">
                                        <div className="x78zum5 x13a6bvl">
                                            <div
                                                className="xi81zsa xo1l8bm xlyipyv xuxw1ft x49crj4 x1ed109x xdl72j9 x1iyjqo2 xs83m0k x6prxxf x6ikm8r x10wlt62 x1y1aw1k xn6708d xwib8y2 x1ye3gou"
                                                data-visualcompletion="ignore"
                                            >
                                                <div className="x1n2onr6">
                                                    <TextareaAutosize
                                                        value={text}
                                                        ref={inputRef}
                                                        className=""
                                                        style={{
                                                            fontSize: 18 + "px",

                                                            backgroundColor:
                                                                "transparent",
                                                            outline: "none",
                                                            width: "100%",
                                                            resize: "none",
                                                            color: "#e4e6eb",
                                                        }}
                                                        role="textbox"
                                                        onChange={(e) =>
                                                            handleInput(e)
                                                        }
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e)
                                                        }
                                                    ></TextareaAutosize>

                                                    {!typing ? (
                                                        <div
                                                            className="ml-[2px] mt-[3px] xi81zsa x6ikm8r x10wlt62 x47corl x10l6tqk x17qophe xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3"
                                                            style={{
                                                                fontSize:
                                                                    18 + "px",
                                                            }}
                                                        >
                                                            Write a comment…
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="x4b6v7d x1ojsi0c x10e4vud xm040h">
                                                    <ul
                                                        className="x6s0dn4 xpvyfi4 x78zum5 xc9qbxq xw3qccf xp7jhwk"
                                                        data-id="unfocused-state-actions-list"
                                                    >
                                                        <li className="x1rg5ohu x1mnrxsn x1w0mnb"></li>
                                                        <li className="x1rg5ohu x1mnrxsn x1w0mnb">
                                                            <span className="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                                                                <div
                                                                    aria-label="Insert an emoji"
                                                                    className="x1i10hfl x1qjc9v5 xjqpnuy xa49m3k xqeqjp1 x2hbi6w x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x2lwn1j xeuugli x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x3nfvp2 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x3ajldb x194ut8o x1vzenxt xd7ygy7 xt298gk x1xhcax0 x1s928wv x10pfhc2 x1j6awrg x1v53gu8 x1tfg27r xitxdhh"
                                                                    role="button"
                                                                    tabIndex="0"
                                                                >
                                                                    <i
                                                                        data-visualcompletion="css-img"
                                                                        className="x1b0d499 x1d69dk1"
                                                                        style={{
                                                                            backgroundImage: `url(
                                                                                    "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/xsY95Lh7-vO.png"
                                                                                )`,
                                                                            backgroundPosition:
                                                                                "0px -1197px",
                                                                            backgroundSize:
                                                                                "auto",
                                                                            width: "16px",
                                                                            height: "16px",
                                                                            backgroundRepeat:
                                                                                "no-repeat",
                                                                            display:
                                                                                "inline-block",
                                                                        }}
                                                                    ></i>
                                                                    <div
                                                                        className="x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x14yjl9h xudhj91 x18nykt9 xww2gxu"
                                                                        data-visualcompletion="ignore"
                                                                    ></div>
                                                                </div>
                                                            </span>
                                                        </li>
                                                        <li className="x1rg5ohu x1mnrxsn x1w0mnb">
                                                            <span className="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                                                                <div
                                                                    aria-label="Attach a photo or video"
                                                                    className="x1i10hfl x1qjc9v5 xjqpnuy xa49m3k xqeqjp1 x2hbi6w x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x2lwn1j xeuugli x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x3nfvp2 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x3ajldb x194ut8o x1vzenxt xd7ygy7 xt298gk x1xhcax0 x1s928wv x10pfhc2 x1j6awrg x1v53gu8 x1tfg27r xitxdhh"
                                                                    role="button"
                                                                    tabIndex="0"
                                                                >
                                                                    <i
                                                                        data-visualcompletion="css-img"
                                                                        className="x1b0d499 x1d69dk1"
                                                                        style={{
                                                                            backgroundImage: `url(
                                                                                    "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/xsY95Lh7-vO.png"
                                                                                )`,
                                                                            backgroundPosition:
                                                                                "0px -1129px",
                                                                            backgroundSize:
                                                                                "auto",
                                                                            width: "16px",
                                                                            height: "16px",
                                                                            backgroundRepeat:
                                                                                "no-repeat",
                                                                            display:
                                                                                "inline-block",
                                                                        }}
                                                                    ></i>
                                                                    <div
                                                                        className="x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x14yjl9h xudhj91 x18nykt9 xww2gxu"
                                                                        data-visualcompletion="ignore"
                                                                    ></div>
                                                                </div>
                                                            </span>
                                                            <input
                                                                accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif"
                                                                className="x1s85apg"
                                                                type="file"
                                                            />
                                                        </li>
                                                        <li className="x1rg5ohu x1mnrxsn x1w0mnb">
                                                            <span className="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                                                                <div
                                                                    aria-label="Comment with a GIF"
                                                                    className="x1i10hfl x1qjc9v5 xjqpnuy xa49m3k xqeqjp1 x2hbi6w x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x2lwn1j xeuugli x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x3nfvp2 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x3ajldb x194ut8o x1vzenxt xd7ygy7 xt298gk x1xhcax0 x1s928wv x10pfhc2 x1j6awrg x1v53gu8 x1tfg27r xitxdhh"
                                                                    role="button"
                                                                    tabIndex="0"
                                                                >
                                                                    <i
                                                                        data-visualcompletion="css-img"
                                                                        className="x1b0d499 x1d69dk1"
                                                                        style={{
                                                                            backgroundImage: `url(
                                                                                    "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/xsY95Lh7-vO.png"
                                                                                )`,
                                                                            backgroundPosition:
                                                                                "0px -1231px",
                                                                            backgroundSize:
                                                                                "auto",
                                                                            width: "16px",
                                                                            height: "16px",
                                                                            backgroundRepeat:
                                                                                "no-repeat",
                                                                            display:
                                                                                "inline-block",
                                                                        }}
                                                                    ></i>
                                                                    <div
                                                                        className="x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x14yjl9h xudhj91 x18nykt9 xww2gxu"
                                                                        data-visualcompletion="ignore"
                                                                    ></div>
                                                                </div>
                                                            </span>
                                                        </li>
                                                        <li className="x1rg5ohu x1mnrxsn x1w0mnb">
                                                            <span className="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                                                                <div
                                                                    aria-label="Comment with a Sticker"
                                                                    className="x1i10hfl x1qjc9v5 xjqpnuy xa49m3k xqeqjp1 x2hbi6w x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x2lwn1j xeuugli x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x3nfvp2 xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x3ajldb x194ut8o x1vzenxt xd7ygy7 xt298gk x1xhcax0 x1s928wv x10pfhc2 x1j6awrg x1v53gu8 x1tfg27r xitxdhh"
                                                                    role="button"
                                                                    tabIndex="0"
                                                                >
                                                                    <i
                                                                        data-visualcompletion="css-img"
                                                                        className="x1b0d499 x1d69dk1"
                                                                        style={{
                                                                            backgroundImage: `url(
                                                                                    "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/xsY95Lh7-vO.png"
                                                                                )`,
                                                                            backgroundPosition:
                                                                                "0px -1333px",
                                                                            backgroundSize:
                                                                                "auto",
                                                                            width: "16px",
                                                                            height: "16px",
                                                                            backgroundRepeat:
                                                                                "no-repeat",
                                                                            display:
                                                                                "inline-block",
                                                                        }}
                                                                    ></i>
                                                                    <div
                                                                        className="x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x14yjl9h xudhj91 x18nykt9 xww2gxu"
                                                                        data-visualcompletion="ignore"
                                                                    ></div>
                                                                </div>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div> */}
                                        </div>

                                        <div className="x10b6aqq x4b6v7d x1ojsi0c x1u6ievf x67ttcy">
                                            <div className="x9f619 x1n2onr6 x1ja2u2z x78zum5 x2lah0s x1qughib x6s0dn4 x1a02dak x1q0g3np x1pi30zi x1swvt13 xykv574 xbmpl8g x4cne27 xifccgj">
                                                <div className="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xsyo7zv x16hj40l x10b6aqq x1yrsyyn">
                                                    <div id="focused-state-actions-list">
                                                        <ul
                                                            className="x6s0dn4 xpvyfi4 x78zum5 xc9qbxq xw3qccf xp7jhwk"
                                                            data-id="unfocused-state-actions-list"
                                                        >
                                                            {/* <li
                                                                    className=" hover:bg-[#676668] rounded-full cursor-pointer p-[8px] x1rg5ohu x1mnrxsn x1w0mnb"
                                                                    onClick={() =>
                                                                        handleSelectImage()
                                                                    }
                                                                >
                                                                    <FaCamera size="20px" />
                                                                </li> */}
                                                            <li
                                                                className="relative hover:bg-[#676668] rounded-full cursor-pointer p-[8px] x1rg5ohu x1mnrxsn x1w0mnb"
                                                                onClick={() =>
                                                                    setIsEmojiPickerVisible(
                                                                        !isEmojiPickerVisible
                                                                    )
                                                                }
                                                            >
                                                                <FaFaceSmileBeam size="20px" />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {text?.length > 0 ? (
                                                    <div
                                                        className="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xsyo7zv x16hj40l x10b6aqq x1yrsyyn 
                                                            rounded-full hover:bg-[#676668] cursor-pointer"
                                                        onClick={(e) =>
                                                            handleClickSend(e)
                                                        }
                                                    >
                                                        <PiPaperPlaneRightFill
                                                            className=""
                                                            size="30px"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xsyo7zv x16hj40l x10b6aqq x1yrsyyn rounded-full cursor-not-allowed text-[#707070]">
                                                        <PiPaperPlaneRightFill
                                                            className=""
                                                            size="30px"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyTool;
