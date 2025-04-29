import React from "react";
import { useState } from "react";
import Menu from "../components/Menu";
import Button from "../components/Button";
import OptionCard from "../components/OptionCard";
import PersonalInfoModal from "../components/PersonalInfoModal";
import BackgroundImage from "../components/BackgroundImage";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const selectedIcon = "";
  const email = "";

  return (
    <main className="mx-14 max-w-full overflow-hidden">
      <BackgroundImage />
      <Menu />
      <PersonalInfoModal setShowModal={setShowModal} showModal={showModal} />
      <div className={`grid grid-cols-[minmax(250px,_400px)_1fr_1fr] mt-20 `}>
        <article className="flex flex-col border-r-solid border-r-alt-color border-r-4 h-[80vh] px-12">
          <div className="flex flex-col items-center gap-8 text-center mt-8">
            <img src={selectedIcon.length > 0 ? selectedIcon : "/assets/person-1.svg"} alt="profile icon" />
            <div>
              <h2 className="text-xl text-primary font-bold">Mail:</h2>
              <p className="text-xl text-font-color font-bold">{email ? email : ""}</p>
            </div>
          </div>
          <Button
            text="Rediger"
            onClick={() => setShowModal(true)}
            variant="Primary"
            icon="InvertedEditIcon"
            styling="text-2xl h-10 pt-[6px] w-auto mt-auto mb-3 gap-1"
            iconStyling="pt-[2px]"
          />
        </article>
        <div className="grid grid-cols-2 w-full gap-x-4 gap-y-10 col-span-2 my-auto min-w-[800px]">
          <OptionCard icon="/assets/bookmark-red-outline.svg" option="Mit program" text="Her finder du dine gemte programmer med udvalgte øvelser." href="/mit-program" />
          <OptionCard icon="/assets/build-red.svg" option="Opsæt mit program" text="Tryk for at komme i gang med at lave dit program." href="/opsæt-mit-program" />
          <OptionCard icon="/assets/about-us-red.svg" option="Om os" text="Her kan du finde information om organisationen og kontaktpersoner." />
          <OptionCard icon="/assets/settings-red.svg" option="Indstillinger" text="Under indstillinger kan du justere dine præferencer" />
        </div>
      </div>
    </main>
  );
};

export default Home;
