import "./App.css";
import Button from "./components/Button";
import LandingPageLayout from "./components/LandingPageLayout";

function App() {
  return (
    <LandingPageLayout>
      <div className="mb-14">
        <img src="assets/logo.svg" className="w-[271px] mb-9" alt="logo" />
        <h1 className="font-manjari text-center text-5xl text-primary font-bold">Aktivt Ansigt</h1>
      </div>
      <div className="flex w-96 gap-5">
        <Button text="Registrer" variant="Inverted" href="/opret-bruger" styling="text-3xl" />
        <Button text="Log ind" variant="Primary" href="/log-ind" styling="text-3xl" />
      </div>
    </LandingPageLayout>
  );
}

export default App;
