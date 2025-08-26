import React from "react";
import { useState } from "react";
import EyeOpen from "../assets/eye-on.svg";
import EyeClosed from "../assets/eye-off.svg";

export default function InputField({ id, label, type, icon, required = false, setValue, value, onIconMouseOver }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="mb-2">
      <label for={id} className="flex items-center font-manjari text-lg font-bold">
        {label}
        {icon && <img className="ml-2 mb-2" src={`../assets/${icon}.svg`} alt={icon} onMouseOver={onIconMouseOver} />}
      </label>
      <div className="relative flex w-full">
        <input
          className="w-full py-2 bg-alt-color mb-4 rounded-[10px] text-xl pl-3"
          id={id}
          name={id}
          value={value}
          type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
          required={required}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
        {type === "password" && (
          <img
            src={isPasswordVisible ? EyeOpen : EyeClosed}
            onClick={() => setIsPasswordVisible((old) => !old)}
            id={`${id}-button`}
            className="absolute right-[5%] top-[35%] cursor-pointer -translate-y-1/2 m-0 w-6 h-6"
            alt="password icon "
          />
        )}
      </div>
    </div>
  );
}
