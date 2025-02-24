export default function InputField({ id, label, type, variant, icon, required = false, setValue, value }) {
  return (
    <div className="mb-2">
      <label for={id} className="flex items-center font-manjari text-lg font-bold">
        {label}
        {icon && <img className="ml-2 mb-2" src={`../assets/${icon}.svg`} alt={icon} />}
      </label>
      <input
        className="w-full h-10 bg-alt-color mb-4 rounded-[10px] text-xl pl-3"
        id={id}
        name={id}
        value={value}
        type={type}
        required={required}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
      {variant === "password" && <div class="password-on" id={`${id}-button`} />}
    </div>
  );
}
