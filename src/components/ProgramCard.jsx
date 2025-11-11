import Button from "./Button";
export default function ProgramCard({
  title = "Ansigtsprogram 1",
  description = "Primære træningsprogram for ansigtsmuskulatur",
  image = "/assets/images/018.webp",
  duration = "5",
  totalExercises = "12",
  addShadow = false,
  onDelete,
  onPlay,
  onEdit,
}) {
  return (
    <article
      className={`relative w-[300px] min-h-[480px] ${
        addShadow &&
        "border-dashed border-[2px] border-secondary rounded-lg  cursor-pointer"
      } p-3 flex flex-col`}
    >
      {addShadow && (
        <div
          className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
          onClick={() => (window.location.href = "/opsæt-mit-program")}
        >
          <p className="text-secondary text-lg text-center font-bold">
            Tilføj nyt program
          </p>
          <img
            src="/assets/plus-circle.svg"
            alt="plus icon"
            className="w-1/6 m-auto"
          />
        </div>
      )}
      <div
        className={`relative group w-[240px] mx-auto ${addShadow && "opacity-40"}`}
      >
        {!addShadow && (
          <>
            {/* Grey overlay */}
            <div className="absolute inset-0 bg-black/5 z-4" onClick={onPlay} />

            {/* Play button */}
            <img
              src="/assets/play-btn-icon.svg"
              alt="Play button"
              className="absolute inset-0 m-auto w-12 h-12 z-5 filter brightness-0 invert-[50%] opacity-40 group-hover:opacity-100 transition"
              onClick={onPlay}
            />
          </>
        )}
        <img
          src={image}
          alt={`${title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`flex flex-col flex-grow w-[240px] mx-auto ${
          addShadow && "opacity-40"
        }`}
      >
        {" "}
        <h3 className="text-2xl font-bold pt-4">{title}</h3>
        <p className="font-light text-lg">{description}</p>
        <div className="mt-auto">
          <div className="flex justify-between w-full mt-4 mb-4">
            <div className="flex gap-2 items-center w-1/2 ">
              <img
                src="/assets/black-clock.svg"
                alt="clock icon"
                className="w-6"
              />{" "}
              <p className="font-light text-lg pt-2">{duration} min.</p>
            </div>
            <div className="flex gap-2 items-center w-1/2">
              <img
                src="/assets/dumbbell.svg"
                alt="dumbbell icon"
                className="w-6"
              />{" "}
              <p className="font-light text-lg pt-2">
                {totalExercises} Øvelser
              </p>
            </div>
          </div>
          <div className="grid gap-2 mt-4 w-full ">
            <Button
                type="button"
                text="Afspil"
                variant="Primary"
                icon="PlayIcon"
                styling="pt-[2px] h-8 text-[20px] rounded-md"
                iconStyling="w-[20px] h-[20px]"
                disabled={addShadow}
                fullWidth
                onClick={onPlay}
              />
           
            <div className="flex gap-2 ">
               <Button
              type="button"
              text="Rediger"
              variant="Inverted"
              icon="EditIcon"
              styling="pt-[2px] h-8 text-[20px] rounded-md"
              iconStyling="w-[20px] h-[20px] pl-1"
              disabled={addShadow}
              fullWidth
              onClick={onEdit}
            />
              <Button
                type="button"
                text="Slet"
                variant="Cancel"
                icon="Trashcan"
                styling="pt-[2px] h-8 text-[20px] rounded-md"
                iconStyling="w-[20px] h-[20px]"
                disabled={addShadow}
                fullWidth
                onClick={onDelete}
              />
              
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
