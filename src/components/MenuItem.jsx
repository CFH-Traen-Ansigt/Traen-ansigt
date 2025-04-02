import React from "react";
import { useState } from "react";

function getIcon(icon) {
  switch (icon) {
    case "HomeIcon":
      return { default: "/assets/home-icon.svg", hover: "/assets/home-filled-icon.svg" };
    case "BookmarkIcon":
      return { default: "/assets/bookmark-icon.svg", hover: "/assets/bookmark-filled-icon.svg" };
    case "BuildIcon":
      return { default: "/assets/build-icon.svg", hover: "/assets/build-filled-icon.svg" };
    case "AboutUsIcon":
      return { default: "/assets/about-us-icon.svg", hover: "/assets/about-us-filled-icon.svg" };
    case "SettingsIcon":
      return { default: "/assets/settings-icon.svg", hover: "/assets/settings-filled-icon.svg" };
    case "ExitIcon":
      return { default: "/assets/exit-icon.svg", hover: "/assets/exit-filled-icon.svg" };
    default:
  }
}
export default function MenuItem({ text, icon, href }) {
  const iconType = getIcon(icon);
  const [displayedIcon, setDisplayedIcon] = useState(icon && iconType.default);
  return (
    <button
      className="flex flex-col items-center justify-between cursor-pointer gap-5"
      onClick={() => {
        window.location.href = `${href}`;
      }}
      onMouseOver={() => icon && setDisplayedIcon(iconType.hover)}
      onMouseOut={() => icon && setDisplayedIcon(iconType.default)}
    >
      <div>
        <img src={displayedIcon} alt="icon" className={icon === "AboutUsIcon" && displayedIcon === "/assets/about-us-icon.svg" && "w-[150px]"} />
      </div>
      <p className="text-3xl text-main-color font-bold">{text}</p>
    </button>
  );
}
