import React from "react";
import { useState } from "react";
import Button from "./Button";
import RepititionButton from "./RepititionButton";

export default function TaskCard({
  exerciseNo,
  title = "Løft brynene",
  image = "/assets/images/018.webp",
  withHelp = false,
  variant,
  description = variant !== "small" ? "En øvelse til at styrke muskulaturen omkring øjnene" : "",
  tasks,
  setTasks,
  repititions,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
}) {
  const [numberOfRepititions, setNumberOfRepititions] = useState(repititions || 0);

  function addTask() {
    if (!tasks.some((e) => e.exerciseNo === exerciseNo)) {
      setTasks((old) => old.concat([{ exerciseNo: exerciseNo, title: title, description: description, image: image, withHelp: withHelp, repititions: numberOfRepititions }]));
    }
  }
  return (
    <article
      draggable={variant === "small"}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={`${
        variant === "small" ? "w-[300px] h-[125px] px-2 pt-3 pb-1" : "w-[420px] max-h-[300px] px-4 py-4"
      } flex gap-2  rounded-md bg-main-color border-solid border-font-color border-1`}
    >
      <img className={`${variant === "small" ? "w-[107px] h-[107px] self-center" : "w-[153px] h-[153px]"} object-contain`} src={`${image}`} alt={`${title}`} />
      <div className="flex flex-col py-2 w-full pl-1">
        <h2 className={`${variant === "small" ? "text-xl" : "text-2xl"} font-bold `}>{title}</h2>
        <h3 className="font-sm mb-2">{withHelp && "(med hjælp)"}</h3>
        <p className="font-light leading-[1.1]">{description}</p>
        <div className="flex items-center mt-auto justify-between w-full">
          <RepititionButton variant={variant} numberOfRepititions={numberOfRepititions} setNumberOfRepititions={setNumberOfRepititions} />
          <Button
            type="button"
            onClick={() => {
              if (variant === "small") {
                setTasks((old) => old.filter((item) => item.exerciseNo !== exerciseNo));
              } else {
                addTask();
              }
            }}
            text={variant === "small" ? "Fjern" : "Tilføj"}
            variant={variant === "small" ? "Cancel" : "Primary"}
            icon={variant === "small" ? "Trashcan" : "PlusIcon"}
            styling={` rounded-lg ${variant === "small" ? "w-[80px] gap-1 h-7 text-[16px] pt-[3px]" : "w-[94px] gap-2 h-8 text-[18px] pt-[3.5px]"}`}
            iconStyling={`w-[20px] h-[20px] ${variant === "small" && "mt-0"}`}
          />
        </div>
      </div>
    </article>
  );
}
