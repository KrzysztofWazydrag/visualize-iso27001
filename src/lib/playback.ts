import type { Scenario, ArtefactChange } from "../types";
export function nextStep(current: number, count: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(count - 1, current + direction));
}
export function firstUnresolvedDecision(scenario: Scenario, choices: Record<string, string>): number {
  const index = scenario.steps.findIndex((step) => step.decision && choices[step.id] !== step.decision.continueWith);
  return index < 0 ? scenario.steps.length : index;
}
export function snapshotAt(
  scenario: Scenario,
  stepIndex: number,
  choices: Record<string, string> = {},
): ArtefactChange[] {
  const latest = new Map<string, ArtefactChange>();
  const end = Math.min(stepIndex, firstUnresolvedDecision(scenario, choices));
  scenario.steps.slice(0, end + 1).forEach((step) => {
    step.artefactChanges.forEach((change) => latest.set(`${change.artefact}:${change.field}`, change));
    const option = step.decision?.options.find((item) => item.id === choices[step.id]);
    if (option) {
      const change = {
        artefact: "decision",
        field: "Learner treatment choice",
        value:
          option.id === step.decision?.continueWith
            ? `${option.title} · selected for this example`
            : `${option.title} · explored, not adopted for this example`,
      };
      latest.set(`${change.artefact}:${change.field}`, change);
    }
  });
  return [...latest.values()];
}
