You are building a new standalone educational web application.

PROJECT

Name:
Visualize ISO 27001

REPOSITORY / STARTER

Create a NEW FORK of the 10xDevs Astro starter repository specifically for this project.

Do NOT reuse the existing SiteCrew repository.
Do NOT copy SiteCrew project files.
Do NOT modify SiteCrew.

The new repository should be independent and named:

visualize-iso27001

or another similarly clear project name if repository naming constraints require it.

I have previously used the 10xDevs Astro starter and it produced a very strong, almost production-ready application structure in one pass.

For that reason, use the 10xDevs Astro starter as the foundation instead of creating a blank Astro project.

Before implementation:

1. inspect the starter repository,
2. understand its architecture,
3. identify reusable layout/components/styling,
4. identify irrelevant starter functionality,
5. remove or ignore anything unnecessary for this project.

IMPORTANT SCOPE BOUNDARY

This is NOT a SaaS application.

This is NOT a compliance management platform.

This is NOT currently intended to manage real company ISO documentation.

This is a frontend-only educational and visualisation application.

DO NOT IMPLEMENT:

- authentication
- login
- registration
- Supabase Auth
- user accounts
- user profiles
- database
- PostgreSQL
- Supabase database
- Prisma
- ORM
- API backend
- server-side persistence
- subscriptions
- payments
- admin panel
- organisation management
- multi-tenancy

Do not introduce any of these "for future use".

Do not create database schemas.
Do not create auth placeholders.
Do not create unused backend infrastructure.

The MVP must work as a completely static application.

All educational content, scenarios, graph relationships and application state should live locally in structured TypeScript/JavaScript data.

No secrets should be required.
No external service should be required.
No environment variables should be required for the MVP.

The application should be deployable as a static website.

CORE PRODUCT IDEA

Build an interactive visual learning tool that explains how ISO 27001:2022 works as a connected Information Security Management System.

The problem I want to solve is this:

ISO 27001 is often taught as disconnected pieces.

A learner sees:

- clauses
- Annex A controls
- policies
- procedures
- risk assessments
- risk registers
- Statements of Applicability
- treatment plans
- audit findings
- corrective actions
- evidence
- management reviews
- many documents stored across folders

But it is often difficult to understand:

- what causes what,
- what document feeds another document,
- where information originates,
- why a particular document exists,
- what happens next,
- how a risk results in action,
- how controls relate to treatment,
- how evidence connects to controls,
- how audit findings feed improvement,
- how the whole ISMS operates as one system.

Courses often explain individual concepts well but do not make the whole system easy to mentally visualise.

In a real company, a person may simply see folders full of files and not fully understand how those artefacts connect.

The purpose of Visualize ISO 27001 is to bridge the gap between:

DRY TRAINING MATERIAL

and

REAL-WORLD ISMS DOCUMENTATION.

INSPIRATION

Use the interaction philosophy of VisualizeJS as inspiration.

Do NOT copy its branding or exact visual design.

The important concept is that VisualizeJS allows a learner to watch a process happen step by step.

For example:

source code
→ call stack
→ Web APIs
→ queues
→ event loop

Visualize ISO 27001 should provide a similar learning experience for an ISMS.

The learner should WATCH information move through the management system.

HIGH-LEVEL CONCEPT

An example conceptual flow might be:

Business Context
→ Assets / Requirements / Threats
→ Risk Identification
→ Risk Assessment
→ Risk Register
→ Risk Treatment
→ Statement of Applicability
→ Annex A Controls
→ Policies / Procedures / Technical Measures
→ Implementation
→ Evidence
→ Monitoring
→ Internal Audit
→ Findings
→ Corrective Actions
→ Verification
→ Management Review
→ Continual Improvement

IMPORTANT:

Do NOT represent ISO 27001 as one rigid linear workflow.

An ISMS is a management system with:

- relationships,
- feedback loops,
- reassessment,
- monitoring,
- review,
- continual improvement.

The application must help the learner understand both:

1. the main direction of information flow,
2. the feedback loops.

PRODUCT FEEL

The application should feel like an:

"Interactive ISMS Engine Room"

The learner should feel as if they can open the system and see how its internal parts connect.

Possible visual concepts / section names:

- ISMS Engine Room
- Risk Flow
- Evidence Chain
- Audit Trail
- Control Map
- Improvement Loop

DESIGN DIRECTION

Create a polished original design.

Preferred qualities:

- dark technical interface
- strong typography
- high visual clarity
- subtle animation
- clear active states
- connected nodes
- labelled relationships
- minimal clutter
- elegant technical feel
- responsive layout
- excellent desktop experience
- good mobile behaviour

Avoid creating a generic SaaS dashboard composed of ordinary cards.

This should visually feel like an interactive learning visualisation product.

