# MVP verification — 7 October 2026

Verified the production `dist/` output served with Python's ordinary static HTTP server. The application runs without a runtime backend or external data requests.

## Automated checks

`npm run verify` passed:

- ESLint: clean.
- Astro/strict TypeScript: 26 files, 0 errors, 0 warnings, 0 hints.
- 12 model tests: all passed. Cover unique IDs, complete references, required artefacts, clauses and control categories, meaningful relationships and feedback loops, layout coverage, 21 ordered scenario steps, active edge/node consistency, cumulative artefact changes, audit references and playback boundaries.
- Production build: one static HTML page and bundled client assets; no server output.
- Dependency audit after applying compatible starter dependency patches: 0 known vulnerabilities.

## Browser acceptance checks

- All five navigation views open, and browser back/forward and refresh retain the hash view.
- Document Flow exposes 26 concepts. Selecting the Statement of Applicability and other nodes updates their explanation and incoming/outgoing relationships.
- Every one of the 21 scenario step buttons selects its matching title and active relationships. The last step disables Next and offers Replay.
- Play progresses automatically; Pause stops playback; Previous/Next, Restart and speed selection work. The first step disables Previous. Active paths carry information packets.
- The artefact ledger accumulates risk, treatment, implementation, evidence, finding and improvement changes. Closure follows effectiveness verification and remaining-risk reassessment.
- Control category filtering, control ID search, empty results and clearing filters work.
- Encryption evidence reveals four examples; switching to the inventory exercise resets the reveal and displays three examples when opened.
- Label toggle, panel hide/reopen and the searchable node directory work.
- Enter activates scenario Next and opens the learning guide. Escape closes the native dialog and returns focus to its trigger.
- Desktop layouts inspected, including map, scenario and audit views. At a 390 × 844 mobile viewport there is no horizontal page overflow; the graph pans inside its own scrolling region and learning content stacks below it. Mobile scenario controls and dialog work.
- Browser console: no application errors or warnings observed during the checked flows.

## Scope and limits of verification

Source, dependencies, configuration and CI were checked for removed authentication, Supabase/database, API, server-adapter and environment configuration. Fonts and educational data are local. This is functional browser verification with practical keyboard checks, not a full assistive-technology or cross-browser certification. Primary-source review informed the original educational summaries; this is not independent certification of the educational content.

Local screenshots from verification are kept in the ignored `docs/screenshots/` directory. The README records run commands, deployment instructions and deferred features.
