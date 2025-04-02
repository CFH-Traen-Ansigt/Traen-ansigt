import React from "react";
import ProgramCard from "../components/ProgramCard";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <main>
      <Menu />
      <ProgramCard addShadow />
    </main>
  );
};

export default Home;
