import React, { useState } from "react";
import { supabase } from "../DB/supabaseClient"; // Import Supabase client
import LandingPageLayout from "../components/LandingPageLayout";
import BackgroundImage from "../components/BackgroundImage";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LogIn = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");       
  const [message, setMessage] = useState("");

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
      console.log(message)
    } else {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.session.access_token); // Store session token
      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect user after login
    }
  };
  return (
    <LandingPageLayout>
      <BackgroundImage />
      <div className="w-80 mt-16">
        <h1 className="text-2xl font-manjari mb-3 text-primary font-bold">Log ind:</h1>
        <form onSubmit={handleLogin}>
          <InputField label="Email" id="user-email" type="email" required value={email} setValue={setEmail} />
          <InputField label="Adgangskode" id="user-password" type="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} setValue={setPassword}  />
          <div>
            <input type="checkbox" id="auto-log-in" name="auto-log-in" />
            <label for="auto-log-in" className="ml-2 text-lg">
              Forbliv logget ind
            </label>
          </div>
          {errorDisplayed && <h2 id="error">Forkert brugernavn og/eller adgangskode</h2>}
          <div className="flex w-full gap-5 mt-8">
            <Button type="button" text="Afbryd" variant="Cancel" href=".." styling="text-2xl pt-[10px] h-10" />
            <Button type="submit" text="Log ind" variant="Primary" styling="text-2xl pt-[10px] h-10"/>
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
};

export default LogIn;
