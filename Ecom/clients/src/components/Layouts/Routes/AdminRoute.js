import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../../contxt/auth";
import AdminDashboard from "../../../Admin/Pages/admindashboard";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth(); // Correct usage of useAuth
  const navigate = useNavigate(); // useNavigate for redirection

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/"); // Redirect to home page if not admin
        }
      } catch (error) {
        console.error(error);
        setOk(false);
        navigate("/"); // Redirect to home page if request fails
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token, navigate]);

  return ok ? <AdminDashboard /> : <Spinner path="" />;
}
