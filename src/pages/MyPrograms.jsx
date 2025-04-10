import Menu from "../components/Menu";
import ProgramCard from "../components/ProgramCard";
const MyPrograms = () => {
  return (
    <main className="mx-20 my-12">
      <Menu />
      <div className="pb-10 border-b-4 border-b-solid border-b-alt-color max-w-[1100px]">
        <h1 className="text-font-color font-bold text-3xl">Dine gemte programmer</h1>
        <p className="text-font-color text-xl my-3">Disse programmer er nogle du eller din tilknyttede terapeut tidligere har sammensat.</p>
        <div className="grid grid-cols-3 gap-6 w-full">
          <ProgramCard addShadow />
          <ProgramCard />
        </div>
      </div>
    </main>
  );
};

export default MyPrograms;
