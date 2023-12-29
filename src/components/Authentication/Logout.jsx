import { GoogleLogout } from "react-google-login";

const client_id =
    "424626895989-uiicjbj1fk9205u8n1kk5g9tjqgn7p3p.apps.googleusercontent.com";

function Logout() {
    const onSuccess = (res) => {
        console.log("[Logout Success]");
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
                client_id={client_id}
                buttonText="Logout"
                onSuccess={onSuccess}
            />
        </div>
    );
}
export default Logout;
