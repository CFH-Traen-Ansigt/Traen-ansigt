import Button from "./Button";
export default function ProgramCard({ title = "Ansigtsprogram 1", description, image = "/assets/images/018.webp", duration, totalExercises, addShadow = false }) {
  return (
    <article className={`w-[264px] h-[440px] ${addShadow && "border-dashed border-2 border-secondary"}`}>
      <div className="w-[252px] m-auto">
        <img src={image} alt={`${title}`} className="w-full h-full object-cover" />
      </div>
      <div className="">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p>{description}</p>
        <div className="grid w-[252px] gap-2">
          <Button type="button" text="Rediger program" variant="Inverted" icon="EditIcon" styling="pt-1 h-8 text-xl rounded-md" iconStyling="w-[20px] h-[20px]" />
          <div className="flex gap-2 ">
            <Button type="button" text="Slet" variant="Cancel" icon="Trashcan" styling="pt-1 h-8 text-xl rounded-md" iconStyling="w-[20px] h-[20px]" />
            <Button type="button" text="Afspil" variant="Primary" icon="PlayIcon" styling="pt-1 h-8 text-xl rounded-md" iconStyling="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </article>
  );
}
