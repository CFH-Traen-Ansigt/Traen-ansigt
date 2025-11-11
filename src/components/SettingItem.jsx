import React from "react";
import { useState, useEffect} from "react";

export default function SettingItem({ type, icon, iconOnHover, settingIsOn, text, altText, onClick }) {
  const [itemState, setItemState] = useState("default");

   // Reset itemState to "default" whenever settingIsOn changes
  useEffect(() => {
    setItemState("default");
  }, [settingIsOn]);

  return (
    <button
      className={`w-[290px] h-[260px] bg-main-color cursor-pointer border-4 border-solid ${
        !settingIsOn && itemState === "default" ? "border-main-color" : "border-primary"
      } rounded-lg flex flex-col justify-center items-center px-4 gap-3`}
      onMouseOver={() => setItemState("hover")}
      onMouseOut={() => setItemState("default")}
      onClick={onClick}
    >
      <img src={!settingIsOn && itemState === "default" ? icon : iconOnHover} alt={altText} />
      <p className="text-primary text-3xl font-bold pt-4">
        {text}
        {settingIsOn ? <span>til</span> : settingIsOn === false ? <span>fra</span> : ""}
      </p>
    </button>
  );
}
