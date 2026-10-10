import type { Scenario } from "../types";
import { buildSteps } from "./scenarioSteps";

export const missingJustificationScenario: Scenario = {
  id: "missing-justification",
  title: "The missing justification",
  description:
    "Physical controls operate, but their selection has no recorded basis. Rebuild the risk-to-control chain and choose a treatment.",
  steps: buildSteps("justification", [
    {
      title: "Physical controls already exist",
      phase: "Discover",
      nodes: ["implementation", "soa"],
      links: [["implementation", "soa"]],
      explanation:
        "A fictional company works in a serviced office and keeps confidential client records on site. Access cards, reception checks, a restricted records room and CCTV already operate. The SoA marks A.7.1–A.7.4 as applicable and implemented.",
      takeaway: "An implemented control and a justified selection are two different claims.",
      packet: "Office safeguards already operating",
      changes: [
        ["soa", "A.7.1–A.7.4", "Applicable = Yes · implemented · basis to be checked"],
        ["implementation", "Office safeguards", "Cards · reception · restricted room · CCTV"],
      ],
    },
    {
      title: "An auditor asks a simple question",
      phase: "Discover",
      nodes: ["soa", "audit"],
      links: [["soa", "audit"]],
      explanation:
        "The auditor samples physical controls from the SoA and asks: why were these safeguards selected? The team needs to show the protection need, treatment rationale and operating evidence, rather than only list installed equipment.",
      takeaway: "An auditor can trace backwards from a control to its selection basis.",
      packet: "Why these controls?",
      changes: [["audit", "Audit question", "Trace A.7.1–A.7.4 to risks, requirements and decisions"]],
    },
    {
      title: "Evidence shows the controls are real",
      phase: "Discover",
      nodes: ["implementation", "evidence", "audit"],
      links: [
        ["implementation", "evidence"],
        ["evidence", "audit"],
      ],
      explanation:
        "The team shows access approvals, visitor records, room inspections and a monitoring test. These support operation of the safeguards. They do not explain why those measures were necessary or how their selection was approved.",
      takeaway: "Evidence of operation cannot replace the rationale for choosing a control.",
      packet: "Operational records exist",
      changes: [
        ["evidence", "Existing records", "Access approvals · visitor logs · room inspection · monitoring test"],
      ],
    },
    {
      title: "The selection basis is missing",
      phase: "Discover",
      nodes: ["selection", "soa"],
      explanation:
        "The SoA says applicable, but its justification is blank. The team cannot find an assessment, approved treatment decision or another recorded requirement supporting the physical control selection. The auditor investigates before drawing a conclusion.",
      takeaway: "No single risk link is not automatically a finding; check the wider selection basis.",
      packet: "Justification not demonstrated",
      changes: [["soa", "Selection basis", "Not demonstrated · assessment and requirement records requested"]],
    },
    {
      title: "Trace the decision back to the register",
      phase: "Assess",
      nodes: ["audit", "register"],
      links: [["audit", "register"]],
      explanation:
        "The auditor asks for risk assessment results and treatment records covering information in the office. The register is one way this company links risk IDs to owners and treatment plans; ISO 27001 does not prescribe this particular file or format.",
      takeaway: "A traceable decision matters more than the filename containing it.",
      packet: "Search office risk and treatment records",
      changes: [["register", "Office risk search", "Office information and physical access reviewed"]],
    },
    {
      title: "The assessment missed physical access",
      phase: "Assess",
      nodes: ["context", "requirements", "register"],
      explanation:
        "Cyber and supplier risks are recorded, but unauthorised office access was overlooked. Client confidentiality commitments and on-site records were not considered in the assessment. The company's process requires these inputs and documented treatment decisions.",
      takeaway: "Information security risk includes people, suppliers, places and technology.",
      packet: "Physical exposure and commitments omitted",
      changes: [
        ["requirements", "Client commitment", "Protect confidential client records, including on-site handling"],
        ["register", "Assessment gap", "Office access exposure omitted from assessment"],
      ],
    },
    {
      title: "Record the supported gap",
      phase: "Assure",
      nodes: ["audit", "finding"],
      links: [["audit", "finding"]],
      explanation:
        "NC-004 records the missed assessment input and the absent treatment and inclusion rationale against the company's risk process and Clause 6.1.3. The issue is the unsupported decision chain; working CCTV is not the missing item. No severity is assumed.",
      takeaway: "A finding needs a requirement, objective evidence and a clearly described gap.",
      packet: "NC-004: selection basis not demonstrated",
      changes: [["finding", "NC-004", "Open · assessment input and treatment justification missing"]],
    },
    {
      title: "Repair the decision process",
      phase: "Improve",
      nodes: ["finding", "corrective"],
      links: [["finding", "corrective"]],
      explanation:
        "Cause analysis finds that the annual review considered only the IT risk list. The ISMS lead adds facilities and contract owners to the review and checks other control decisions for the same gap. Missing records will be made as current decisions, never backdated.",
      takeaway: "Risks and requirements can share controls; there is no one-risk-per-control rule.",
      packet: "Broaden assessment inputs and traceability checks",
      changes: [
        ["corrective", "Cause", "Annual assessment excluded facilities and contract owners"],
        ["corrective", "Action", "ISMS lead · include omitted inputs and review other control decisions"],
      ],
    },
    {
      title: "Describe the information risk",
      phase: "Assess",
      nodes: ["context", "identification", "risk"],
      links: [
        ["context", "identification"],
        ["identification", "risk"],
      ],
      explanation:
        "R-027: unauthorised entry to the shared office could expose client records or allow theft of equipment, causing loss of confidentiality or availability. The facilities director owns the risk. This is an exposure, not a claim that an intrusion occurred.",
      takeaway: "Connect an event to information, consequences and an accountable owner.",
      packet: "Risk R-027 · unauthorised office access",
      changes: [
        ["risk", "R-027", "Unauthorised entry could expose client records or remove equipment"],
        ["risk", "Owner", "Facilities director"],
      ],
    },
    {
      title: "Assess likelihood and impact",
      phase: "Assess",
      nodes: ["methodology", "risk", "assessment"],
      links: [
        ["methodology", "assessment"],
        ["risk", "assessment"],
      ],
      explanation:
        "Using the company's illustrative 1–5 criteria, exposure without the chosen safeguards is assessed at likelihood 3 and impact 4: score 12. Its acceptance threshold is 6. Shared entry and confidential records explain the ratings; existing control effectiveness is evaluated separately.",
      takeaway: "The assessment explains the need; later review tests how well the safeguards reduce it.",
      packet: "Illustrative score 12 · acceptance threshold 6",
      changes: [["assessment", "Initial exposure", "12 / 25 before selected safeguards · acceptance threshold 6"]],
    },
    {
      title: "Make the assessed risk traceable",
      phase: "Assess",
      nodes: ["assessment", "register"],
      links: [["assessment", "register"]],
      explanation:
        "The register records R-027, its owner, rationale, client commitment and review trigger. It links to the treatment record so another reviewer can follow how the assessed exposure led to a decision and particular safeguards.",
      takeaway: "Recording a risk enables an accountable response; it does not select controls by itself.",
      packet: "R-027 entered with rationale and owner",
      changes: [["register", "R-027", "Recorded · facilities director · score 12 · client commitment linked"]],
    },
    {
      title: "Choose how to treat the risk",
      phase: "Treat",
      nodes: ["register", "decision"],
      links: [["register", "decision"]],
      explanation:
        "The company needs this office service, has a confidentiality commitment and cannot accept the assessed exposure of 12 against its threshold of 6. Choose a response that addresses these facts. Each option can be appropriate in a different situation.",
      takeaway: "The risk owner chooses a justified response before the control selection is recorded.",
      packet: "Your decision: accept, mitigate, transfer or avoid?",
      changes: [],
      decision: {
        question: "Which response fits this company's risk and requirements?",
        context:
          "Score 12 exceeds threshold 6. The office service is needed and confidential records must be protected. Explore the options; continue this example with Mitigate.",
        continueWith: "mitigate",
        options: [
          {
            id: "accept",
            title: "Accept",
            description: "Retain the risk through an approved acceptance decision.",
            feedback:
              "Acceptance can be appropriate within agreed criteria, including reliance on justified existing controls. Here, the assessed exposure exceeds tolerance and the confidentiality commitment still applies. Management approval alone does not cancel either constraint. Try another response.",
          },
          {
            id: "mitigate",
            title: "Mitigate",
            description: "Reduce likelihood or impact through physical and procedural safeguards.",
            feedback:
              "This fits the stated facts. Justify and validate the existing perimeter, entry, room and monitoring measures, with clear owners and review criteria. The risk owner must also approve the treatment plan and accept the remaining risk. Continue to record the actions and selected controls.",
          },
          {
            id: "transfer",
            title: "Transfer",
            description: "Share defined exposure through contracts, a service provider or insurance.",
            feedback:
              "A landlord or insurer can share certain activities or losses. That does not remove the company's confidentiality obligations or accountability, and insurance does not prevent disclosure. The protection measures and supplier responsibilities still need justification and checks. Transfer alone is insufficient for these facts; try another response.",
          },
          {
            id: "avoid",
            title: "Avoid",
            description: "Stop or change the activity that creates the exposure.",
            feedback:
              "Avoidance could remove on-site handling by redesigning the service, if that met business and contractual needs. This example assumes the office service remains necessary. Closing a door or installing CCTV reduces exposure; it does not avoid the activity. Try another response for this narrative.",
          },
        ],
      },
    },
    {
      title: "Turn the choice into treatment actions",
      phase: "Treat",
      nodes: ["decision", "treatment"],
      links: [["decision", "treatment"]],
      explanation:
        "The owner approves mitigation for R-027. The treatment plan specifies an office boundary, approved and reviewed access, escorted visitors, a protected records room and monitored entry. Facilities owns the actions and validates the existing measures; the plan defines effectiveness checks and residual-risk acceptance.",
      takeaway: "The plan bridges the recorded risk, approved option and concrete safeguards.",
      packet: "Approved mitigation plan for R-027",
      changes: [
        ["decision", "R-027 treatment", "Mitigate · justified against criteria and commitments"],
        [
          "treatment",
          "R-027 plan",
          "Facilities owner · perimeter, entry, room and monitoring · approval and review criteria recorded",
        ],
      ],
    },
    {
      title: "Select controls that deliver the treatment",
      phase: "Treat",
      nodes: ["treatment", "selection", "annex", "A.7.1", "A.7.2", "A.7.3", "A.7.4"],
      links: [
        ["treatment", "selection"],
        ["selection", "annex"],
        ["selection", "A.7.1"],
        ["selection", "A.7.2"],
        ["selection", "A.7.3"],
        ["selection", "A.7.4"],
      ],
      explanation:
        "The necessary safeguards map to A.7.1 physical security perimeters, A.7.2 physical entry, A.7.3 securing offices, rooms and facilities, and A.7.4 physical security monitoring. Annex A is cross-checked for omissions. Reception, access cards and CCTV are implementations, not the selection rationale.",
      takeaway: "Select protection outcomes because of the treatment and requirements, then cross-check references.",
      packet: "Selected safeguards → A.7.1–A.7.4",
      changes: [
        ["selection", "R-027 safeguards", "Boundary · entry authorisation · protected room · monitoring"],
        ["annex", "R-027 comparison", "A.7.1 · A.7.2 · A.7.3 · A.7.4 checked"],
      ],
    },
    {
      title: "Record the justification in the SoA",
      phase: "Treat",
      nodes: ["selection", "annex", "soa"],
      links: [
        ["selection", "soa"],
        ["annex", "soa"],
      ],
      explanation:
        "The SoA retains A.7.1–A.7.4 as applicable, now justified by R-027, the approved mitigation and the client commitment. It records the current implementation status. The wider SoA still covers other necessary controls and reasons for excluding Annex A references; this excerpt is not the whole SoA.",
      takeaway: "Applicable = Yes needs a defensible reason. Implemented is a separate status claim.",
      packet: "SoA now links risk, treatment and selected safeguards",
      changes: [
        [
          "soa",
          "A.7.1–A.7.4",
          "Applicable = Yes · R-027 + approved mitigation + client commitment · implemented, effectiveness under review",
        ],
        ["soa", "Selection basis", "Recorded today · traceable to R-027 and client commitment"],
      ],
    },
    {
      title: "Validate implementation and its evidence",
      phase: "Operate",
      nodes: ["soa", "implementation", "evidence"],
      links: [
        ["soa", "implementation"],
        ["implementation", "evidence"],
      ],
      explanation:
        "Facilities confirms who controls each boundary, authorises access, checks visitor handling and the records room, and tests monitoring and response. Existing records are linked to the approved plan; any gaps are fixed. Evidence includes access reviews, visitor samples, room inspections and a dated monitoring test, with privacy and retention requirements considered.",
      takeaway: "Repair missing justification honestly and verify operation; do not fabricate a historical decision.",
      packet: "Scope, ownership and dated evidence confirmed",
      changes: [
        ["implementation", "Office safeguards", "Owners confirmed · approved plan validated in operation"],
        [
          "evidence",
          "R-027 evidence pack",
          "Access review · visitor sample · room inspection · monitoring and response test",
        ],
      ],
    },
    {
      title: "Review effectiveness and remaining risk",
      phase: "Assure",
      nodes: ["evidence", "monitoring", "assessment", "corrective", "verification", "finding"],
      links: [
        ["evidence", "monitoring"],
        ["monitoring", "assessment"],
        ["corrective", "verification"],
        ["verification", "finding"],
      ],
      explanation:
        "A reviewer tests revoked-card entry, visitor handling and monitoring response, and samples other control decisions to check the broader process fix. Illustrative remaining risk is 4, accepted by the owner against criteria. NC-004 is closed only after the missing records and corrective-action effectiveness are verified; failed tests would keep it open.",
      takeaway: "A justified control must also work. Review evidence and reassess the remaining exposure.",
      packet: "Decision chain verified · residual risk reviewed",
      changes: [
        ["monitoring", "Effectiveness", "Revocation, visitor and response tests passed"],
        ["assessment", "Residual assessment", "4 / 25 · owner accepted against criteria · periodic review continues"],
        ["register", "R-027", "Reassessed · residual risk 4 accepted · ongoing review"],
        [
          "verification",
          "Process effectiveness",
          "Other control decisions sampled · wider assessment inputs and rationale verified",
        ],
        ["finding", "NC-004", "Closed · correction and process effectiveness verified"],
        [
          "soa",
          "A.7.1–A.7.4",
          "Applicable = Yes · R-027 + approved mitigation + client commitment · implemented and verified",
        ],
      ],
    },
    {
      title: "The chain is complete and keeps learning",
      phase: "Improve",
      nodes: ["verification", "review", "improvement"],
      links: [
        ["verification", "review"],
        ["review", "improvement"],
      ],
      explanation:
        "Management reviews the omitted physical exposure and the process correction. Future assessments involve facilities and contract owners, and control reviews check selection rationale as well as evidence. The auditor can trace risk → assessment → register → treatment → control selection → SoA → implementation evidence → effectiveness review.",
      takeaway:
        "The SoA records why controls are necessary and whether they are implemented. It is more than an inventory of installed equipment.",
      packet: "A traceable chain, with review and feedback",
      changes: [
        ["review", "Decision", "Keep facilities and contract inputs in risk and control reviews"],
        ["improvement", "Lesson", "Trace both the selection basis and the evidence of effective operation"],
      ],
    },
  ]),
};
