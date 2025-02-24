import React from "react";
import LandingPageLayout from "../components/LandingPageLayout";
import BackgroundImage from "../components/BackgroundImage";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LogIn = () => {
  return (
    <LandingPageLayout>
      <BackgroundImage />
      <div className="w-80 mt-20">
        <h1 className="text-2xl font-manjari mb-3 text-primary font-bold">Log ind:</h1>
        <form>
          <InputField label="Brugernavn" id="log-in-username" type="text" required />
          <InputField label="Adgangskode" id="log-in-password" type="password" variant="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
          <div>
            <input type="checkbox" id="auto-log-in" name="auto-log-in" />
            <label for="auto-log-in">Forbliv logget ind</label>
          </div>
          <h2 id="error">Forkert brugernavn og/eller adgangskode</h2>
          <div className="flex w-full gap-5 mt-8">
            <Button type="button" text="Afbryd" variant="Cancel" href=".." styling="text-2xl pt-[10px]" />
            <Button type="submit" text="Log ind" variant="Primary" styling="text-2xl pt-[10px]" />
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
};

export default LogIn;
