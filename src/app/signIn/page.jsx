"use client";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { useState } from "react";
import { poolData } from "../cognito-config.js";
import "./signIn.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const userPool = new CognitoUserPool(poolData);

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Login success:", result);
        dispatch(setUser());
        dispatch(setUser(result));
        router.push("/Notes"),
          toast.success("Wow so easy!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      },
      onFailure: (err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    });
  };

  return (
    <div className="loginpage">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <form onSubmit={handleSubmit} className="loginCrad">
        <h1 className="textsign">Sign In</h1>
        <input
          className="inputemail"
          type="text"
          placeholder="your Email"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="inputpassword"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginbutton">
          Sign In
        </button>

        <div className="other">
          <a className="ForgotPassword" href="/forgotpassword">
            Forgot password
          </a>
          |
          <a className="CreateAccount" href="/signup">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Page;
