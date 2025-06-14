import Menu from "../components/Menu";
import SettingItem from "../components/SettingItem";
const Settings = () => {
  return (
    <main className="bg-alt-color h-screen">
      <Menu />
      <h1 className="text-font-color font-bold text-3xl text-center py-16">Indstillinger</h1>
      <div className="flex justify-center">
        <SettingItem text="Synsvanskeligheder" image="/assets/eye-icon.svg" imageOnHover="/assets/eye-icon-filled.svg" altText="eye icon" type="pop-up" />
      </div>
    </main>
  );
};

export default Settings;
