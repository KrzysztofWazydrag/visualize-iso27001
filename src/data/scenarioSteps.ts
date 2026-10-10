import type { ScenarioStep, ArtefactChange } from "../types";
import { relationshipId } from "./relationships";

export interface StepInput {
  title: string;
  phase: ScenarioStep["phase"];
  nodes: string[];
  links?: [string, string][];
  explanation: string;
  takeaway: string;
  packet: string;
  changes: [string, string, string][];
  decision?: ScenarioStep["decision"];
}
export function buildSteps(prefix: string, steps: StepInput[]): ScenarioStep[] {
  return steps.map((s, index) => ({
    id: `${prefix}-${index + 1}`,
    order: index + 1,
    title: s.title,
    phase: s.phase,
    activeNodes: s.nodes,
    activeRelationships: (s.links ?? []).map(([source, target]) => relationshipId(source, target)),
    explanation: s.explanation,
    takeaway: s.takeaway,
    packet: s.packet,
    artefactChanges: s.changes.map(([artefact, field, value]): ArtefactChange => ({ artefact, field, value })),
    decision: s.decision,
  }));
}
