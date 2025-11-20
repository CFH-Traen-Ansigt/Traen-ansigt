export default function RepititionButton({
  variant,
  numberOfRepititions,
  setNumberOfRepititions,
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        className="flex items-center justify-center h-7 w-4 bg-alt-color cursor-pointer  rounded-sm"
        onClick={() => {
          console.log(numberOfRepititions);
          if (numberOfRepititions > 5) {
            setNumberOfRepititions((old) => old - 5);
          }
        }}
      >
        <img
          className="py-[3px] px-[2px]"
          src="/assets/minus-black.svg"
          alt="minus icon"
        />
      </button>
      <div
        className={`flex items-center justify-center ${
          variant === "small" ? "w-[30px] h-[30px]" : "w-[37px] h-[37px]"
        } bg-alt-color rounded-md`}
      >
        <p className="font-bold mt-[5px] text-lg">{numberOfRepititions}</p>
      </div>
      <button
        className="flex items-center justify-center  bg-alt-color h-7 w-4 cursor-pointer rounded-sm"
        onClick={() => setNumberOfRepititions((old) => old + 5)}
      >
        <img
          className="py-[3px] px-[2px]"
          src="/assets/plus-black.svg"
          alt="plus icon"
        />
      </button>
    </div>
  );
}
