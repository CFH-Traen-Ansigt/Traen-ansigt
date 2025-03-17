import React from "react";
import { useState } from "react";
export default function RepititionButton() {
  const [numberOfRepititions, setNumberOfRepititions] = useState(0);
  return (
    <div className="flex items-center gap-1">
      <button
        className="flex items-center justify-center h-7 w-4 bg-alt-color cursor-pointer  rounded-sm"
        onClick={() => {
          if (numberOfRepititions > 0) {
            setNumberOfRepititions((old) => old - 1);
          }
        }}
      >
        <img className="py-[3px] px-[2px]" src="/assets/minus-black.svg" alt="minus icon" />
      </button>
      <div className="flex items-center justify-center w-[37px] h-[37px] bg-alt-color rounded-md">
        <p className="font-bold mt-[5px] text-lg">{numberOfRepititions}</p>
      </div>
      <button className="flex items-center justify-center  bg-alt-color h-7 w-4 cursor-pointer rounded-sm" onClick={() => setNumberOfRepititions((old) => old + 1)}>
        <img className="py-[3px] px-[2px]" src="/assets/plus-black.svg" alt="plus icon" />
      </button>
    </div>
  );
}
