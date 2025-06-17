export default function TimelineItem({ icon, text, position, iconWidth = "w-[70%]" }) {
  return (
    <div className={`absolute ${position} flex flex-col gap-2 `}>
      <img src={`assets/${icon}`} className={`m-auto ${iconWidth}`} alt="timeline icon" />
      <p className="text-alt-color text-center font-light">{text}</p>
    </div>
  );
}
