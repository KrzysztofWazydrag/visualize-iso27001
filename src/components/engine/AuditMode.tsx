import { useState } from "react";
import { ArrowRight, Eye, ClipboardCheck, FileCheck2, Lightbulb, ChevronRight } from "lucide-react";
import { auditPrompts } from "@/data/audit";
import { controls } from "@/data/controls";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface Props {
  onSelect: (id: string) => void;
}
export function AuditMode({ onSelect }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const prompt = auditPrompts[promptIndex];
  const control = controls.find((c) => c.id === prompt.controlId);
  return (
    <div className="audit-mode">
      <div className="audit-chain">
        <span>
          <ClipboardCheck size={18} /> Control
        </span>
        <ArrowRight size={16} />
        <span>Implementation</span>
        <ArrowRight size={16} />
        <span>Evidence</span>
        <ArrowRight size={16} />
        <span>Assurance</span>
      </div>
      <div className="audit-selector" aria-label="Choose an evidence exercise">
        {auditPrompts.map((p, index) => (
          <button
            key={p.id}
            className={cn(index === promptIndex && "active")}
            aria-pressed={index === promptIndex}
            onClick={() => {
              setPromptIndex(index);
              setRevealed(false);
              onSelect(p.controlId);
            }}
          >
            {p.controlId}
          </button>
        ))}
      </div>
      <div className="audit-question">
        <span className="eyebrow">EVIDENCE EXERCISE · {control?.title}</span>
        <h2>{prompt.question}</h2>
        <p>
          Take a moment to think about what would support the claim. Then explore what different evidence can—and
          cannot—tell you.
        </p>
        <div className="implementation-claim">
          <span>THE IMPLEMENTATION CLAIM</span>
          <p>{prompt.implementation}</p>
        </div>
        <Button
          onClick={() => {
            setRevealed((value) => !value);
          }}
          variant={revealed ? "outline" : "default"}
        >
          <Eye size={16} />
          {revealed ? "Hide evidence examples" : "Reveal evidence examples"}
          <ChevronRight size={15} />
        </Button>
      </div>
      {revealed && (
        <div className="evidence-reveal" aria-live="polite">
          <span className="eyebrow">BUILD THE EVIDENCE CHAIN</span>
          {prompt.evidence.map((e, index) => (
            <div className="evidence-row" key={e.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.explanation}</p>
              </div>
              <FileCheck2 size={20} />
            </div>
          ))}
          <div className="assurance-note">
            <ClipboardCheck size={21} />
            <div>
              <h3>From evidence to assurance</h3>
              <p>{prompt.assurance}</p>
            </div>
          </div>
          <div className="audit-pitfall">
            <Lightbulb size={18} />
            <p>{prompt.pitfall}</p>
          </div>
        </div>
      )}
    </div>
  );
}
