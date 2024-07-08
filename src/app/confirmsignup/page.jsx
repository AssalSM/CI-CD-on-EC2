"use client";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { useState } from "react";
import { poolData } from "../cognito-config";
import { useRouter } from "next/navigation";
import "./confirm.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const userPool = new CognitoUserPool(poolData);

function Page() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({ Username: username, Pool: userPool });

    user.confirmRegistration(code, true, (err, result) => {
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
      router.push("/signIn"),
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
        <h1 className="textsign">confirm</h1>
        <input
          className="inputemail"
          type="text"
          placeholder="your email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputemail"
          type="text"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="loginbutton" type="submit">
          confirm code
        </button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Page;
