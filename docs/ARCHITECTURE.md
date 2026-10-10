# Starter review and implementation decisions

## Phase 1 — starter review

Upstream: przeprogramowani/10x-astro-starter, commit 4c0b8a0aa09ad74eba612d5df9f3fbefdeb94fef. Created a new GitHub fork named visualize-iso27001; this checkout tracks that fork as origin and the starter as upstream. No SiteCrew files were used.

The starter has Astro 7 file-based pages, a shared Astro layout, React 19 islands, strict TypeScript, Tailwind 4 with CSS-variable theme tokens, shadcn Button, cn class helper, ESLint/Prettier and CI. Its welcome page, Supabase middleware, auth forms/endpoints, protected dashboard, configuration warnings, server adapter and auth smoke test are unrelated to this learning tool.

Reuse: Astro layout/page architecture, React integration, theme token convention, Button, cn, strict TypeScript and formatting/lint tooling. Remove all auth routes, middleware, Supabase files/packages, Cloudflare adapter/config, secret schema and auth CI. Set Astro output to static. No environment setup or network services are needed at runtime.

## Phase 2 — product architecture

- One statically rendered Astro page mounts one React learning island. Five hash-addressable views: map, documents, scenario, controls, audit. Hash routes work on plain static hosting and browser back/forward.
- src/types.ts defines typed nodes, relationships, clauses, controls, scenarios and audit prompts. src/data owns all educational content. Positions are presentation metadata independent of educational relationships.
- One graph component renders HTML button nodes over SVG relationship paths. The full document network has all artefacts; the map shows clauses 4–10 and a separate Annex A reference node; the scenario uses a curated core network. Nodes share a learning panel, and inbound/outbound relationships are derived from the graph.
- React local state handles selection, filters, zoom, playback, evidence reveal and view. No graph library is needed for three small deterministic layouts. Graph canvases pan by native scrolling; node lists provide an accessible alternative, especially on mobile.
- Scenario steps reference real node and relationship IDs, carry a learning explanation and structured simulated artefact changes, and animate a packet along active paths. Playback is bounded and pauses on manual navigation, view changes, page hiding and completion. State resets on refresh; the view hash survives.
- Document names, owners, scores, timelines and evidence are examples. Clause requirements and Annex A references remain distinct. Necessary controls can come from outside Annex A; the SoA captures inclusion, status and exclusion reasoning. Feedback paths connect monitoring/audit, correction, management review and risk reassessment.

## Verification

Use strict type checking, starter ESLint/Prettier, data integrity and playback transition tests, production static build, and browser interaction/responsive checks. Serve dist with an ordinary static HTTP server to demonstrate that there is no runtime backend.

## Risk treatment learning extension — 10 October 2026

- `src/data/learningPaths.ts` defines a shared clickable treatment trail. Clause 6 and Document Flow consume it; the graph can focus its real relationships while retaining the wider ISMS network. Treatment decision and control selection are explicit activity nodes, and the existing treatment-plan node connects the register with the chosen safeguards and SoA.
- Scenarios are registered in `src/data/scenarios.ts`, with per-story layouts in `src/data/layouts.ts` and a shared typed step builder in `src/data/scenarioSteps.ts`. The new physical-access narrative lives in `src/data/missingJustification.ts`; its A.7.1–A.7.4 references share the existing control explorer and learning panel.
- Optional decisions belong to scenario content. Choice state belongs to the selected simulation. A single unresolved-decision calculation gates playback, navigation and cumulative artefact snapshots, so later treatment records cannot appear before the learner chooses the response used by this story. Non-continuing answers give contextual feedback without adopting them as treatment. Restart, replay and scenario selection reset answers; view navigation pauses playback.
- The story validates and justifies existing safeguards rather than inventing historical decisions. Obligations remain assessment inputs; controls need not have a one-to-one relationship with risks. Mitigation is appropriate for the stated business need, exposure and acceptance threshold, not a universal answer for every ISMS.
