import { addDoc } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { colRef, loginUser, registerUser } from "../firebase";
import { DataContext } from "./../store/GlobalStore";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const { state, dispatch } = useContext(DataContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password).catch((err) => {
      dispatch({ type: "NOTIFY", payload: { error: err.message } });
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    registerUser(email, password)
      // .then((res) => {
      //   const newUser = {
      //     displayName: res.user.email,
      //     imageUrl:
      //       "https://img.icons8.com/external-becris-flat-becris/2x/external-user-avatars-becris-flat-becris.png",
      //     email: res.user.email,
      //     about: "Hi, i just joined whatsapp😇",
      //   };

      //   addDoc(colRef, newUser).catch((err) => console.log(err.message));
      // })
      .catch((err) => {
        dispatch({ type: "NOTIFY", payload: { error: err.message } });
      });
  };

  return (
    <div className="login">
      {login ? (
        <div className="div">
          <h1>Login and continue chatting</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"email"}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"password"}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
            <div>
              <p style={{ textAlign: "center", fontSize: 14, marginTop: 10 }}>
                Dont have an account yet?{" "}
                <span
                  onClick={() => setLogin(false)}
                  style={{ color: "green", cursor: "pointer" }}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="div">
          <h1>Register to get started</h1>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"email"}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"password"}
              />
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
            <p style={{ textAlign: "center", fontSize: 14, marginTop: 20 }}>
              Already have an account?
              <span
                onClick={() => setLogin(true)}
                style={{ color: "green", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
