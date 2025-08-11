import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import RepititionButton from "./RepititionButton";

// make image dynamic by using the exerciseNo as a path to the image

export default function TaskCard({
  exerciseNo,
  title = "Løft brynene",
  image = "/assets/images/018.webp",
  withHelp = false,
  duration = 4,
  variant,
  tasks,
  setTasks,
  repititions,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
}) {
  const [numberOfRepititions, setNumberOfRepititions] = useState(
    repititions || 5
  );
  const [isSelected, setIsSelected] = useState(false);
  function addTask() {
    if (!tasks.some((e) => e.exerciseNo === exerciseNo)) {
      setTasks((old) =>
        old.concat([
          {
            exerciseNo: exerciseNo,
            title: title,
            image: image,
            withHelp: withHelp,
            repititions: numberOfRepititions,
            duration: duration,          
          },
        ])
      );
    }
  }
  useEffect(() => {
    setIsSelected(tasks && tasks.some((e) => e.exerciseNo === exerciseNo));
  }, [tasks, exerciseNo]);
  return (
    <div
      className={`${
        variant === "small" ? "flex gap-2 h-[125px]" : "flex gap-2"
      }`}
      draggable={variant === "small"}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {variant === "small" && (
        <img
          draggable={false}
          src="/assets/three-dots.svg"
          alt="dots icon"
          className="h-[41px] m-auto"
        />
      )}
      <article
        className={`${
          variant === "small"
            ? "w-[300px] h-[125px] px-2 py-2 cursor-pointer"
            : "min-w-[440px] max-w-[440px] max-h-[300px] px-4 py-4"
        } flex gap-2  rounded-md bg-main-color border-solid border-font-color border-1`}
      >
        <img
          draggable={false}
          className={`${
            variant === "small"
              ? "w-[107px] h-[107px] self-center"
              : "w-[153px] h-[153px]"
          } object-contain`}
          src={`${image}`}
          alt={`${title}`}
        />
        <div className="flex flex-col py-2 w-full pl-1">
          <h2
            style={
              variant === "small"
                ? {
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    wordBreak: "break-all", // or "break-all"
                  }
                : {}
            }
            className={`${
              variant === "small" ? "text-xl" : "text-2xl"
            } font-bold `}
          >
            {title}
          </h2>
          <h3 className="font-sm mb-2">{withHelp && "(med hjælp)"}</h3>
          <div className="flex items-center mt-auto justify-between w-full">
            <RepititionButton
              variant={variant}
              numberOfRepititions={
                repititions ? repititions : numberOfRepititions
              }
              setNumberOfRepititions={setNumberOfRepititions}
            />
            <Button
              key={isSelected}
              type="button"
              onClick={() => {
                if (variant === "small") {
                  setTasks((old) => {
                    const updatedTasks = old.filter(
                      (item) => item.exerciseNo !== exerciseNo
                    );
                    return [...updatedTasks];
                  });
                } else {
                  addTask();
                }
              }}
              text={variant === "small" ? "Fjern" : "Tilføj"}
              variant={
                variant === "small"
                  ? "Cancel"
                  : isSelected
                  ? "Inverted"
                  : "Primary"
              }
              icon={
                variant === "small"
                  ? "Trashcan"
                  : isSelected
                  ? "InvertedPlusIcon"
                  : "PlusIcon"
              }
              styling={` rounded-lg ${
                variant === "small"
                  ? "px-2 gap-1 h-7 text-[16px] pt-[3px]"
                  : "px-3 gap-2 h-8 text-[18px] pt-[3.5px]"
              }`}
              iconStyling={`w-[20px] h-[20px] ${
                variant === "small" && "mt-0 w-[16px]  h-[16px]"
              }`}
              disabled={isSelected}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
