import React from "react";
import { useState } from "react";
import Menu from "../components/Menu";
import Button from "../components/Button";
import OptionCard from "../components/OptionCard";
import PersonalInfoModal from "../components/PersonalInfoModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const selectedIcon = "";
  const name = "";
  const email = "";
  const signedUpDate = "";
  return (
    <main className="mx-20">
      <Menu />
      <PersonalInfoModal setShowModal={setShowModal} showModal={showModal} />
      <div className={`grid grid-cols-3 mt-20 `}>
        <article className="flex flex-col border-r-solid border-r-alt-color border-r-4 h-[80vh] px-12">
          <div className="flex flex-col items-center gap-8 text-center mt-8">
            <img src={selectedIcon.length > 0 ? selectedIcon : "/assets/person-1.svg"} alt="profile icon" />
            <h1 className="text-3xl font-bold">{name ? name : ""}</h1>
            <div>
              <h2 className="text-xl text-primary font-bold">Mail:</h2>
              <p className="text-xl text-font-color font-bold">{email ? email : ""}</p>
            </div>
            <div>
              <h2 className="text-xl text-primary font-bold">Oprettelsesdato:</h2>
              <p className="text-xl text-font-color font-bold">{signedUpDate ? signedUpDate : ""}</p>
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
        <div className="grid grid-cols-2 w-full gap-x-4 gap-y-10 col-span-2 my-auto">
          <OptionCard icon="/assets/bookmark-red-outline.svg" option="Mine programmer" text="Her finder du dine gemte programmer med udvalgte øvelser." href="/mine-programmer" />
          <OptionCard icon="/assets/build-red.svg" option="Opsæt mit program" text="Tryk for at komme i gang med at lave dit program." href="/opsæt-mit-program" />
          <OptionCard icon="/assets/about-us-red.svg" option="Om os" text="Her kan du finde information om organisationen og kontaktpersoner." />
          <OptionCard icon="/assets/settings-red.svg" option="Indstillinger" text="Under indstillinger kan du justere dine præferencer" />
        </div>
      </div>
    </main>
  );
};

export default Home;
