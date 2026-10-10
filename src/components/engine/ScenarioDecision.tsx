import { Check, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScenarioDecision as Decision } from "@/types";

interface Props {
  decision: Decision;
  choice?: string;
  onChoose: (id: string) => void;
}
export function ScenarioDecision({ decision, choice, onChoose }: Props) {
  const selected = decision.options.find((option) => option.id === choice);
  const accepted = selected?.id === decision.continueWith;
  return (
    <fieldset className="treatment-choice">
      <legend>{decision.question}</legend>
      <p>{decision.context}</p>
      <div className="treatment-options">
        {decision.options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={choice === option.id}
            onClick={() => {
              onChoose(option.id);
            }}
          >
            <strong>
              {option.title}
              {choice === option.id && accepted && <Check size={16} />}
            </strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
      <div
        className={cn("choice-feedback", accepted && "accepted")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Lightbulb size={17} />
        <div>
          <strong>
            {selected
              ? `${selected.title}: ${accepted ? "a justified response for these facts" : "consider the constraints"}`
              : "Pause and make a decision"}
          </strong>
          <p>
            {selected?.feedback ??
              "Playback and later steps wait here. Explore an option to see its implications, then choose the response used in this narrative."}
          </p>
        </div>
      </div>
    </fieldset>
  );
}
