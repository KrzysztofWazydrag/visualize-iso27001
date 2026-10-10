import type { LearningPath } from "../types";
import { relationshipId } from "./relationships";

const steps = [
  { nodeId: "risk", label: "Identify the risk" },
  { nodeId: "assessment", label: "Assess likelihood & impact" },
  { nodeId: "register", label: "Record the assessed risk" },
  { nodeId: "decision", label: "Choose a treatment" },
  { nodeId: "treatment", label: "Approve the treatment plan" },
  { nodeId: "selection", label: "Determine necessary controls" },
  { nodeId: "annex", label: "Cross-check Annex A" },
  { nodeId: "soa", label: "Record justification & status" },
  { nodeId: "implementation", label: "Implement & operate" },
  { nodeId: "evidence", label: "Collect evidence" },
  { nodeId: "monitoring", label: "Review effectiveness" },
];
export const treatmentJourney: LearningPath = {
  id: "risk-to-assurance",
  title: "Follow the treatment decision",
  description: "Why this control? Trace the assessed risk through the decision, selected safeguards and SoA.",
  steps,
  relationships: steps.slice(1).map((step, index) => relationshipId(steps[index].nodeId, step.nodeId)),
  note: "The SoA records the outcome of control decisions, including justification and implementation status. Requirements can also drive controls; this is one traceable path through a system with feedback loops.",
};
export const learningPaths: LearningPath[] = [treatmentJourney];
