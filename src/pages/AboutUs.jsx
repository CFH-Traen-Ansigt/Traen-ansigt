import Menu from "../components/Menu";
import TextSection from "../components/TextSection";
import TimelineItem from "../components/TimeLineItem";

const AboutUs = () => {
  return (
    <main>
      <Menu color="alt" />
      <div className="grid grid-cols-[4fr_minmax(550px,_3fr)] w-full">
        <div className="mx-16 grid gap-8 pt-10 self-start">
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
                Center for Hjerneskade fik i 2022 lov af OUH og udviklerne til at genopfinde Træn Ansigt og videreudvikle den på ny. Det er lykkedes især med hjælp og viden fra OUH
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
        <div className="bg-primary h-full ">
          <div className="pt-10 relative flex justify-center aspect-540/1416 min-h-[1600px]">
            <img src="assets/timeline.svg" className="absolute min-w-[500px] bg-primary" alt="Tidslinje over udviklingen af app'en" />
            <TimelineItem icon="lightbulb.svg" text="Ideen om at lave en genoptræningsapp opstod" position="w-40 left-[20%]" iconWidth="w-20" />
            <TimelineItem
              icon="handshake.svg"
              text="Ideen får økonomisk opbakning fra EU struktur- og regionalfondsprojektet Gamelab4Health."
              position="w-48 top-[220px] right-[9%]"
            />
            <TimelineItem icon="old-app.svg" text="Odense Universitetshospital og Play APS, går sammen om at udvkle appen" position="w-48 top-[440px] left-[2%]" />
            <TimelineItem icon="hospital.svg" text="I januar 2016 udkom “Træn ansigt” appen på App Store" position="w-44 top-[620px] right-[2%]" iconWidth="w-20" />
            <TimelineItem
              icon="developer-team.svg"
              text="I 2024 re-designes “Træn ansigt” i et samarbejde med studerende på KEA og Center for Hjerneskade"
              position="w-[200px] top-[820px] left-[14%]"
              iconWidth="w-30"
            />
            <TimelineItem icon="developer-team-2.svg" text="Udviklingen af “Træn ansigt” som webapp finansieres." position="w-[150px] top-[1020px] right-[2%]" iconWidth="w-30" />
            <TimelineItem icon="new-app.svg" text="Udviklingen af “Træn ansigt” som webapp går i gang." position="w-[150px] top-[1230px] left-[6%]" iconWidth="w-30" />
            <TimelineItem icon="hospital.svg" text="“Træn ansigt” webapp bliver taget i brug." position="w-[150px] top-[1410px] right-[6%]" iconWidth="w-20" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
