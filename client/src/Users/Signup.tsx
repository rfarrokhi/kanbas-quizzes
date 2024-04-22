import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {useSnackbar} from "notistack";

function Signup() {
  const [user, setUser] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  const {enqueueSnackbar } = useSnackbar();

  const signup = async () => {
    try {
      await client.signup(user);
      enqueueSnackbar(`Account successfully created.`, { variant: "success"});
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
        enqueueSnackbar(err.response.data.message, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" }});
  } 
};


  return (
      <div>
          <h1>Signup</h1>
          <input
              className={"form-control"}
              value={user.username}
              placeholder={"Username"}
              onChange={(e) => setUser({
                  ...user, username: e.target.value
              })}/>
          <input
              className={"form-control"}
              value={user.password}
              placeholder={"Password"}
              type={"password"}
              onChange={(e) => setUser({
                  ...user, password: e.target.value
              })}/>
          <button onClick={signup} className={"btn btn-primary"}>
              Sign up
          </button>

          <div style={{marginTop: 40}}>
              <h2>Aleady have an account?</h2>
              <button onClick={() => navigate("/Kanbas/Account/Signin")} className={"btn btn-primary"}>Sign in
              </button>
          </div>
      </div>
  );
}

export default Signup;