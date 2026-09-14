// Client-side mirror of the backend's \begin{multi}{ID}...\end{multi} parser
// (app/services/question_bank/latex_import.py) — used only to drive the live
// preview pane; the backend remains the source of truth on save.

export interface ParsedMultiQuestion {
  latexId: string;
  prompt: string;
  choices: string[];
  correctIndices: number[];
}

export function parseMultiEnvironment(latex: string): ParsedMultiQuestion | null {
  const multiMatch = /\\begin\{multi\}\{([^}]*)\}([\s\S]*?)\\end\{multi\}/.exec(latex || "");
  if (!multiMatch) return null;

  const latexId = multiMatch[1].trim();
  const body = multiMatch[2];

  const firstItemIndex = body.search(/\\item/);
  if (firstItemIndex === -1) return null;

  const prompt = body.slice(0, firstItemIndex).trim();
  if (!prompt) return null;

  const itemsBody = body.slice(firstItemIndex);
  const itemRe = /\\item(\*)?[ \t]*([\s\S]*?)(?=\\item|$)/g;
  const choices: string[] = [];
  const correctIndices: number[] = [];
  let match: RegExpExecArray | null;
  while ((match = itemRe.exec(itemsBody)) !== null) {
    const text = match[2].split(/\s+/).filter(Boolean).join(" ");
    if (!text) continue;
    if (match[1]) correctIndices.push(choices.length);
    choices.push(text);
  }

  if (choices.length === 0 || correctIndices.length === 0) return null;

  return { latexId, prompt, choices, correctIndices };
}
