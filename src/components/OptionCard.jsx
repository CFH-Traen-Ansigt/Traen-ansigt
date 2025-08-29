import { useState } from "react";

export default function OptionCard({ icon, option, text, href }) {

  const [videoText] = useState(
      JSON.parse(localStorage.getItem("videoText")) || false
    );

  return (
    <a className="relative ml-3 cursor-pointer" href={href}>
      <p className="max-w-80 text-lg mx-auto">{text}</p>
      {videoText && <img className="absolute mx-auto left-8 w-12" src="assets/arrow.svg" alt="arrow icon" />}
      <img className="mx-auto pt-3 pb-8" src={icon} alt={icon} />
      <h2 className="text-3xl text-primary text-center font-bold">{option}</h2>
    </a>
  );
}
