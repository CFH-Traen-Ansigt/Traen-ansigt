export default function TextSection({ headline, children }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">{headline}</h2>
      {children}
    </div>
  );
}
