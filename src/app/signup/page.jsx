"use client";
import React from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { useState } from "react";
import { poolData } from "../cognito-config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signUp.css";
import { useRouter } from "next/navigation";

const userPool = new CognitoUserPool(poolData);

// import  {useRouter}  from "next/router";

function Page() {
 
  // const [numberfon, setnumberfon] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    userPool.signUp(
      email,
      password,
      [{ Name: "name", Value: username }],
      null,
      (err, result) => {
        if (err) {
          setError(err.message),
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
          
          return;
        }
        console.log("User name is " + result.user.getUsername());
        router.push("/confirmsignup"),
        toast.success(' Wow so easy!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
       
          });

       
      }
    );
  };
  return (
    <div className="loginpage">
       <ToastContainer />
      <form onSubmit={handleSubmit} className="loginCrad">
        <h1 className="textsign">Sign up</h1>
        <input
          className="inputemail"
          type="text"
          placeholder="your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input className="inputemail" type="text" placeholder="your number"  onChange={(e) => setnumberfon(e.target.value)}/> */}
        <input
          className="inputemail"
          type="text"
          placeholder="your name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputpassword"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginbutton">
          Create Account
        </button>
      
        <div className="other">
          <a className="CreateAccount" href="/signIn">
            i have account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Page;
