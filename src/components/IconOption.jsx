export default function IconOption({ icon, value, setValue }) {
  return (
    <li className="w-28 flex justify-center">
      <input className="hidden" type="checkbox" name="choose_category" id={icon} value={icon} onChange={() => setValue(icon)} />
      <label className={`cursor-pointer grid place-items-center relative rounded-[100px] bg-[#FFDD40] ${value === icon && "border-secondary border-[4px]"}`} htmlFor={icon}>
        <img src={`assets/person-${icon}.svg`} alt={icon} width={200} height={200} />
      </label>
    </li>
  );
}
