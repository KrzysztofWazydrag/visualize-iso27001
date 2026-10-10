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

## Risk treatment extension — 10 October 2026

`npm run verify` passed after the extension: clean ESLint; Astro/strict TypeScript checked 31 files with zero errors, warnings or hints; all 18 model tests passed; one static page built successfully. No dependency or runtime-service changes were introduced.

The six additional model tests cover trail adjacency, both scenario graphs and real relationships, autoplay and jump boundaries, feedback without adopting alternative answers, selected mitigation unlocking treatment/SoA/verified closure, and choice isolation across revisiting, restart, replay and scenario switching.

Browser acceptance used the static production output in Chrome:

- The selector opens the 18-step physical-access story and returns to the 21-step laptop story at step 1 with Play available.
- Accept, Transfer and Avoid each show their own contextual feedback while Next and future steps remain disabled. Enter selects Mitigate and unlocks continuation; step 13 and the final step are reachable. Restart clears the decision.
- Autoplay from step 11 at 2× stops at step 12, with Play/Next and future steps disabled until the continuing choice is selected.
- Clause 6 exposes the shared treatment trail. Clicking its Document Flow treatment-plan button updates the learning panel; the focus checkbox allows the wider graph to be explored.
- At 390 × 844 the choice UI and trail stack vertically, the scenario selector works and the page has no horizontal overflow. The Document Flow layout was also inspected at 1440 × 1000. Temporary viewport overrides were reset.
- No application console errors or warnings were captured in these flows.

These checks verify functionality and practical keyboard operation, not a full assistive-technology audit or independent educational-content certification.
