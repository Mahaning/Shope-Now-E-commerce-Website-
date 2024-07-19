import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";
import { useAuth } from "../../../contxt/auth.js";
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
        // navigate("/");
      } else {
        setOk(false);
        // navigate("/");
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
