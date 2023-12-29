import { GoogleLogin } from "react-google-login";

const client_id =
    "424626895989-uiicjbj1fk9205u8n1kk5g9tjqgn7p3p.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res) => {
        console.log("[Login Success] currentUser:", res.profileObj);
    };
    const onFailure = (res) => {
        console.log("[Login Failed] res:", res);
    };
    return (
        <div id="signInButton">
            <GoogleLogin
                client_id={client_id}
                buttonText="Login via Google"
                onSuccess={onSuccess}
                onFai1ure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}
export default Login;
