import Menu from "../components/Menu";
import TextSection from "../components/TextSection";

const AboutUs = () => {
  return (
    <main>
      <Menu color="alt" />
      <div className="grid grid-cols-[4fr_3fr] w-full">
        <div className="mx-16 grid gap-8 pt-10">
          <TextSection headline="Om os">
            <p>
              Center for Hjerneskade er en selvejende institution og et specialhospital, og er højt specialiseret inden for medfødte og erhvervede hjerneskader, hjernerystelser,
              udviklingsforstyrrelser og kognitive vanskeligheder hos børn, unge og voksne. Center for Hjerneskade er grundlagt i 1985 på Københavns Universitet som det første
              rehabiliteringscenter for voksne med hjerneskader i Danmark.
            </p>
          </TextSection>
          <TextSection headline="Træn ansigt">
            <div className="grid gap-4">
              <p>Træn ansigt er et øvelses program, der har til formål at bedre følgende, som kan opstå isoleret eller i kombination efter en skade i hjernen:</p>
              <ul className="list-disc list-inside">
                <li>Ansigtsmimikken efter ansigtslammelse (facialis parese).</li>
                <li>Kommunikationsevnen og det orale udtryk ved lammelse af taleorganerne (dysartri).</li>
                <li>Evnen til at spise bedre i forbindelse med tygge- og synkebesvær (dysfagi).</li>
              </ul>
              <p>
                App’en Træn Ansigt har sin oprindelse på Odense Universitetshospital tilbage i 2016, hvor ergoterapeuter som projekt udviklede træningsapp’en i samarbejde med
                eksterne udviklere. Projektet var kun midlertidigt finansieret, og det var derfor ikke muligt at fortsætte opdateringen og vedligeholdelsen af app’en til
                understøttelse af nye styresystemer på digitale platforme, hvorfor Træn Ansigt ikke var tilgængeligt eller kunne opdateres, når det var downloadet.
              </p>
              <p>
                Center for hjerneskade fik i 2022 lov af OUH og udviklerne til at genopfinde Træn Ansigt og videreudvikle den på ny. Det er lykkedes især med hjælp og viden fra OUH
                og ikke mindst de nye eksterne udviklere Zasia Meincke, Katrine Bang Nielsen og Simon Jørgensen, som har bistået Center for Hjerneskade i udviklingen.{" "}
              </p>
            </div>
          </TextSection>
          <TextSection headline="Tak">
            <p>
              Der skal lyde en stor tak til OUH for rettighederne til Træn Ansigt og for at give os lov til at videreføre app’en til gavn for mennesker med bl.a. nedsat
              ansigtsmimik. En særlig tak også til Trine Engdahl Poulsen fra OUH, som medvirker i alle videoklip i Træn Ansigt, og som har givet tilladelse til, at vi fortsat
              benytter hendes gode og tydelige illustrationer af øvelserne.
            </p>
          </TextSection>
          <div>
            <p className="font-thin text-lg">Udviklet i samarbejde med:</p>
            <div className="flex justify-between h-[80px]">
              <img src="assets/logo-text.svg" alt="Center for Hjerneskade logo" className="max-h-full py-2" />
              <img src="assets/kea-logo.svg" alt="København Erhvervsakademi logo" className="max-h-full py-2" />
              <img src="assets/ouh-logo.svg" alt="Odense Universitetshospital logo" className="max-h-full" />
            </div>
          </div>
        </div>
        <div className="bg-primary min-h-full pt-10"></div>
      </div>
    </main>
  );
};

export default AboutUs;
