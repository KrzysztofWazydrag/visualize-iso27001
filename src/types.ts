export type NodeType = "requirement" | "control" | "artefact" | "activity" | "evidence";
export interface LearningNode {
  id: string;
  type: NodeType;
  title: string;
  shortDescription: string;
  description: string;
  purpose: string;
  typicalOwner: string;
  clauseRefs: string[];
  controlRefs: string[];
  evidenceExamples: string[];
  auditQuestions: string[];
  misconceptions: string[];
}
export interface Relationship {
  id: string;
  source: string;
  target: string;
  label: string;
  explanation: string;
  feedback?: boolean;
}
export interface Clause {
  id: string;
  number: string;
  title: string;
  summary: string;
  relatedNodes: string[];
}
export interface Control {
  id: string;
  title: string;
  category: "Organisational" | "People" | "Physical" | "Technological";
  purpose: string;
  relatedRisks: string[];
  relatedPolicies: string[];
  implementations: string[];
  relatedNodes: string[];
  evidenceExamples: string[];
  auditQuestions: string[];
}
export interface ArtefactChange {
  artefact: string;
  field: string;
  value: string;
}
export interface ScenarioStep {
  id: string;
  order: number;
  title: string;
  phase: "Discover" | "Assess" | "Treat" | "Operate" | "Assure" | "Improve";
  activeNodes: string[];
  activeRelationships: string[];
  explanation: string;
  takeaway: string;
  packet: string;
  artefactChanges: ArtefactChange[];
}
export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
}
export interface AuditPrompt {
  id: string;
  controlId: string;
  question: string;
  implementation: string;
  evidence: { title: string; explanation: string }[];
  assurance: string;
  pitfall: string;
}
export interface NodePosition {
  id: string;
  x: number;
  y: number;
}
export interface EdgeGeometry {
  path: string;
  x: number;
  y: number;
}
export interface GraphLayout {
  width: number;
  height: number;
  positions: NodePosition[];
  routes?: Record<string, EdgeGeometry>;
}
export type View = "map" | "documents" | "scenario" | "controls" | "audit";
