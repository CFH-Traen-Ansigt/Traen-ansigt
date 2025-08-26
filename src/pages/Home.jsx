import { useState } from "react";
import Menu from "../components/Menu";
import Button from "../components/Button";
import OptionCard from "../components/OptionCard";
import PersonalInfoModal from "../components/modals/PersonalInfoModal";
import BackgroundImage from "../components/BackgroundImage";
//import DeleteUserModal from "../components/modals/DeleteUserModa";
const Home = () => {
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  //const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  

  const selectedIcon = localStorage.getItem("userIcon") ||1; // Default icon if not set
  const email = localStorage.getItem("userEmail") || "";
  const fullName = localStorage.getItem("userFullName") || "";

  return (
    <main className="mx-14 max-w-full overflow-hidden">
      <BackgroundImage />
      <Menu visualSetting={localStorage.getItem("visualNeglect")} />
      <PersonalInfoModal setShowModal={setShowPersonalInfoModal} showModal={showPersonalInfoModal} /*onDeleteUserClick={() => setShowDeleteUserModal(true)}*/ />
      {/* <DeleteUserModal setShowModal={setShowDeleteUserModal} showModal={showDeleteUserModal} /> */}
      <div className={`grid grid-cols-[minmax(250px,_400px)_1fr_1fr] mt-20 `}>
        <article className="flex flex-col border-r-solid border-r-alt-color border-r-4 h-[80vh] px-12">
          <div className="flex flex-col items-center gap-8 text-center mt-8">
            <img src={`/assets/person-${selectedIcon}.svg`} alt="profile icon" />
            <div>
              <h2 className="text-xl text-primary font-bold">Mail:</h2>
              <p className="text-xl text-font-color font-bold">{email ? email : ""}</p>
            </div>
            <div>
              <h2 className="text-xl text-primary font-bold">Navn:</h2>
              <p className="text-xl text-font-color font-bold">{fullName ? fullName : ""}</p>
            </div>
          </div>
          <Button
            text="Rediger"
            onClick={() => setShowPersonalInfoModal(true)}
            variant="Primary"
            icon="InvertedEditIcon"
            styling="text-2xl h-10 pt-[6px] w-auto mt-auto mb-3 gap-1"
            iconStyling="pt-[2px] w-5 h-5"
          />
        </article>
        <div className="grid grid-cols-2 w-full gap-x-4 gap-y-10 col-span-2 my-auto min-w-[800px]">
          {localStorage.getItem("isAdmin") === "false" && (
          <>
          <OptionCard icon="/assets/bookmark-red-outline.svg" option="Mit program" text="Her finder du dine gemte programmer med udvalgte øvelser." href="/mit-program" />
          <OptionCard icon="/assets/build-red.svg" option="Opsæt mit program" text="Tryk for at komme i gang med at lave dit program." href="/opsæt-mit-program" />
          <OptionCard icon="/assets/about-us-red.svg" option="Om os" text="Her kan du finde information om organisationen og kontaktpersoner." href="/om-os" />
          <OptionCard icon="/assets/settings-red.svg" option="Indstillinger" text="Under indstillinger kan du justere dine præferencer" href="/indstillinger" />
          </>
          )}
          {localStorage.getItem("isAdmin") === "true" && (  
          <OptionCard icon="/assets/settings-red.svg" option="Admin" text="Admin." href="/admin" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
