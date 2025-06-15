import React from "react";
import { useState } from "react";

export default function SettingItem({ type, image, imageOnHover, text, altText, onClick }) {
  const [itemState, setItemState] = useState("default");
  return (
    <button
      className={`w-[290px] h-[260px] bg-main-color cursor-pointer border-4 border-solid ${
        itemState === "default" ? "border-main-color" : "border-primary"
      } rounded-lg flex flex-col justify-center items-center px-4 gap-3`}
      onMouseOver={() => setItemState("hover")}
      onMouseOut={() => setItemState("default")}
      onClick={onClick}
    >
      <img src={itemState === "default" ? image : imageOnHover} alt={altText} />
      <p className="text-primary text-3xl font-bold pt-4">
        {text}
        {type === "toggle" && <span>til</span>}
        {type === "toggle2" && <span>til</span>}
      </p>
    </button>
  );
}
