import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        console.log(user)
        notify();
        naviage("/");

      })
      .catch((errorMsg) => {
        const errorMsgCode = errorMsg.code;
        const errorMsgMessage = errorMsg.message;
        // ..
        const notifyError = () => toast.error(errorMsgMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        notifyError();

      });
  };

  const notify = () => toast.success('👍 Login successful!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <>
      <NavBar />
      <div className="parent clearfix">
        <div className="bg-illustration"></div>
        <div className="login">
          <div className="container">
            <h1>
              Login to access to
              <br />
              your account
            </h1>
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <input
                  type={"text"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                ></input>
                <input
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                ></input>
                {/* <div className="remember-form">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div> */}
                <div className="forget-pass">
                  <a href="#">
                    <Link to={"/signup"}>Need an account ?</Link>
                  </a>
                </div>
                <button type="submit">LOG-IN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
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
    </>
  );
}

export default Login;
