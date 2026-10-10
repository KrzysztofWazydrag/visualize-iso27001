import { ArrowRight, Route } from "lucide-react";
import { nodeById } from "@/data/nodes";
import type { LearningPath } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  path: LearningPath;
  onSelect: (id: string) => void;
  selected?: string;
  compact?: boolean;
}
export function TreatmentTrail({ path, onSelect, selected, compact = false }: Props) {
  return (
    <section className={cn("treatment-trail", compact && "compact")} aria-label={path.title}>
      <h3>
        <Route size={16} /> {path.title}
      </h3>
      <p>{path.description}</p>
      <ol>
        {path.steps.map(({ nodeId, label }, index) => (
          <li key={nodeId}>
            <button
              type="button"
              aria-pressed={selected === nodeId}
              onClick={() => {
                onSelect(nodeId);
              }}
            >
              <span className="trail-number">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{nodeById[nodeId].title}</strong>
                <small>{label}</small>
              </span>
              <ArrowRight size={13} />
            </button>
          </li>
        ))}
      </ol>
      <p className="trail-note">{path.note}</p>
    </section>
  );
}
