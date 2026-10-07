import type { AuditPrompt } from "../types";
export const auditPrompts: AuditPrompt[] = [
  {
    id: "encryption",
    controlId: "A.8.24",
    question: "How would you demonstrate that laptop encryption is operating?",
    implementation: "The endpoint team enforces disk encryption and protects recovery keys on every in-scope laptop.",
    evidence: [
      {
        title: "An approved configuration baseline",
        explanation:
          "Shows the intended enforcement settings and key-handling rules. It does not establish complete deployment.",
      },
      {
        title: "A dated fleet encryption report",
        explanation:
          "Shows observed status. Reconcile its population against the full inventory so missing devices are visible.",
      },
      {
        title: "Exception and remediation tickets",
        explanation: "Show who investigated gaps, what was changed and whether exceptions were approved.",
      },
      {
        title: "A follow-up device sample",
        explanation:
          "Tests actual encryption, key access and the new-device enrollment process beyond a dashboard claim.",
      },
    ],
    assurance:
      "Compare intended settings with actual coverage, check dates and scope, and test a justified sample. A claim of full coverage requires a complete population, not a convenient denominator.",
    pitfall: "A screenshot proves a setting existed at one moment. It cannot alone prove every laptop is protected.",
  },
  {
    id: "inventory",
    controlId: "A.5.9",
    question: "How would you demonstrate that your asset inventory is reliable?",
    implementation:
      "The asset owner keeps an inventory with owners and reconciles it against procurement, device management and leaver records.",
    evidence: [
      {
        title: "An inventory with accountable owners",
        explanation: "Shows known assets and responsibility. It is a starting point, not proof of completeness.",
      },
      {
        title: "Reconciliation records",
        explanation: "Compare independent sources and show how missing or duplicate assets were resolved.",
      },
      {
        title: "Joiner and leaver samples",
        explanation: "Trace recent device handovers and returns to inventory updates.",
      },
    ],
    assurance:
      "Trace a sample in both directions: from an inventory entry to a real device and from a procurement record to an inventory entry. Review unresolved discrepancies.",
    pitfall: "A long asset spreadsheet can still omit the devices that matter most.",
  },
  {
    id: "awareness",
    controlId: "A.6.3",
    question: "How would you demonstrate that security training has an effect?",
    implementation:
      "Staff receive relevant guidance on device handling and loss reporting; administrators receive role-specific training.",
    evidence: [
      {
        title: "Role-specific training content",
        explanation: "Shows whether guidance addresses the risks and decisions people actually face.",
      },
      {
        title: "Attendance and follow-up records",
        explanation: "Shows who participated and how missed sessions were handled.",
      },
      {
        title: "Practical understanding checks",
        explanation: "Ask staff to explain reporting steps and review whether real incidents were handled as expected.",
      },
    ],
    assurance:
      "Look beyond attendance. Evaluate understanding and behaviour with proportionate checks, then improve training where results show gaps.",
    pitfall: "A completion certificate alone does not demonstrate competence or changed behaviour.",
  },
];
