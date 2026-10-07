import type { Scenario, ArtefactChange } from "../types";
export function nextStep(current: number, count: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(count - 1, current + direction));
}
export function snapshotAt(scenario: Scenario, stepIndex: number): ArtefactChange[] {
  const latest = new Map<string, ArtefactChange>();
  scenario.steps.slice(0, stepIndex + 1).forEach((step) => {
    step.artefactChanges.forEach((change) => latest.set(`${change.artefact}:${change.field}`, change));
  });
  return [...latest.values()];
}
