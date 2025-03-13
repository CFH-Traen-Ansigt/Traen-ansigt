import Button from "./Button";
import RepititionButton from "./RepititionButton";

export default function TaskCard({ title, description, image, note, variant, cardId }) {
  return (
    <article class={variant}>
      <img src={`${image}`} alt={`${title}`} />
      <div class="text-container">
        <h3>{title}</h3>
        <h3 class="note">{note && `(${note})`}</h3>
        <p>{description}</p>
        <div>
          <RepititionButton cardId={cardId} variant={`repitition-button ${variant === "remove" ? "small-card" : "normal-card"}`} />
          <Button type="button" text="Tilføj" variant="Primary" icon="PlusIcon" styling={`pt-[2px] h-8 text-[20px] rounded-md `} iconStyling="w-[20px] h-[20px]" />
        </div>
      </div>
    </article>
  );
}
