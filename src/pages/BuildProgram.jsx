import React from "react";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import ProgramModal from "../components/ProgramModal";
import Button from "../components/Button";
import { useState } from "react";
import TaskFiltering from "../components/TaskFiltering";

const BuildProgram = () => {
  const [isListEmpty, setIsListEmpty] = useState(true);
  return (
    <main>
      <Menu />
      <TaskFiltering />
      <ProgramModal />
      <div className="fixed text-center top-0 left-0 w-[400px] py-10 h-screen bg-alt-color border-r-[5px] border-r-primary border-solid">
        <h1 className="text-3xl font-bold">Dit program</h1>
        <div className={`mx-8 ${!isListEmpty && "hidden"}`}>
          <h2 className="text-sm ">Når du har valgt nogle øvelser, vil de blive vist her.</h2>
          <div className="text-start mt-12">
            <p className="text-primary font-light mb-2">Sådan gør du:</p>
            <ol className="flex flex-col gap-2 list-decimal mx-4 font-light text-sm">
              <li>Udvælg de øvelser du gerne vil have i dit program</li>
              <li>Vælg hvor mange repetitioner du gerne vil have af den pågældende øvelse</li>
              <li>Tilføj øvelsen ved at trykke på "tilføj"-knappen</li>
              <li>Gem eller afspil dit program</li>
            </ol>
          </div>
        </div>
        <div class="program-list">
          <template class="small-exercise-card">
            <article class="remove">
              <img src="" alt="øvelsesbillede" />
              <div class="content-container">
                <div class="text">
                  <h3></h3>
                  <h3></h3>
                  <p class="description"></p>
                </div>
              </div>
            </article>
            <div class="divider"></div>
          </template>
        </div>
        {!isListEmpty && (
          <div class="buttons">
            <Button type="button" text="Gem" />
            <Button type="button" text="Afspil" icon="PlayIcon" />
          </div>
        )}
      </div>

      <TaskList headline="Pande" description="Disse øvelser fokusere på området omkring panden" />
      <TaskList headline="Øjne" description="Disse øvelser fokusere på øjnene" />
      <TaskList headline="Næse" description="Disse øvelser fokusere på området omkring næsen" />
      <TaskList headline="Kinder og mund" description="Disse øvelser fokusere på området omkring kinderne og munden" />

      <TaskList divider={false} headline="Tunge" description="Disse øvelser fokusere på tungen" />
    </main>
  );
};

export default BuildProgram;
