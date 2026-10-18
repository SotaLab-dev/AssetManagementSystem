import { Navigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import api from "../services/api/axios";

type RequireAuthProps = {
    children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
 
  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.get("/auth/me");

      if (res.status === 200) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
