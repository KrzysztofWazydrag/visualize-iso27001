import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronDown, FileText, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nodeById } from "@/data/nodes";
import { snapshotAt, firstUnresolvedDecision } from "@/lib/playback";
import { ScenarioDecision } from "./ScenarioDecision";
import type { Scenario } from "@/types";
interface Props {
  scenario: Scenario;
  stepIndex: number;
  playing: boolean;
  onMove: (direction: -1 | 1) => void;
  onRestart: () => void;
  onToggle: () => void;
  speed: number;
  onSpeed: (value: number) => void;
  onJump: (index: number) => void;
  choices: Record<string, string>;
  onChoose: (id: string) => void;
}
export function ScenarioPlayer({
  scenario,
  stepIndex,
  playing,
  onMove,
  onRestart,
  onToggle,
  speed,
  onSpeed,
  onJump,
  choices,
  onChoose,
}: Props) {
  const step = scenario.steps[stepIndex];
  const phases = [...new Set(scenario.steps.map((s) => s.phase))];
  const changes = snapshotAt(scenario, stepIndex, choices);
  const gate = firstUnresolvedDecision(scenario, choices);
  const blocked = stepIndex >= gate;
  return (
    <>
      <div className="scenario-story" aria-live="polite" aria-atomic="true">
        <div className="story-number">{String(step.order).padStart(2, "0")}</div>
        <div>
          <span className="eyebrow">
            {step.phase} <ArrowRight size={12} /> {step.packet}
          </span>
          <h2>{step.title}</h2>
          <p>{step.explanation}</p>
        </div>
      </div>
      {step.decision && <ScenarioDecision decision={step.decision} choice={choices[step.id]} onChoose={onChoose} />}
      <div className="phase-progress" aria-label="Scenario phases">
        {phases.map((phase) => {
          const first = scenario.steps.findIndex((s) => s.phase === phase);
          const completed = scenario.steps.findLastIndex((s) => s.phase === phase) < stepIndex;
          return (
            <button
              key={phase}
              className={cn(step.phase === phase && "current", completed && "complete")}
              disabled={first > gate}
              title={first > gate ? "Complete the treatment decision first" : undefined}
              onClick={() => {
                onJump(first);
              }}
            >
              {completed ? <Check size={12} /> : <span className="phase-dot" />}
              {phase}
            </button>
          );
        })}
      </div>
      <div className="player-controls">
        <div className="transport">
          <Button variant="ghost" size="icon" aria-label="Restart scenario" onClick={onRestart}>
            <RotateCcw />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous step"
            disabled={stepIndex === 0}
            onClick={() => {
              onMove(-1);
            }}
          >
            <SkipBack />
          </Button>
          <Button className="play-button" onClick={onToggle} disabled={blocked}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? "Pause" : stepIndex === scenario.steps.length - 1 ? "Replay" : "Play"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next step"
            disabled={stepIndex === scenario.steps.length - 1 || blocked}
            onClick={() => {
              onMove(1);
            }}
          >
            <SkipForward />
          </Button>
        </div>
        <span className="step-counter">
          Step <strong>{stepIndex + 1}</strong> / {scenario.steps.length}
        </span>
        <label className="speed-label">
          Speed
          <select
            value={speed}
            onChange={(event) => {
              onSpeed(Number(event.target.value));
            }}
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </label>
      </div>
      <div className="step-scrubber" aria-label="Jump to a scenario step">
        {scenario.steps.map((s, index) => (
          <button
            key={s.id}
            className={cn(index <= stepIndex && "visited", index === stepIndex && "current")}
            title={`Step ${index + 1}: ${s.title}`}
            aria-label={`Go to step ${index + 1}: ${s.title}`}
            aria-current={index === stepIndex ? "step" : undefined}
            disabled={index > gate}
            onClick={() => {
              onJump(index);
            }}
          />
        ))}
      </div>
      {blocked && (
        <p className="decision-gate-note">
          Choose a justified treatment to continue. Each option has feedback for this example.
        </p>
      )}
      <p className="scenario-takeaway">
        <span>THE CONNECTION</span>
        {step.takeaway}
      </p>
      <details className="artefact-ledger">
        <summary>
          <FileText size={15} />
          <span>Follow the information</span>
          <small>{changes.length} recorded changes</small>
          <ChevronDown size={14} />
        </summary>
        <div className="ledger-entries">
          {changes.map((change) => (
            <div
              key={`${change.artefact}-${change.field}`}
              className={cn(
                step.artefactChanges.some((c) => c.artefact === change.artefact && c.field === change.field) &&
                  "new-change",
              )}
            >
              <span>{nodeById[change.artefact].title}</span>
              <strong>{change.field}</strong>
              <p>{change.value}</p>
            </div>
          ))}
        </div>
      </details>
    </>
  );
}
