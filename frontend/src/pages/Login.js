import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputValue;

    const handleOnChange = (e) => {

        const { name, value } = e.target;

        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(

                "https://trading-web-app-7jrl.onrender.com/login",

                {
                    ...inputValue,
                },

                {
                    withCredentials: true,
                }
            );

            console.log(data);

            const { success, message } = data;

            if (success) {

                alert(message);

                setTimeout(() => {

                    window.location.href =
                    "https://main.d34gr18chlppqj.amplifyapp.com";

                }, 1000);

            }

            else {

                alert(message);
            }

        }

        catch (error) {

            console.log(error);

            alert("Some error occurred");
        }

        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
    };

    return (

        <div className="container">

            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "80vh" }}
            >

                <div className="col-lg-5 col-md-7 col-11">

                    <div
                        className="p-5 shadow-sm border rounded-4 bg-white"
                    >

                        <h2
                            className="text-center mb-3"
                            style={{
                                color: "#387ed1",
                                fontWeight: "600",
                            }}
                        >
                            Login
                        </h2>

                        <p
                            className="text-center text-muted mb-4"
                        >
                            Welcome back, continue your trading journey
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control p-3"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleOnChange}
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control p-3"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handleOnChange}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn w-100 p-3"
                                style={{
                                    backgroundColor: "#387ed1",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-4">

                            Don’t have an account?

                            <Link
                                to="/signup"
                                className="ms-2"
                                style={{
                                    color: "#387ed1",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                }}
                            >
                                Signup
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;