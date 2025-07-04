import React from "react";
import { useState } from "react";
import MenuItem from "./MenuItem";

export default function Menu({ color = "primary", visualSetting= "Standard" }) {
  const [openMenu, setOpenMenu] = useState(false);
  const isRight = visualSetting === "Højre" || false;

  return (
    <div>
      <button className={`fixed top-7 w-14 h-14 cursor-pointer z-10 ${isRight ? 'left-7' : 'right-7'}`} onClick={() => setOpenMenu(true)}>
        <img src={color === "primary" ? "/assets/burger-menu.svg" : "/assets/burger-menu-light.svg"} alt="x icon" className="w-full" />
      </button>
      {openMenu === true && (
        <div className={`fixed flex justify-center items-center h-screen w-screen my-0 mx-auto z-20 left-0 top-0 overflow-x-hidden bg-primary`}>
          <button className="absolute right-7 top-7 w-14 h-14 cursor-pointer" onClick={() => setOpenMenu(false)}>
            <img src="/assets/close-icon.svg" alt="x icon" className="w-full" />
          </button>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-14">
            <MenuItem text="Forside" icon="HomeIcon" href="/forside" />
            <MenuItem text="Mit program" icon="BookmarkIcon" href="/mit-program" />
            <MenuItem text="Opsæt mit program" icon="BuildIcon" href="/opsæt-mit-program" />
            <MenuItem text="Om os" icon="AboutUsIcon" href="/om-os" />
            <MenuItem text="Indstillinger" icon="SettingsIcon" href="/indstillinger" />
            <MenuItem text="Log ud" icon="ExitIcon" href="/logout" id="exit" />
          </div>
        </div>
      )}
    </div>
  );
}
