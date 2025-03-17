import React from "react";
import { useState } from "react";

export default function ListItem({ itemName, listStyling, onHover }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      className="text-xl font-thin bg-alt-color hover:bg-primary visited:text-font-color pt-[15px] pb-[10px]"
      onMouseOver={() => {
        onHover && onHover(true);
        setIsHovered(true);
      }}
      onMouseOut={() => {
        onHover && onHover(false);
        setIsHovered(false);
      }}
    >
      <a href={`#${itemName}`} className={`h-6 px-12 ${isHovered ? "text-main-color" : "text-text-color"} ${listStyling}`}>
        {itemName}
      </a>
    </li>
  );
}
