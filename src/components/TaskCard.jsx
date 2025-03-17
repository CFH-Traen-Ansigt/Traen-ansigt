import Button from "./Button";
import RepititionButton from "./RepititionButton";

export default function TaskCard({
  title = "Løft brynene",
  description = "En øvelse til at styrke muskulaturen omkring øjnene",
  image = "/assets/images/018.webp",
  withHelp = false,
  variant,
  cardId,
}) {
  return (
    <article className="flex items-center gap-2 w-[420px] max-h-[300px] px-4 py-4 rounded-sm bg-main-color border-solid border-font-color border-1">
      <img className="w-[153px] h-[153px] object-contain" src={`${image}`} alt={`${title}`} />
      <div className="flex flex-col h-full items-stretch">
        <h2 className="font-bold text-2xl">{title}</h2>
        <h3 className="font-sm mb-2">{withHelp && "(med hjælp)"}</h3>
        <p className="font-light leading-[1.1]">{description}</p>
        <div className="flex items-center justify-between w-full mt-2">
          <RepititionButton />
          <Button type="button" text="Tilføj" variant="Primary" icon="PlusIcon" styling={`pt-[3.5px] h-8 text-[18px] gap-2 rounded-lg w-28`} iconStyling="w-[20px] h-[20px]" />
        </div>
      </div>
    </article>
  );
}
