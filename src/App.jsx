import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import useShowScrollbar from "./hooks/useShowScrollbar";
import { SongProvider } from "./context/SongContext";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/onlineUsers/onlineUsersSlice";
import { voiceChannelService } from "./services";
import * as Toast from "@radix-ui/react-toast";
import { setExtend } from "../src/redux/mode/modeSlice";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    useShowScrollbar();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        if (user) {
            function onConnect() {
                setIsConnected(true);
                socket.emit("addNewOnlineUser", user._id);
            }

            function onDisconnect() {
                setIsConnected(false);
                socket.emit("deleteOnlineUser", user._id);
            }
            socket.on("connect", onConnect);

            socket.on("disconnect", onDisconnect);

            socket.on("getOnlineUsers", (data) => {
                dispatch(setOnlineUsers(data));
            });

            // Emit an event when the user is about to leave the page
            const handleBeforeUnload = () => {
                socket.emit("deleteOnlineUser", user._id);
                voiceChannelService.leaveAllVoiceChannel(user._id);

                socket.on("getOnlineUsers", (data) => {
                    dispatch(setOnlineUsers(data));
                });
            };
            // Attach the event listener
            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                // Remove the event listener when the component is unmounted
                window.removeEventListener("beforeunload", handleBeforeUnload);

                socket.emit("deleteOnlineUser", user._id);
                socket.on("getOnlineUsers", (data) => {
                    dispatch(setOnlineUsers(data));
                });
                socket.disconnect();
            };
        }
    }, [user]);

    return (
        <Router>
            <ScrollToTop />
            <Toast.Provider swipeDirection="right" duration={4000}>
                <SongProvider>
                    <div className="background-image">
                        <div className="App">
                            <Routes />
                        </div>
                    </div>
                </SongProvider>
            </Toast.Provider>
        </Router>
    );
}

export default App;
