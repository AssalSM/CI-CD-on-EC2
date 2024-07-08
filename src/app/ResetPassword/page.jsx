"use client";
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { poolData } from '../cognito-config';
import { useRouter } from "next/navigation";
import "./reset.css"
const userPool = new CognitoUserPool(poolData);

function Page() {
    const [username, setUsername] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => {
               
                router.push("/signIn"),
                toast.success("Password has been reset successfully.", {
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
              
               
                toast.error(err.message , {
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
        <h1 className="textsign">ForgotPassword</h1>
         <input
          className="inputpassword"
                type="text"
                placeholder="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
             className="inputpassword"
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            <input
             className="inputpassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="loginbutton" type="submit">Submit</button>

        
      </form>
    </div>
  );
}

export default Page;
