import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

// Question text may contain inline LaTeX math delimited by $...$ (see the
// backend's LaTeX import format); everything else is rendered as plain text.
export function MathText({ text }: { text: string | null | undefined }) {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 1) {
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
