export default function BackgroundImage() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[-1]">
      <img src="/assets/images/bg-til-landing-optimized.webp" alt="smilende person" className="w-full h-full object-cover grayscale-[1] opacity-[0.5]" />
    </div>
  );
}
