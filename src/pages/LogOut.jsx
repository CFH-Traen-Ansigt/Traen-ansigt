import { supabase } from "../DB/supabaseClient";
import { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem("refreshToken"); // Remove session token
      localStorage.removeItem("token"); // Remove refresh token
      localStorage.removeItem("userEmail"); // Remove user data
      localStorage.removeItem("userFullName"); // Remove user full name
      localStorage.removeItem("userId"); // Remove user ID
      localStorage.removeItem("userIcon"); // Remove user icon
      localStorage.removeItem("visualNeglect"); // Remove visual settings
      localStorage.removeItem("isAdmin"); // Remove admin status
      localStorage.removeItem("videoText"); // Remove video text settings
      window.location.href = "/"; // or wherever your login page is
    };

    logout();
  }, []);
  return <div>Logging out...</div>;
};

export default LogOut;
