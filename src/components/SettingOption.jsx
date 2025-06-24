import { supabase } from "../DB/supabaseClient";

export default function SettingOption({ optionText, iconOutOfFocus, iconInFocus, settingOption, setSettingOption }) {
  async function saveSetting(visualNeglectOption) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Failed to get user", error);
      return;
    }

    const userId = user.id;
    console.log("Setting to save:", visualNeglectOption);

    try {
      const { error } = await supabase.from("Settings").update({ visual_neglect: visualNeglectOption }).eq("user_id", userId);
    } catch (error) {
      console.error("Error saving program:", error);
    }
  }
  return (
    <button
      className={`${settingOption === optionText ? "bg-primary" : "bg-alt-color"} py-6 px-16 rounded-md`}
      onClick={() => {
        saveSetting(optionText);
        localStorage.setItem("visualNeglect", optionText);
        setSettingOption(optionText);
      }}
    >
      <p className={`${settingOption === optionText ? "text-alt-color" : "text-primary"} text-center text-xl mb-2 font-bold`}>{optionText}</p>
      <img src={`/assets/${settingOption === optionText ? iconInFocus : iconOutOfFocus}.svg`} alt={`${iconInFocus}`} className="max-w-20 mx-auto" />
    </button>
  );
}
