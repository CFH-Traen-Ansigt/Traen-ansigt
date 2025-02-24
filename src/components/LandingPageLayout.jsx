export default function LandingPageLayout({ children }) {
  return (
    <main>
      <div className="m-10">
        <img src="/assets/logo-text.svg" alt="Center for Hjerneskade logo" />
      </div>
      <div className="flex h-full flex-col items-center ">{children}</div>
    </main>
  );
}
