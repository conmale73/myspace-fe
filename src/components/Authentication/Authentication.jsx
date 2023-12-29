import Login from "./Login";
import Logout from "./Logout";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import "./Authentication.scss";

const Authentication = () => {
    useEffect(() => {
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    return (
        <div className="authentication">
            <div id="signInDiv"></div>
        </div>
    );
};
export default Authentication;
