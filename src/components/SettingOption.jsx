export default function SettingOption({ optionText, optionIcon }) {
  return (
    <div className="bg-alt-color py-6 px-20 rounded-md">
      <p className="text-center text-xl mb-2 font-bold">{optionText}</p>
      <img src={`/assets/${optionIcon}.svg`} alt={`${optionIcon}`} className="w-24" />
    </div>
  );
}
