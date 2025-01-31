import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const baseUrl = process.env.REACT_APP_BACKEND_API;
  const url = `${baseUrl}/api/v1/auth/admin-auth`;
  useEffect(() => {
    const authCheck = async () => {
        try {
            const res = await axios.get(url);
            if (res.data.ok) {
               setOk(true);
            } 
        } catch (error) {
            console.error("Error fetching authorization status:", error);
            setOk(false);
        }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}