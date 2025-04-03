import Menu from "../components/Menu";

const AboutUs = () => {
  return (
    <main className="mx-20">
      <Menu />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h1>Om os</h1>
          <p>Denne app er en redesignet udgave af "træn ansigt" appen, udviklet af odense universitetshospital.</p>
          <p>Appens primære formål er at assistere i genoptræningen af ansigtsmuskulatur og taletydelighed hos borgere med funktionsnedsættelse.</p>
          <p>Appen er udviklet af 3 multimediedesign-studerende på KEA i samarbejde med Center for Hjerneskade og Hillerød Hospital</p>
          <h2>Tværfaglighed</h2>
          <p>
            Målet med appen har været at samle tværfaglig viden i sundhedssektoren på en platform for at kunne supplere genoptræningsforløb hos Logopæder, Ergoterapeuter og
            Fysioterapeuter.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
