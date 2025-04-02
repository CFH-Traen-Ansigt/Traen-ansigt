import React from "react";
import { useState } from "react";
import LandingPageLayout from "../components/LandingPageLayout";
import BackgroundImage from "../components/BackgroundImage";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LogIn = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  return (
    <LandingPageLayout>
      <BackgroundImage />
      <div className="w-80 mt-16">
        <h1 className="text-2xl font-manjari mb-3 text-primary font-bold">Log ind:</h1>
        <form>
          <InputField label="Email" id="user-email" type="email" required />
          <InputField label="Adgangskode" id="user-password" type="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
          <div>
            <input type="checkbox" id="auto-log-in" name="auto-log-in" />
            <label for="auto-log-in" className="ml-2 text-lg">
              Forbliv logget ind
            </label>
          </div>
          {errorDisplayed && <h2 id="error">Forkert brugernavn og/eller adgangskode</h2>}
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
