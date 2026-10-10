import type { GraphLayout } from "../types";
export const mapLayout: GraphLayout = {
  width: 900,
  height: 690,
  routes: {
    "clause-10--clause-6": {
      path: "M 160 620 Q 160 650 190 650 L 850 650 Q 875 650 875 625 L 875 60 Q 875 35 850 35 L 765 35 Q 740 35 740 60 L 740 90",
      x: 510,
      y: 671,
    },
    "clause-10--clause-4": { path: "M 60 565 C 20 565 20 145 60 145", x: 100, y: 435 },
    "clause-9--clause-10": {
      path: "M 640 565 C 610 565 610 627 580 627 L 290 627 C 265 627 285 565 260 565",
      x: 450,
      y: 620,
    },
    "clause-7--clause-8": { path: "M 260 325 C 320 240 580 240 640 325", x: 450, y: 269 },
  },
  positions: [
    { id: "clause-4", x: 60, y: 90 },
    { id: "clause-5", x: 350, y: 90 },
    { id: "clause-6", x: 640, y: 90 },
    { id: "clause-7", x: 60, y: 300 },
    { id: "annex", x: 350, y: 300 },
    { id: "clause-8", x: 640, y: 300 },
    { id: "clause-10", x: 60, y: 510 },
    { id: "clause-9", x: 640, y: 510 },
  ],
};
function snakeLayout(rows: string[][], width = 1110): GraphLayout {
  return {
    width,
    height: rows.length * 190 + 70,
    positions: rows.flatMap((row, r) => row.map((id, c) => ({ id, x: 55 + c * 255, y: 65 + r * 190 }))),
  };
}
export const scenarioLayout = snakeLayout([
  ["context", "identification", "risk", "assessment"],
  ["selection", "treatment", "decision", "register"],
  ["annex", "soa", "organisational"],
  ["technical", "implementation", "evidence", "monitoring"],
  ["verification", "corrective", "finding", "audit"],
  ["improvement", "review"],
]);
export const documentLayout = snakeLayout([
  ["context", "parties", "requirements", "scope"],
  ["security-policy", "methodology", "identification", "risk"],
  ["treatment", "decision", "register", "assessment"],
  ["selection", "annex", "soa", "policies"],
  ["procedures", "organisational"],
  ["technical", "implementation", "evidence", "monitoring"],
  ["verification", "corrective", "finding", "audit"],
  ["improvement", "review"],
]);
export const physicalScenarioLayout = snakeLayout([
  ["context", "requirements", "identification", "risk"],
  ["decision", "register", "assessment", "methodology"],
  ["treatment", "selection", "annex", "soa"],
  ["A.7.1", "A.7.2", "A.7.3", "A.7.4"],
  ["organisational", "implementation", "evidence", "monitoring"],
  ["audit", "finding", "corrective", "verification"],
  ["improvement", "review"],
]);
export const scenarioLayouts: Record<string, GraphLayout> = {
  "laptop-encryption": scenarioLayout,
  "missing-justification": physicalScenarioLayout,
};
export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 110;