The visualisation itself is the product.

MAIN APPLICATION AREAS

Create the following primary areas.

==================================================

1. ISMS MAP
   \==================================================

Create a high-level interactive map of ISO 27001.

Show clauses:

4 — Context of the organisation
5 — Leadership
6 — Planning
7 — Support
8 — Operation
9 — Performance evaluation
10 — Improvement

Show Annex A separately as a related control reference set.

The interface must clearly distinguish different object types.

For example:

ISO REQUIREMENT
ANNEX A CONTROL
ISMS ARTEFACT
ACTIVITY
EVIDENCE

Use visual styling or badges so that learners immediately understand that these are not the same thing.

Users should be able to click nodes.

Clicking an element should show an explanation panel.

================================================== 2. DOCUMENT FLOW
==================================================

This is a critical part of the application.

Create an interactive network showing common ISMS artefacts and how information moves between them.

Initial nodes should include:

- Organisational Context
- Interested Parties
- Legal / Regulatory / Contractual Requirements
- ISMS Scope
- Information Security Policy
- Risk Assessment Methodology
- Risk Identification
- Risk Assessment
- Risk Register
- Risk Treatment Plan
- Statement of Applicability
- Policies
- Procedures
- Annex A Controls
- Technical Measures
- Organisational Measures
- Implementation
- Evidence
- Monitoring and Measurement
- Internal Audit
- Management Review
- Nonconformity
- Corrective Action
- Continual Improvement

Relationships must have meaning.

Do not use arrows merely for decoration.

Where useful, label relationships with terms such as:

- informs
- identifies
- records
- feeds
- justifies
- selects
- implements
- produces evidence
- verifies
- tests
- creates finding
- triggers action
- updates
- reassesses

The purpose is for the learner to understand WHY two nodes are connected.

When a user selects a node, show:

WHAT IS THIS?

WHY DOES IT EXIST?

WHAT FEEDS INTO IT?

WHAT DOES IT FEED INTO?

WHO USUALLY OWNS IT?

WHICH ISO 27001 CLAUSE RELATES TO IT?

WHICH ANNEX A CONTROLS MAY RELATE TO IT?

WHAT EVIDENCE MAY SUPPORT IT?

WHAT COULD AN AUDITOR ASK?

COMMON MISUNDERSTANDINGS

Do not imply that every company must use identical documents or filenames.

These are common ISMS artefacts used to explain relationships.

================================================== 3. SCENARIO MODE
==================================================

Build ONE complete high-quality scenario for v1.

Do not create many shallow scenarios.

The first scenario should be:

"Company laptops do not have encryption consistently enforced."

The learner should watch this issue travel through the ISMS.

Suggested learning flow:

1. A security issue is identified.

2. The relevant asset or business context is identified.

3. A risk is created or an existing risk is updated.

4. Likelihood and impact are assessed.

5. The risk is recorded in the Risk Register.

6. A treatment decision is made.

7. The Risk Treatment Plan is updated.

8. Relevant Annex A control(s) are considered.

9. The relationship with the Statement of Applicability is shown.

10. The organisation decides what technical or procedural measure will be implemented.

11. The control / measure is implemented.

12. Evidence is produced.

13. Monitoring or testing occurs.

14. Internal audit reviews whether the control is operating effectively.

15. If implementation or evidence is insufficient, a finding is created.

16. Corrective action is assigned.

17. Corrective action is implemented.

18. Closure evidence is reviewed.

19. The finding is closed.

20. Risk and control state are reassessed.

21. The result feeds continual improvement.

The scenario must visually show how information cascades between components.

PLAYBACK

Provide controls:

- Play
- Pause
- Previous Step
- Next Step
- Restart

Show:

Step X / N

Optional:
simple speed control if this does not complicate the implementation unnecessarily.

ACTIVE STATE

When a scenario step is active:

- relevant nodes should highlight,
- relevant relationship lines should highlight,
- inactive elements should visually recede,
- the explanation panel should update.

Where appropriate, animate an information object / event / document moving from one component to another.

For example:

Risk identified
→ object moves into Risk Assessment
→ result moves into Risk Register
→ treatment decision moves into Risk Treatment Plan
→ relationship continues into SoA / Control / Evidence.

This visual movement is important to the educational concept.

================================================== 4. CONTROL EXPLORER
==================================================

Create the architecture and UI for exploring Annex A controls.

DO NOT manually populate all 93 Annex A controls in v1.

Use a small sample set sufficient to demonstrate the experience.

The architecture must allow the full control set to be added later as structured data.

A selected control should eventually support information such as:

- control title
- control category
- purpose
- related risks
- related policies
- typical implementation examples
- typical evidence
- related artefacts
- audit questions

For v1, focus on architecture and interaction rather than complete content coverage.

