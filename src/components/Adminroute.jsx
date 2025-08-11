import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../DB/supabaseClient"; // your supabase client

export default function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const user = supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("UserInfo")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      setIsAdmin(data?.is_admin || false);
      setLoading(false);
    }
    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}