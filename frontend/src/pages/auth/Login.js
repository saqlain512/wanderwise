import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const loginUrl = `/api/v1/auth/login`;

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(loginUrl, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="login - WanderWise">
      <div class="container">
      <div class="wrapper">
        <div class="title"><span>Login Form</span></div>
        <form form onSubmit={handleSubmit}>
          <div class="row">
            <i class="fas fa-user"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div class="pass"><a href="/forgot-password">Forgot password?</a></div>
          <div class="row button">
            <input type="submit" value="Login"/>
          </div>
          <div class="signup-link">Not a member? <a href="/register">Signup now</a></div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Login;

