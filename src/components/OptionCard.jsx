export default function OptionCard({ icon, option, text, href }) {
  return (
    <a className="relative w-full cursor-pointer" href={href}>
      <p className="max-w-80 text-lg mx-auto">{text}</p>
      <img className="absolute mx-auto left-16 w-16" src="assets/arrow.svg" alt="arrow icon" />
      <img className="mx-auto pt-3 pb-8" src={icon} alt={icon} />
      <h2 className="text-3xl text-primary text-center font-bold">{option}</h2>
    </a>
  );
}
