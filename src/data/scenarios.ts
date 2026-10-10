import type { Scenario } from "../types";
import { buildSteps, type StepInput } from "./scenarioSteps";
import { missingJustificationScenario } from "./missingJustification";
const steps: StepInput[] = [
  {
    title: "A security issue is spotted",
    phase: "Discover",
    nodes: ["identification"],
    explanation:
      "An IT check finds 8 of 40 company laptops without enforced disk encryption. No loss or breach is assumed: this is an exposure that needs investigation.",
    takeaway: "An observed weakness is an input to risk management.",
    packet: "8 devices without encryption",
    changes: [["identification", "Observation", "8 / 40 laptops lack enforced encryption"]],
  },
  {
    title: "Put the issue in business context",
    phase: "Discover",
    nodes: ["context", "identification"],
    links: [["context", "identification"]],
    explanation:
      "Staff travel with laptops containing client files. The devices and remote-working service are in scope, and client contracts require protection of confidential information.",
    takeaway: "Information, business needs and obligations make the issue meaningful.",
    packet: "Client information + travel exposure",
    changes: [["context", "Asset", "40 in-scope laptops · confidential client files"]],
  },
  {
    title: "Describe a risk and assign an owner",
    phase: "Discover",
    nodes: ["identification", "risk"],
    links: [["identification", "risk"]],
    explanation:
      "R-014: a lost or stolen unencrypted laptop could expose client information, causing confidentiality loss and business consequences. The operations director owns the risk.",
    takeaway: "Describe the event and consequence, not just the missing setting.",
    packet: "Risk R-014",
    changes: [
      ["risk", "Risk statement", "Device loss could expose client files"],
      ["risk", "Owner", "Operations director"],
    ],
  },
  {
    title: "Assess likelihood and impact",
    phase: "Assess",
    nodes: ["risk", "assessment"],
    links: [["risk", "assessment"]],
    explanation:
      "Using this fictional company’s 1–5 criteria, likelihood is 3 and impact is 4: score 12, above its treatment threshold. Travel exposure and client information explain the ratings.",
    takeaway: "These scores are illustrative; ISO 27001 does not prescribe this matrix.",
    packet: "Likelihood 3 × impact 4",
    changes: [["assessment", "Initial assessment", "12 / 25 · above company threshold"]],
  },
  {
    title: "Record the assessed risk",
    phase: "Assess",
    nodes: ["assessment", "register"],
    links: [["assessment", "register"]],
    explanation:
      "The register records R-014, the assessment rationale, accountable owner and review trigger. This makes the risk available for prioritisation and later reassessment.",
    takeaway: "A register preserves the rationale behind a decision.",
    packet: "R-014 · assessed · owner assigned",
    changes: [["register", "R-014", "Recorded · score 12 · owner confirmed"]],
  },
  {
    title: "Decide how to respond",
    phase: "Treat",
    nodes: ["register", "decision"],
    links: [["register", "decision"]],
    explanation:
      "The owner decides to modify the risk through enforced encryption and reliable enrollment. Retaining, avoiding or sharing risk are other options to consider; contractual protection needs still apply.",
    takeaway: "Treatment is an accountable decision, not an automatic technical fix.",
    packet: "Treatment decision: modify",
    changes: [["decision", "Decision", "Mitigate / modify risk · enforce encryption and enrollment"]],
  },
  {
    title: "Turn the decision into an approved plan",
    phase: "Treat",
    nodes: ["decision", "treatment"],
    links: [["decision", "treatment"]],
    explanation:
      "The risk owner approves actions: the endpoint team will enforce encryption, secure recovery keys and reconcile the fleet. The plan names an owner, a target date and how residual risk will be evaluated and accepted.",
    takeaway: "An action needs an owner, timing and a way to verify success.",
    packet: "Approved treatment actions",
    changes: [["treatment", "Action", "Endpoint lead · 30-day target · risk-owner approval"]],
  },
  {
    title: "Check the control reference set",
    phase: "Treat",
    nodes: ["treatment", "selection", "annex"],
    links: [
      ["treatment", "selection"],
      ["selection", "annex"],
    ],
    explanation:
      "The team first determines needed safeguards, then compares them with Annex A. A.8.24 supports cryptography, A.8.1 endpoint protection and A.8.9 controlled configuration; A.5.9 helps ensure complete asset coverage.",
    takeaway: "Annex A helps check for omissions; the business need drives the controls.",
    packet: "Necessary controls cross-checked",
    changes: [["annex", "Relevant references", "A.8.24 · A.8.1 · A.8.9 · A.5.9"]],
  },
  {
    title: "Make the applicability decision traceable",
    phase: "Treat",
    nodes: ["treatment", "selection", "annex", "soa"],
    links: [
      ["selection", "soa"],
      ["annex", "soa"],
    ],
    explanation:
      "The SoA explains why the necessary safeguards are included: R-014 and confidentiality commitments. It records the current implementation status. The wider SoA must also explain excluded Annex A references and include necessary custom controls.",
    takeaway: "Applicability, justification and implementation status are separate facts.",
    packet: "SoA: included · partially implemented",
    changes: [["soa", "A.8.24", "Included for R-014 and commitments · partial implementation"]],
  },
  {
    title: "Design the operational measure",
    phase: "Treat",
    nodes: ["annex", "technical"],
    links: [["annex", "technical"]],
    explanation:
      "The chosen measure enforces full-disk encryption through device management. Recovery keys have restricted access. Enrollment instructions define checks and an exception process so new laptops cannot silently bypass the baseline.",
    takeaway: "A control reference needs a concrete implementation appropriate to the organisation.",
    packet: "Encryption baseline + enrollment checks",
    changes: [["technical", "Measure", "Managed encryption · protected keys · enrollment checks"]],
  },
  {
    title: "Deploy and operate the measure",
    phase: "Operate",
    nodes: ["technical", "implementation"],
    links: [["technical", "implementation"]],
    explanation:
      "The endpoint team deploys the baseline to managed devices and records rollout results. Some legacy devices remain outside management, so the implementation claim is still limited by coverage.",
    takeaway: "Configured does not necessarily mean applied to every asset.",
    packet: "Baseline deployed to managed devices",
    changes: [["implementation", "Coverage", "32 managed devices · 8 devices still need confirmation"]],
  },
  {
    title: "Collect evidence of operation",
    phase: "Operate",
    nodes: ["implementation", "evidence"],
    links: [["implementation", "evidence"]],
    explanation:
      "The team retains configuration records, rollout tickets and a dated encryption report. The report covers only managed devices. A screenshot of the enforcement setting alone cannot establish fleet-wide encryption.",
    takeaway: "Ask what each piece of evidence can actually prove.",
    packet: "Configuration + dated fleet report",
    changes: [["evidence", "Evidence pack", "Approved baseline · rollout tickets · managed-device report"]],
  },
  {
    title: "Measure coverage and exceptions",
    phase: "Operate",
    nodes: ["evidence", "monitoring"],
    links: [["evidence", "monitoring"]],
    explanation:
      "A reviewer compares the report’s 32 encrypted devices with the inventory of 40 laptops. The apparent 100% dashboard result applies to the managed population, not the full fleet. The missing devices are flagged for investigation.",
    takeaway: "A percentage is meaningful only when its denominator matches the intended scope.",
    packet: "Coverage gap: 32 of 40 confirmed",
    changes: [["monitoring", "Coverage check", "80% of in-scope fleet confirmed · 8 exceptions"]],
  },
  {
    title: "Audit the implementation claim",
    phase: "Assure",
    nodes: ["monitoring", "audit", "evidence"],
    links: [
      ["monitoring", "audit"],
      ["evidence", "audit"],
    ],
    explanation:
      "An internal auditor samples devices, traces inventory entries to reports and reviews exceptions. The organisation’s endpoint standard requires all in-scope laptops to be encrypted; the evidence cannot demonstrate that requirement for eight devices.",
    takeaway: "Audit compares observed evidence with a specific applicable requirement.",
    packet: "Sample + requirement + observed gap",
    changes: [["audit", "Audit result", "Coverage gap against approved endpoint standard"]],
  },
  {
    title: "Record a supported nonconformity",
    phase: "Assure",
    nodes: ["audit", "finding"],
    links: [["audit", "finding"]],
    explanation:
      "NC-003 records the endpoint requirement, the missing-device evidence and the coverage gap. It describes the observed failure without assuming the root cause or assigning an unsupported severity rating.",
    takeaway: "A useful finding includes a requirement and objective evidence.",
    packet: "Finding NC-003",
    changes: [["finding", "NC-003", "Open · eight devices outside demonstrated coverage"]],
  },
  {
    title: "Address the cause and assign action",
    phase: "Improve",
    nodes: ["finding", "corrective"],
    links: [["finding", "corrective"]],
    explanation:
      "The endpoint lead encrypts the affected devices as a correction. Cause analysis finds a legacy procurement path that bypasses enrollment. Corrective action changes that workflow and introduces reconciliation, with an owner and effectiveness criteria.",
    takeaway: "Correction resolves the immediate gap; corrective action prevents recurrence.",
    packet: "Cause: procurement bypasses enrollment",
    changes: [
      ["corrective", "Root cause", "Legacy purchasing path bypasses enrollment"],
      ["corrective", "Action", "Endpoint lead · enrollment gate + weekly reconciliation"],
    ],
  },
  {
    title: "Implement the corrective action",
    phase: "Improve",
    nodes: ["corrective", "implementation"],
    links: [["corrective", "implementation"]],
    explanation:
      "The legacy devices are enrolled and encrypted. Procurement now requires enrollment before handover, and the asset owner checks fleet-to-management reconciliation weekly. A new-device trial tests the revised process.",
    takeaway: "Change the system that allowed the gap to recur.",
    packet: "Enrollment gate now operational",
    changes: [
      ["implementation", "Coverage", "40 / 40 devices encrypted and reconciled"],
      ["corrective", "Action status", "Implemented · ready for effectiveness review"],
    ],
  },
  {
    title: "Review closure and effectiveness evidence",
    phase: "Improve",
    nodes: ["corrective", "verification"],
    links: [["corrective", "verification"]],
    explanation:
      "The reviewer checks a full inventory-to-report match, samples encryption and key handling, and observes new laptops passing the revised handover gate. Four weekly reviews show no untracked devices.",
    takeaway: "Evidence of an action is useful; evidence that it worked is stronger.",
    packet: "Retest: full coverage + effective enrollment",
    changes: [["verification", "Effectiveness review", "Passed · 40 / 40 confirmed · four clean weekly reviews"]],
  },
  {
    title: "Close the finding with a reasoned decision",
    phase: "Improve",
    nodes: ["verification", "finding"],
    links: [["verification", "finding"]],
    explanation:
      "The authorised reviewer closes NC-003 using the retest and follow-up evidence. If the action had failed, the finding would remain open and the cause or action would be revisited.",
    takeaway: "Closure is an evidence-based decision, not a checkbox on a completed ticket.",
    packet: "NC-003 closed with evidence",
    changes: [["finding", "NC-003", "Closed · effectiveness verified"]],
  },
  {
    title: "Reassess the remaining risk",
    phase: "Improve",
    nodes: ["verification", "assessment", "soa", "implementation"],
    links: [
      ["verification", "assessment"],
      ["implementation", "soa"],
    ],
    explanation:
      "R-014 is reassessed: illustrative likelihood falls to 1 while impact remains 4. The owner accepts the remaining risk against company criteria, subject to continued checks. The register and SoA status are updated; encryption cannot eliminate every route to data exposure.",
    takeaway: "A successful treatment changes risk; it does not make all risk disappear.",
    packet: "Residual risk reviewed and accepted",
    changes: [
      ["assessment", "Residual assessment", "4 / 25 · owner accepted · monitoring continues"],
      ["register", "R-014", "Reassessed · residual risk accepted"],
      ["soa", "A.8.24", "Implemented · coverage verified"],
    ],
  },
  {
    title: "Feed the lesson back into the ISMS",
    phase: "Improve",
    nodes: ["verification", "review", "improvement", "identification"],
    links: [
      ["verification", "review"],
      ["review", "improvement"],
      ["improvement", "identification"],
    ],
    explanation:
      "Management reviews the coverage failure, the effective enrollment fix and the resources needed to sustain it. The lesson improves procurement, asset ownership and future risk identification. Monitoring keeps running as devices and business needs change.",
    takeaway: "The management system loops back, learns and adapts.",
    packet: "Lesson becomes a stronger process",
    changes: [
      ["review", "Decision", "Sustain reconciliation and extend it to other endpoints"],
      ["improvement", "Learning", "Check coverage assumptions in future control reviews"],
    ],
  },
];
export const laptopScenario: Scenario = {
  id: "laptop-encryption",
  title: "The unencrypted laptop",
  description:
    "Company laptops do not have encryption consistently enforced. Follow one issue through the whole management system.",
  steps: buildSteps("laptop", steps),
};
export const scenarios: Scenario[] = [laptopScenario, missingJustificationScenario];
