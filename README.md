# Visualize ISO 27001

An interactive ISMS engine room for learning how risks, control decisions, implementation, evidence and improvement connect. This is a frontend-only educational application built from a new fork of [the 10xDevs Astro starter](https://github.com/przeprogramowani/10x-astro-starter).

## Run locally

Use Node 24 (see `.nvmrc`), then:

```bash
npm ci
npm run dev
```

Open the local URL shown by Astro, normally `http://localhost:4321`.

```bash
npm run verify    # lint, strict Astro/TypeScript check, 18 model/playback tests, static build
npm run preview   # serve the production build
```

No `.env` file, secrets, login or external service is needed. Fonts and all learning content are bundled locally. Runtime state is held in memory; refreshing resets the simulation while retaining the view hash.

## Explore

- **ISMS Map:** clauses 4–10 and the separate Annex A reference set. Select nodes to explore incoming/outgoing relationships and practical explanations.
- **Document Flow:** 28 connected concepts with meaningful relationships, highlighted selected connections and feedback loops. A clickable treatment trail and focused graph connect assessed risk, the register, treatment decision and plan, control selection, Annex A cross-check, SoA, implementation, evidence and effectiveness review. Clause 6 links to the same trail.
- **Scenario Mode:** two fictional guided stories: the 21-step laptop-encryption example and **The missing justification**, an 18-step physical-access scenario. Step 12 in the new story offers Accept / Mitigate / Transfer / Avoid with contextual feedback. Playback and future-step jumps wait for the narrative’s justified treatment choice; restart, replay and switching stories clear choices. Play/Pause, Previous/Next, Restart, phase jumps, step jumps and speed control. Active paths carry animated information packets. The information ledger shows simulated changes accumulating in artefacts.
- **Control Explorer:** 10 sample controls, including physical security A.7.1–A.7.4, across all four Annex A categories. Search/filter, implementation examples, risks, policies, evidence and audit questions.
- **Audit Mode:** 3 lightweight evidence exercises on encryption, asset inventory and training. Reveal examples and discuss what they prove, their limitations and how to gain assurance.

Nodes are keyboard-operable buttons. The graph viewport supports scrolling and zoom; a searchable node directory provides an alternative. Narrow screens stack the learning panel below the visualisation and allow native graph panning. The guide dialog traps focus and closes with Escape. Reduced-motion preferences suppress the travelling animation.

## Architecture and main files

Astro produces one static HTML page with a React learning island. React, Tailwind and the Button/cn components already existed in the starter; no additional UI or graph framework was added. Hash views work on ordinary static hosting without rewrite rules. There is no runtime API.

| Location                                    | Responsibility                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `src/types.ts`                              | Educational and visualisation contracts                                                |
| `src/data/`                                 | Nodes, relationships, clauses, controls, audit examples, scenarios and layout metadata |
| `src/components/engine/EngineRoom.tsx`      | Shell, navigation and shared state                                                     |
| `src/components/engine/Graph.tsx`           | Shared button/SVG visualisation with active paths and animated packets                 |
| `src/components/engine/LearningPanel.tsx`   | Concise learning detail and navigable relationships                                    |
| `src/components/engine/ScenarioPlayer.tsx`  | Playback controls, phase navigation and artefact change ledger                         |
| `src/components/engine/ControlExplorer.tsx` | Data-driven control search and filtering                                               |
| `src/components/engine/AuditMode.tsx`       | Implementation → evidence → assurance exercises                                        |
| `src/lib/graph.ts`                          | Routes connections through layout gutters                                              |
| `src/lib/state.ts`, `src/lib/playback.ts`   | Bounded playback and cumulative simulated artefact state                               |
| `src/styles/global.css`                     | Original dark design using the starter’s CSS token approach                            |
| `tests/model.test.ts`                       | Reference integrity, content scope, feedback and playback acceptance tests             |
| `docs/ARCHITECTURE.md`                      | Starter inspection and implementation decisions                                        |
| `docs/VERIFICATION.md`                      | Build, browser and responsive verification record                                      |

To add a control, append a structured record in `src/data/controls.ts`; it automatically appears in the explorer and learning panel. To add a scenario, provide ordered steps referencing existing node/relationship IDs, then register it in `src/data/scenarios.ts`. Add its graph layout to `src/data/layouts.ts`. The scenario selector uses the registry; optional `ScenarioDecision` records define the options, feedback and choice that continues the guided narrative. The reducer and ledger both enforce unresolved decision boundaries. Additional graph concepts require an educational record, meaningful relationships and a position in the chosen layout. Run the model tests to catch broken references.

## Static deployment

`npm run build` creates `dist/`. Serve its contents with any ordinary static website host. For example:

```bash
python3 -m http.server 4321 --directory dist
```

The default configuration serves at a domain root. For hosting under a path such as `/visualize-iso27001/`, set Astro’s `base` option to that path and rebuild. Navigation uses hashes and the favicon uses `BASE_URL`.

Starter authentication, Supabase packages/configuration, middleware, API routes, protected dashboard, server adapter, Wrangler configuration, environment schema and auth CI have been removed. CI installs dependencies and verifies the static application without repository secrets.

## Educational boundaries and references

Content uses original practical summaries. It distinguishes management-system requirements, control references, artefacts, operational measures, evidence and assurance. Names, owners, timings, company facts and scores in the scenario are fictional examples. The risk matrix is an example, not an ISO-prescribed formula. An ISMS has multiple paths and feedback loops; each scenario is one teaching narrative. Controls can address multiple risks and legal or contractual obligations. A missing one-to-one risk link alone does not establish a nonconformity; the second story supplies evidence of an omitted assessment input and absent selection rationale. Transfer does not remove the organisation’s information-protection responsibilities.

The SoA explains necessary controls, inclusion reasons, implementation status and reasons for excluding Annex A references. Necessary custom controls can also be included. The full set of Annex A references must be considered for omissions; controls are not all automatically required.

Primary references checked while preparing content:

- [ISO/IEC 27001 overview](https://www.iso.org/standard/27001)
- [SC 27-hosted SoA auditing practices discussion](https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf) — educational discussion paper, not endorsed normative guidance.
- [Astro static deployment documentation](https://docs.astro.build/en/guides/deploy/)
- [Astro React integration documentation](https://docs.astro.build/en/guides/integrations-guide/react/)

This application does not reproduce the ISO standard and is not a compliance or certification assessment.

## Limitations and intentionally deferred work

The graph uses deterministic layouts and native scrolling rather than drag-to-rearrange nodes. Relationships are an explanatory sample, not an exhaustive representation of every organisation. Two scenarios, ten control references and three evidence exercises are included. The full standard remains the authoritative source; a qualified content review would be useful before broader educational publication.

Intentionally deferred: full 93-control dataset, more scenarios, full audit simulation, certification tracking, saving learner progress, real documents or organisation-specific ISMS data. Authentication, user accounts, databases, backend persistence, organisation management, commercial SaaS features and billing are outside this MVP.

## Starter attribution

The upstream starter README declares an MIT license. This project preserves its Git history and records the upstream commit in `docs/ARCHITECTURE.md`. No SiteCrew repository or project files were used or modified.
