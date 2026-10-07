# Visualize ISO 27001

This is a static educational application. The user brief in docs/BRIEF.md sets the scope.

Keep educational content in src/data and graph layout in src/data/layouts.ts. Rendering components consume these structures; avoid concept-specific rendering branches.

Use the existing Astro layout, React island and Tailwind token system. Components use named exports and the starter cn helper for conditional classes.

Keep all learner state in memory and use URL hashes for view navigation. The built dist directory must function from a plain static HTTP server, without secrets or external requests.

Before shipping, run npm run verify and check playback, node selection, navigation, evidence reveal and narrow-screen behaviour in a browser. Data changes must keep node/control/relationship references valid and scenario transitions connected.

Write original explanations. Distinguish requirements, controls, implementation and evidence. Treat document names and numerical risk scores as illustrative examples, and preserve meaningful feedback loops.
