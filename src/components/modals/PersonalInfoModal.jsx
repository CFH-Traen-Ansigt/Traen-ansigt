import React from "react";
import { useState } from "react";
import Button from "../Button";
import InputField from "../InputField";
import IconOption from "../IconOption";
import { supabase } from "../../DB/supabaseClient";

export default function PersonalInfoModal({ showModal, setShowModal, onDeleteUserClick }) {
  const [icon, setIcon] = useState(localStorage.getItem("userIcon") || "1");
  const [fullName, setFullName] = useState(localStorage.getItem("userFullName") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  
  async function fetchUserInfo() {
    console.log("Fetching user info for userId:", localStorage.getItem("userId"));
    let { data, error } = await supabase
      .from("UserInfo")
      .select("*")
      .eq("id", localStorage.getItem("userId"))
      .single();

    if (error) {
      console.error("Error fetching user info:", error);
    } else {
      setFullName(data.fullName || "");
      setIcon(data.icon || "");
    }
    console.log("Fetched user info:", data);
  }
  //fetchUserInfo();

  async function saveInfo() {
    if (fullName.trim() === "" || email.trim() === "") {
      alert("Udfyld venligst alle felter.");
      return;
    }
    // Save the user information to the database
    const { data, error } = await supabase
      .from("UserInfo")
      .update({
        full_name: fullName,
        profile_picture: icon
      }).eq("id", localStorage.getItem("userId"));
    
  
    // Save the information to localStorage or send it to the server
    localStorage.setItem("userFullName", fullName);
    // localStorage.setItem("userEmail", email);
    localStorage.setItem("userIcon", icon);
  }

  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl w-[650px] h-[70vh] z-30" open={showModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-40">
        <h1 className="text-2xl font-bold text-primary mb-4">Rediger personinformation</h1>
        <form>
          <div className="flex gap-2 mb-6">
            <IconOption setValue={setIcon} value={icon} icon="2" />
            <IconOption setValue={setIcon} value={icon} icon="3" />
            <IconOption setValue={setIcon} value={icon} icon="1" />
          </div>
          <InputField label="Fulde navn" id="full name" type="text" required value={fullName} setValue={setFullName} />
          <InputField label="Brugernavn (mail)" id="email" type="text" required value={email} setValue={setEmail} />
          <div className="flex gap-5 justify-center mb-3">
            <Button fullWidth type="button" text="Afbryd" variant="Cancel" onClick={() => setShowModal(false)} styling="px-5 text-xl h-10 pt-2" />
            <Button
              fullWidth
              type="submit"
              text="Gem"
              variant="Primary"
              styling="px-5 text-xl h-10 pt-2"
              onClick={() => {
                saveInfo();
                setShowModal(false);
              }}
            />
          </div>
          <Button
            fullWidth
            type="submit"
            text="Slet bruger"
            variant="InvertedCancel"
            styling="px-5 text-xl h-10 pt-2"
            onClick={() => {
              setShowModal(false);
              onDeleteUserClick();
            }}
          />
        </form>
      </div>
    </dialog>
  );
}