================================================== 5. AUDIT MODE
==================================================

Build a lightweight prototype.

This should help the learner understand the difference between:

"a control exists"

and

"I can demonstrate that the control is operating."

Example interaction:

Application shows:

"How would you demonstrate that this control is implemented?"

Then reveal possible evidence examples.

Examples might include:

- configuration screenshots
- system reports
- logs
- approved procedures
- tickets
- review records
- meeting records
- access reviews
- training records

Do not turn this into a full quiz platform yet.

The purpose is to teach:

CONTROL
→ IMPLEMENTATION
→ EVIDENCE
→ ASSURANCE.

==================================================
LEARNING PANEL
==================================================

Create a reusable learning panel.

When a learner clicks an object, display information such as:

Title

Type:
Requirement / Control / Artefact / Activity / Evidence

What is this?

Why does it exist?

Where does it come from?

What feeds into it?

What does it feed into?

Typical owner

Relevant ISO 27001 clause(s)

Relevant Annex A relationship

Typical evidence

Potential auditor question

Common mistake / misunderstanding

Keep explanations concise and practical.

Avoid unnecessarily academic language.

The product should make ISO easier to understand, not more complicated.

==================================================
DATA ARCHITECTURE
==================================================

The application must be data-driven.

Do not hardcode separate page logic for each individual concept.

Keep educational data separate from rendering logic.

Use structured TypeScript data.

Suggested conceptual structures:

clauses
controls
nodes
relationships
artefacts
scenarios
scenarioSteps
evidenceExamples
auditQuestions

Example:

Node {
id
type
title
shortDescription
description
purpose
typicalOwner
clauseRefs
controlRefs
evidenceExamples
auditQuestions
misconceptions
}

Relationship {
id
source
target
relationshipType
label
explanation
}

Scenario {
id
title
description
steps
}

ScenarioStep {
id
order
title
activeNodes
activeRelationships
explanation
artefactChanges
}

Control {
id
title
category
purpose
relatedNodes
evidenceExamples
auditQuestions
}

Clause {
id
number
title
summary
relatedNodes
}

Use a structure where additional:

- scenarios,
- controls,
- clauses,
- evidence examples,
- artefacts

can later be added without rebuilding the visualisation logic.

==================================================
TECHNICAL DIRECTION
==================================================

Use the 10xDevs Astro starter intelligently.

Preferred stack:

- Astro
- TypeScript
- existing starter styling system
- existing starter components where appropriate
- client-side JavaScript only where interaction requires it

Do NOT add React/Vue/Svelte unless the starter already depends on one and it provides a clear practical benefit.

Do not add a framework merely because it is familiar.

GRAPH / FLOW VISUALISATION

You may introduce a graph or flow library if it materially improves:

- node positioning
- relationship rendering
- interaction
- animation
- responsiveness

However:

- do not add a very large dependency unnecessarily,
- first inspect whether the existing starter architecture can handle the visualisation cleanly,
- choose maintainability over novelty.

==================================================
STATIC APPLICATION REQUIREMENT
==================================================

The MVP must work fully without a backend.

All content should be local.

The application must still function after refresh.

No authentication required.

No database required.

No network service required.

No API calls required for core functionality.

It should be possible to build and deploy the application as a static website.

==================================================
EDUCATIONAL ACCURACY
==================================================

Accuracy matters.

Do NOT:

- reproduce copyrighted ISO standard text verbatim,
- imply every company needs identical documentation,
- imply every Annex A control must always be implemented,
- portray Annex A as a simple mandatory checklist,
- treat every ISMS as an identical linear workflow,
- confuse ISO clauses with Annex A controls,
- confuse controls with evidence,
- confuse a policy with implementation,
- confuse implementation with proof of implementation.

Use original summaries and explanations.

Clearly distinguish:

1. ISO 27001 management system requirements
2. Annex A controls
3. organisational artefacts
4. operational implementation
5. evidence
6. assurance / audit activity

STATEMENT OF APPLICABILITY

Treat the Statement of Applicability carefully.

Do not portray it simply as:

"choose some controls and list them."

Show its relationship with:

- organisational requirements,
- information security risks,
- risk treatment,
- control applicability,
- justification,
- implementation status.

RISK

Also show that ISO 27001 risk management is not simply:

"find technical vulnerability → fix vulnerability."

The app should eventually support organisational, supplier, people, physical and technology risks.

For v1, the laptop encryption example is sufficient.

==================================================
UX PRINCIPLE
==================================================

The key educational question is:

"Where did this come from and what happens because of it?"

Every important visual object should help answer this.

For example:

RISK REGISTER

Where did this come from?
→ risk identification and assessment.

What happens because of it?
→ treatment decisions.

RISK TREATMENT

