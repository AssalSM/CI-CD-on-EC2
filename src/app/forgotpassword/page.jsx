"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forgot.css";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { useState } from "react";
import { poolData } from "../cognito-config";
import { useRouter } from "next/navigation";




const userPool = new CognitoUserPool(poolData);
function Page() {
  const [username, setUsername] = useState("");
 
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
          router.push("/ResetPassword"),
          toast.success("Verification code sent to your email.", {
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
        <button type="submit" className="loginbutton">
          Submit
        </button>

        <div className="other">
          <a className="ForgotPassword" href="/forgotpassword">
            i have account
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
