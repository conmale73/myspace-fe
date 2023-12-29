import styles from "./RegisterForm.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "flowbite-react";

import { authService } from "../../../services";
import { setUser } from "../../../redux/user/userSlice";
const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    let [usernameError, setUsernameError] = useState([]);
    let [emailError, setEmailError] = useState([]);
    let [passwordError, setPasswordError] = useState([]);
    let [error, setError] = useState("");

    const [openRegister, setOpenRegister] = useState(false);

    const navigator = useNavigate();
    const dispatch = useDispatch();

    const handleOnChangeUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        if (
            (newUsername.length < 4 || newUsername.length > 24) &&
            !usernameError.includes(
                "Username must be between 4 and 24 characters"
            )
        ) {
            usernameError.push("Username must be between 4 and 24 characters");
        } else if (newUsername.length >= 4 && newUsername.length <= 24) {
            const errorToDelete =
                "Username must be between 4 and 24 characters";
            setUsernameError(
                usernameError.filter((err) => err !== errorToDelete)
            );
        }
    };
    const handleOnChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail.length < 1) {
            emailError.push("Email is required");
        } else {
            const errorToDelete = "Email is required";
            setEmailError(emailError.filter((err) => err !== errorToDelete));
        }
    };
    const handleOnChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Define a regular expression to match only letters and numbers
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(newPassword)) {
            if (
                passwordError.includes(
                    "Password must contain only letters and numbers"
                )
            ) {
            } else {
                passwordError.push(
                    "Password must contain only letters and numbers"
                );
            }
        } else if (newPassword.length < 6) {
            if (
                passwordError.includes("Password must be at least 6 characters")
            ) {
            } else {
                passwordError.push("Password must be at least 6 characters");
            }
        } else if (newPassword.length > 20) {
            if (
                passwordError.includes(
                    "Password must be less than 20 characters"
                )
            ) {
            } else {
                passwordError.push("Password must be less than 20 characters");
            }
        } else {
            // Clear the error if the password is valid
            setPasswordError([]);
        }
    };
    const handleRegister = async () => {
        try {
            const res = await authService.register(email, password, username);
            console.log(res);
            if (res.status === 201) {
                const response = await authService.login(email, password);

                const token = response.data.token;
                localStorage.setItem("token", JSON.stringify(token));
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(setUser(user));
            }
        } catch (err) {
            console.error("Error: ", err);
            setError(err.response.data.message);
        }
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            passwordError.length == 0 &&
            emailError.length == 0 &&
            usernameError.length == 0
        ) {
            console.log("Submit form");
            try {
                handleRegister();
            } catch (err) {
                console.log(err);
            } finally {
            }
        }
    };
    const handleClickSubmit = (e) => {
        handleSubmitForm(e);
    };

    const handleStateModal = (e) => {
        setOpenRegister(!openRegister);
        setError("");
    };

    return (
        <div className={styles.registerForm}>
            <div className={styles.title}>
                <h1>Sign Up</h1>
            </div>
            <div className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
                <div className={styles.input}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={styles.inputField}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleOnChangeEmail(e)}
                    />
                    <ul className={styles.error}>
                        {emailError.map((err) => {
                            return <li className={styles.err}>{err}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.input}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className={styles.inputField}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => handleOnChangeUsername(e)}
                    />
                    <ul className={styles.error}>
                        {usernameError.map((err) => {
                            return <li className={styles.err}>{err}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className={styles.inputField}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleOnChangePassword(e)}
                    />
                    <ul className={styles.error}>
                        {passwordError.map((err) => {
                            return <li className={styles.err}>{err}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.button}>
                    <button
                        type="submit"
                        className={styles.signupButton}
                        onClick={(e) => handleClickSubmit(e)}
                    >
                        Sign Up
                    </button>
                </div>
                {error && (
                    <div className="flex justify-center">
                        <Toast className="bg-[#303030]">
                            <div className="ml-3 text-[15px] font-bold text-[#e4e6eb]">
                                {error}
                            </div>
                            <Toast.Toggle onDismiss={() => setError("")} />
                        </Toast>
                    </div>
                )}
            </div>
        </div>
    );
};
export default RegisterForm;