Where did this come from?
→ evaluated risks.

What happens because of it?
→ treatment actions / control decisions.

STATEMENT OF APPLICABILITY

Where did this come from?
→ organisational context, requirements, risk treatment and control applicability decisions.

What happens because of it?
→ provides a structured statement of control applicability and implementation justification.

EVIDENCE

Where did this come from?
→ implementation / operation of a control.

What happens because of it?
→ enables monitoring, audit and assurance.

FINDING

Where did this come from?
→ audit / monitoring / review identified a gap.

What happens because of it?
→ corrective action.

This cause-and-effect model is central to the product.

==================================================
MVP PRIORITIES
==================================================

Prioritise in this order:

1. educational clarity
2. visual clarity
3. relationship modelling
4. interaction quality
5. scenario quality
6. responsive behaviour
7. code maintainability

Do NOT prioritise:

- authentication
- commercial SaaS features
- backend architecture
- user management
- persistence
- billing
- reporting dashboards

The objective is NOT maximum feature quantity.

The objective is to answer one question extremely well:

"Can an interactive visualisation make ISO 27001 easier to understand than a training slide or a folder full of documents?"

==================================================
FIRST IMPLEMENTATION TARGET
==================================================

The strongest part of the MVP must be this complete mental model:

Risk
→ Risk Assessment
→ Risk Register
→ Risk Treatment
→ Statement of Applicability
→ Control
→ Implementation
→ Evidence
→ Monitoring / Audit
→ Finding
→ Corrective Action
→ Verification
→ Continual Improvement

I should be able to visually understand:

- why every part exists,
- what created it,
- what it influences,
- how information changes as it moves through the ISMS.

==================================================
WORKING METHOD
==================================================

Do not immediately generate random UI.

First inspect the forked starter.

Then work in this order:

PHASE 1 — STARTER REVIEW

1. inspect repository structure
2. inspect package.json
3. inspect existing page/layout architecture
4. inspect styling system
5. inspect existing reusable components
6. identify starter functionality that is irrelevant
7. confirm the project can remain frontend-only

PHASE 2 — PRODUCT ARCHITECTURE

Design:

- routes/views
- data model
- node types
- relationship types
- scenario architecture
- state management approach
- visualisation strategy

Keep architecture appropriately simple for an MVP.

PHASE 3 — VISUAL FOUNDATION

Implement:

- app shell
- navigation
- responsive layout
- dark visual identity
- reusable learning panel
- reusable node system
- relationship visualisation

PHASE 4 — EDUCATIONAL CONTENT

Implement:

- clauses 4–10 overview
- sample artefacts
- sample relationships
- initial Annex A sample controls
- practical explanations

PHASE 5 — PRIMARY SCENARIO

Implement the complete:

Laptop encryption not consistently enforced

scenario from issue identification through continual improvement.

Make this polished.

PHASE 6 — SECONDARY VIEWS

Implement:

- ISMS Map
- Document Flow
- Control Explorer prototype
- Audit Mode prototype

PHASE 7 — QUALITY

Verify:

- responsive layout
- keyboard usability where practical
- no broken interactions
- no console errors
- no dead navigation
- build passes
- static deployment works

==================================================
DO NOT STOP AT SCAFFOLDING
==================================================

Do not finish after generating:

- directories,
- placeholder cards,
- empty routes,
- TODO sections.

Deliver a working first version that can actually be opened and explored.

The application should demonstrate the product concept clearly enough that I can judge whether this way of visualising ISO 27001 genuinely helps learning.

==================================================
FINAL VERIFICATION
==================================================

Before finishing:

1. run the appropriate install/build/check commands,
2. fix build errors,
3. fix obvious runtime errors,
4. verify navigation,
5. verify the scenario controls,
6. verify responsive behaviour,
7. confirm no backend/auth/database dependency was introduced.

Then report:

- repository created/forked
- architecture chosen
- what was implemented
- major files created or modified
- how the visualisation works
- how the scenario works
- how to run locally
- build/check results
- known limitations
- intentionally deferred features

INTENTIONALLY OUT OF SCOPE

Explicitly leave these for later:

- authentication
- user accounts
- databases
- saving user progress
- organisation-specific ISMS data
- uploading real documents
- complete 93-control Annex A dataset
- full audit simulation
- certification tracking
- commercial SaaS functionality
- billing

Do not implement them during this task.

SUCCESS CRITERIA

The task is successful if I can open the application and intuitively understand:

"Something happens in the organisation.
It creates or changes a risk.
That risk is assessed.
The assessment drives treatment.
Treatment relates to control decisions.
Controls are implemented.
Implementation creates evidence.
Evidence can be tested.
Testing can create findings.
Findings create corrective actions.
Corrective actions feed improvement."

The app should make that chain visually obvious.
