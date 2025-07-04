import "./App.css";
import Button from "./components/Button";
import LandingPageLayout from "./components/LandingPageLayout";
import BackgroundImage from "./components/BackgroundImage";

function App() {
  return (
    <LandingPageLayout>
      <BackgroundImage />
      <div className="mb-14 mt-2">
        <img src="assets/logo.svg" className="w-[268px] mb-9" alt="logo" />
        <h1 className="font-manjari text-center text-5xl text-primary font-bold">Aktivt Ansigt</h1>
      </div>
      <div className="flex w-[393px] gap-5">
        <Button text="Registrer" variant="Inverted" href="/opret-bruger" styling="text-3xl h-12" fullWidth />
        <Button text="Log ind" variant="Primary" href="/log-ind" styling="text-3xl h-12" fullWidth />
      </div>
    </LandingPageLayout>
  );
}

export default App;
