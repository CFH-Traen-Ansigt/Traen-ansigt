import React, { useState, useEffect } from "react";
import { supabase } from "../DB/supabaseClient"; // Import Supabase client
import LandingPageLayout from "../components/LandingPageLayout";
import BackgroundImage from "../components/BackgroundImage";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LogIn = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/forside"); // Redirect if already logged in
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setErrorDisplayed(true);
      setErrorDisplayed(error.message);
      console.log(message);
    } else {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.session.access_token); // Store session token
      localStorage.setItem("refreshToken", data.session.refresh_token); // Store refresh token
      localStorage.setItem("userEmail", email); // Store user email
      localStorage.setItem("userId", data.session.user.id); // Store user ID
      await getUserInfo(data.session.user.id); // Fetch and store user full name
      await getSettings(data.session.user.id); // Fetch and store user settings
      window.location.href = "/forside"; // Redirect user after login
    }
  };

  async function getUserInfo(id) {
    const { data, error } = await supabase.from("UserInfo").select("full_name, profile_picture, is_admin").eq("id", id).single();

    if (error && error.details === "The result contains 0 rows") {
      const { error: userError } = await supabase.from("UserInfo").insert({
        id: id,
        full_name: "Ukendt",
        profile_picture: "1", // Default icon
      });
      if (userError) {
        console.error("Error inserting default user info:", userError);
      }
      localStorage.setItem("userFullName", "Ukendt"); // Store default full name
      localStorage.setItem("userIcon", "1"); // Store default profile picture
      localStorage.setItem("isAdmin", false); // Store default admin status
    } else if (error) {
      console.error("Error fetching user info:", error);
    } else {
      localStorage.setItem("userFullName", data.full_name); // Store user full name
      localStorage.setItem("userIcon", data.profile_picture); // Store user profile picture
      localStorage.setItem("isAdmin", data.is_admin); // Store user admin status
    }
  }

  async function getSettings(id) {
    const { data, error } = await supabase.from("Settings").select("visual_neglect, video_text").eq("user_id", id).single();

    if (error && error.details === "The result contains 0 rows") {
      const { error: settingsError } = await supabase.from("Settings").insert({
        user_id: id,
        visual_neglect: "Standard",
        video_text: false,
      });
      if (settingsError) {
        console.error("Error inserting default settings:", settingsError);
      }
      localStorage.setItem("visualNeglect", "Standard"); // Store default visual neglect setting
      localStorage.setItem("videoText", "false"); // Store default video text setting
    } else if (error) {
      console.error("Error fetching user settings:", error);
    } else {
      localStorage.setItem("visualNeglect", data.visual_neglect); // Store user visual neglect setting
      localStorage.setItem("videoText", data.video_text); // Store user video text setting
    }
  }

  return (
    <LandingPageLayout>
      <BackgroundImage />
      <div className="w-80 mt-16">
        <h1 className="text-2xl font-manjari mb-3 text-primary font-bold">Log ind:</h1>
        <form onSubmit={handleLogin}>
          <InputField label="Brugernavn (email)" id="user-email" type="email" required value={email} setValue={setEmail} />
          <InputField label="Adgangskode" id="user-password" type="password" required value={password} setValue={setPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
          {errorDisplayed && (
            <h2 id="error" className="text-primary -mt-2 mb-6">
              Forkert brugernavn og/eller adgangskode
            </h2>
          )}
          <div>
            <input type="checkbox" id="auto-log-in" name="auto-log-in" defaultChecked />
            <label for="auto-log-in" className="ml-2 text-lg">
              Forbliv logget ind
            </label>
          </div>

          <div className="flex w-full gap-5 mt-8">
            <Button type="button" text="Afbryd" variant="Cancel" href=".." styling="text-2xl pt-[10px] h-12" fullWidth />
            <Button type="submit" text="Log ind" variant="Primary" styling="text-2xl pt-[10px] h-12" fullWidth />
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
};

export default LogIn;
