import React from "react";
import { useState } from "react";
import ListItem from "./ListItem";
export default function TaskFiltering() {
  const [noseItemHovered, setNoseItemHovered] = useState(false);
  const [tongueItemHovered, setTongueItemHovered] = useState(false);
  const [foreheadItemHovered, setForeheadItemHovered] = useState(false);

  return (
    <ul className="fixed flex justify-center items-center mt-5 top-0 ml-[420px] z-2 ps-0  list-none">
      <ListItem itemName="Pande" onHover={setForeheadItemHovered} />
      <ListItem
        itemName="Øjne"
        listStyling={`border-y-0 border-x-[1px] border-x-primary border-solid ${noseItemHovered && "border-r-alt-color"} ${foreheadItemHovered && "border-l-alt-color"}`}
      />
      <ListItem itemName="Næse" onHover={setNoseItemHovered} />
      <ListItem
        itemName="Mund"
        listStyling={`border-y-0 border-x-[1px] border-primary border-solid ${tongueItemHovered && "border-r-alt-color"} ${noseItemHovered && "border-l-alt-color"}`}
      />
      <ListItem itemName="Tunge" onHover={setTongueItemHovered} />
    </ul>
  );
}
