import type { Clause } from "../types";
export const clauses: Clause[] = [
  {
    id: "clause-4",
    number: "4",
    title: "Context of the organisation",
    summary: "Understand the business, interested parties and requirements. Define the boundaries of the ISMS.",
    relatedNodes: ["context", "parties", "requirements", "scope"],
  },
  {
    id: "clause-5",
    number: "5",
    title: "Leadership",
    summary:
      "Leaders establish direction, assign responsibilities and make information security part of how the organisation works.",
    relatedNodes: ["security-policy", "organisational"],
  },
  {
    id: "clause-6",
    number: "6",
    title: "Planning",
    summary:
      "Set objectives, assess information security risks and decide how to treat them. Plan changes deliberately.",
    relatedNodes: ["methodology", "risk", "assessment", "register", "treatment", "soa"],
  },
  {
    id: "clause-7",
    number: "7",
    title: "Support",
    summary:
      "Provide resources, competence, awareness, communication and controlled information so the ISMS can operate.",
    relatedNodes: ["policies", "procedures", "evidence"],
  },
  {
    id: "clause-8",
    number: "8",
    title: "Operation",
    summary: "Carry out the planned processes, reassess risks when needed and put treatment decisions into practice.",
    relatedNodes: ["implementation", "technical", "assessment", "treatment"],
  },
  {
    id: "clause-9",
    number: "9",
    title: "Performance evaluation",
    summary: "Measure performance, audit the system and have management review whether it is suitable and effective.",
    relatedNodes: ["monitoring", "audit", "review"],
  },
  {
    id: "clause-10",
    number: "10",
    title: "Improvement",
    summary: "Respond to nonconformities, address their causes and improve the system as the organisation learns.",
    relatedNodes: ["finding", "corrective", "verification", "improvement"],
  },
];
