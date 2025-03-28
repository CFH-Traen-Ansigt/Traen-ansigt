import React from "react";
import { useState } from "react";

let configuration = {
  textColor: "text-main-color",
  backgroundColor: "bg-secondary",
  borderColor: "border-secondary",
  hoverTextColor: "hover:text-secondary",
  hoverBackground: "hover:bg-main-color",
  hoverBorder: "hover:border-main-color",
};

function getConfiguration(type) {
  switch (type) {
    case "Primary":
      configuration.textColor = "text-main-color";
      configuration.backgroundColor = "bg-secondary";
      configuration.borderColor = "border-secondary";
      configuration.hoverTextColor = "hover:text-secondary";
      configuration.hoverBackground = "hover:bg-main-color";
      configuration.hoverBorder = "hover:border-secondary";
      break;
    case "Inverted":
      configuration.textColor = "text-secondary";
      configuration.backgroundColor = "bg-main-color";
      configuration.borderColor = "border-secondary";
      configuration.hoverTextColor = "hover:text-main-color";
      configuration.hoverBackground = "hover:bg-secondary";
      configuration.hoverBorder = "hover:border-secondary-color";
      break;
    case "Cancel":
      configuration.textColor = "text-main-color";
      configuration.backgroundColor = "bg-primary";
      configuration.borderColor = "border-primary";
      configuration.hoverTextColor = "hover:text-primary";
      configuration.hoverBackground = "hover:bg-main-color";
      configuration.hoverBorder = "hover:border-primary";
      break;
    default:
  }
  return configuration;
}
function getIcon(icon) {
  switch (icon) {
    case "Trashcan":
      return { default: "/assets/trashcan-white.svg", hover: "/assets/trashcan-red.svg" };
    case "PlayIcon":
      return { default: "/assets/play-icon-white.svg", hover: "/assets/play-icon-green.svg" };
    case "EditIcon":
      return { default: "/assets/edit-green.svg", hover: "/assets/edit-white.svg" };
    case "PlusIcon":
      return { default: "/assets/plus-icon-white.svg", hover: "/assets/plus-icon-green.svg" };
    case "Bookmark":
      return { default: "/assets/bookmark-filled-icon.svg", hover: "/assets/bookmark-green.svg" };
    default:
  }
}

export default function Button({ text, href, variant, styling, type = "button", onClick, icon, iconStyling, disabled = false }) {
  const iconType = getIcon(icon);
  const [displayedIcon, setDisplayedIcon] = useState(icon && iconType.default);
  const configuration = getConfiguration(variant);
  return (
    <button
      onClick={() => {
        if (href) {
          window.location.href = `${href}`;
        } else if (onClick) {
          onClick();
        }
      }}
      onMouseOver={() => icon && !disabled && setDisplayedIcon(iconType.hover)}
      onMouseOut={() => icon && !disabled && setDisplayedIcon(iconType.default)}
      className={`flex justify-center  h-12 w-full py-2 font-manjari  ${configuration.textColor} ${configuration.backgroundColor}  border-[2px] rounded-lg ${
        configuration.borderColor
      } ${!disabled && configuration.hoverTextColor} ${!disabled && configuration.hoverBackground} ${!disabled && configuration.hoverBorder} ${styling}`}
      type={type}
    >
      <p>{text}</p>
      {icon && <img src={displayedIcon} alt={icon} className={`${iconStyling} ml-1 mt-[1.3px]`} />}
    </button>
  );
}
