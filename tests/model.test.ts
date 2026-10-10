import { test } from "node:test";
import assert from "node:assert/strict";
import { nodes, nodeById, artefactNodes } from "../src/data/nodes";
import { clauses } from "../src/data/clauses";
import { controls } from "../src/data/controls";
import { relationships, relationshipById } from "../src/data/relationships";
import { laptopScenario, scenarios } from "../src/data/scenarios";
import {
  documentLayout,
  mapLayout,
  scenarioLayout,
  scenarioLayouts,
  NODE_WIDTH,
  NODE_HEIGHT,
} from "../src/data/layouts";
import { treatmentJourney } from "../src/data/learningPaths";
import { missingJustificationScenario } from "../src/data/missingJustification";
import { auditPrompts } from "../src/data/audit";
import { initialState, reduceState } from "../src/lib/state";
import { snapshotAt, firstUnresolvedDecision } from "../src/lib/playback";

await test("every concept has a unique identity and usable learning content", () => {
  assert.equal(new Set(nodes.map((n) => n.id)).size, nodes.length);
  nodes.forEach((n) => {
    assert.ok(n.description.length > 20 && n.purpose.length > 20, n.id);
    assert.ok(
      n.typicalOwner &&
        n.clauseRefs.length &&
        n.evidenceExamples.length &&
        n.auditQuestions.length &&
        n.misconceptions.length,
      n.id,
    );
    n.controlRefs.forEach((id) => {
      assert.ok(
        controls.some((c) => c.id === id),
        id,
      );
    });
    n.clauseRefs.forEach((ref) => {
      assert.ok(
        clauses.some((c) => c.number === ref.split(".")[0]),
        ref,
      );
    });
  });
});
await test("requirements, the reference set and the limited control dataset stay distinct", () => {
  assert.deepEqual(
    clauses.map((c) => c.number),
    ["4", "5", "6", "7", "8", "9", "10"],
  );
  assert.ok(clauses.every((c) => nodeById[c.id].type === "requirement"));
  assert.equal(nodeById.annex.type, "control");
  assert.ok(controls.length >= 10 && controls.length < 93);
  assert.equal(new Set(controls.map((c) => c.category)).size, 4);
  [...clauses, ...controls].forEach((c) => {
    c.relatedNodes.forEach((id) => {
      assert.ok(nodeById[id], id);
    });
  });
});
await test("all relationships connect real concepts and explain their meaning", () => {
  assert.equal(new Set(relationships.map((r) => r.id)).size, relationships.length);
  relationships.forEach((r) => {
    assert.ok(Object.hasOwn(nodeById, r.source) && Object.hasOwn(nodeById, r.target), r.id);
    assert.ok(r.label && r.explanation.length > 20, r.id);
  });
});
await test("layouts cover the educational scope and keep nodes in bounds", () => {
  [documentLayout, mapLayout, ...Object.values(scenarioLayouts)].forEach((layout) => {
    assert.equal(new Set(layout.positions.map((p) => p.id)).size, layout.positions.length);
    layout.positions.forEach((p) => {
      assert.ok(nodeById[p.id], p.id);
      assert.ok(p.x >= 0 && p.y >= 0 && p.x + NODE_WIDTH <= layout.width && p.y + NODE_HEIGHT <= layout.height, p.id);
    });
  });
  artefactNodes.forEach((n) => {
    assert.ok(
      documentLayout.positions.some((p) => p.id === n.id),
      n.id,
    );
  });
  clauses.forEach((c) => {
    assert.ok(
      mapLayout.positions.some((p) => p.id === c.id),
      c.id,
    );
  });
});
await test("all 21 scenario steps reference visible nodes and actual active relationships", () => {
  assert.equal(laptopScenario.steps.length, 21);
  laptopScenario.steps.forEach((s, index) => {
    assert.equal(s.order, index + 1);
    assert.ok(s.explanation && s.takeaway && s.packet && s.artefactChanges.length, s.id);
    s.activeNodes.forEach((id) => {
      assert.ok(
        scenarioLayout.positions.some((p) => p.id === id),
        `${s.id}: ${id}`,
      );
    });
    s.activeRelationships.forEach((id) => {
      const edge = relationshipById[id];
      assert.ok(edge, id);
      assert.ok(s.activeNodes.includes(edge.source) && s.activeNodes.includes(edge.target), `${s.id}: ${id}`);
    });
    s.artefactChanges.forEach((change) => {
      assert.ok(nodeById[change.artefact], change.artefact);
    });
  });
});
await test("the management system includes risk reassessment and ineffective-action feedback", () => {
  assert.ok(relationshipById["verification--assessment"].feedback);
  assert.ok(relationshipById["verification--corrective"].feedback);
  assert.ok(relationshipById["improvement--identification"].feedback);
  assert.ok(relationshipById["clause-10--clause-6"].feedback);
});
await test("the scenario evolves evidence, finding closure and residual risk rather than claiming a perfect system", () => {
  const before = snapshotAt(laptopScenario, 14);
  const after = snapshotAt(laptopScenario, 20);
  assert.equal(before.find((c) => c.artefact === "finding" && c.field === "NC-003")?.value.startsWith("Open"), true);
  assert.equal(after.find((c) => c.artefact === "finding" && c.field === "NC-003")?.value.startsWith("Closed"), true);
  assert.equal(
    after.find((c) => c.artefact === "soa" && c.field === "A.8.24")?.value,
    "Implemented · coverage verified",
  );
  assert.match(after.find((c) => c.field === "Residual assessment")?.value ?? "", /owner accepted/);
  assert.equal(after.filter((c) => c.artefact === "implementation" && c.field === "Coverage").length, 1);
});
await test("playback finishes at the final step and can replay cleanly", () => {
  let state = reduceState(initialState, { type: "view", view: "scenario" }, laptopScenario);
  state = reduceState(state, { type: "toggle" }, laptopScenario);
  assert.equal(state.playing, true);
  for (let i = 0; i < 30; i++) state = reduceState(state, { type: "tick" }, laptopScenario);
  assert.equal(state.stepIndex, 20);
  assert.equal(state.playing, false);
  state = reduceState(state, { type: "toggle" }, laptopScenario);
  assert.equal(state.stepIndex, 0);
  assert.equal(state.playing, true);
});
await test("manual navigation pauses playback and stays within scenario bounds", () => {
  let state = reduceState(
    { ...initialState, view: "scenario", playing: true },
    { type: "move", direction: -1 },
    laptopScenario,
  );
  assert.equal(state.stepIndex, 0);
  assert.equal(state.playing, false);
  state = reduceState(state, { type: "jump", index: 100 }, laptopScenario);
  assert.equal(state.stepIndex, 20);
  state = reduceState(state, { type: "move", direction: 1 }, laptopScenario);
  assert.equal(state.stepIndex, 20);
  state = reduceState(state, { type: "restart" }, laptopScenario);
  assert.equal(state.stepIndex, 0);
  assert.equal(state.selected, laptopScenario.steps[0].activeNodes[0]);
});
await test("view changes pause playback while retaining the scenario position", () => {
  const state = reduceState(
    { ...initialState, view: "scenario", stepIndex: 12, playing: true },
    { type: "view", view: "controls" },
    laptopScenario,
  );
  assert.equal(state.playing, false);
  assert.equal(state.stepIndex, 12);
  assert.equal(state.selected, "A.8.24");
});
await test("pause prevents a pending timer tick advancing the scenario", () => {
  let state = reduceState({ ...initialState, view: "scenario", playing: true }, { type: "pause" }, laptopScenario);
  state = reduceState(state, { type: "tick" }, laptopScenario);
  assert.equal(state.stepIndex, 0);
});
await test("audit examples connect valid controls to implementation, evidence and assurance", () => {
  auditPrompts.forEach((prompt) => {
    assert.ok(controls.some((c) => c.id === prompt.controlId));
    assert.ok(prompt.implementation && prompt.assurance && prompt.pitfall && prompt.evidence.length >= 3);
  });
});
await test("the learning trail makes treatment and control selection precede the SoA", () => {
  const ids = treatmentJourney.steps.map((step) => step.nodeId);
  assert.deepEqual(ids.slice(0, 8), [
    "risk",
    "assessment",
    "register",
    "decision",
    "treatment",
    "selection",
    "annex",
    "soa",
  ]);
  treatmentJourney.relationships.forEach((id, index) => {
    const relationship = relationshipById[id];
    assert.ok(relationship, id);
    assert.equal(relationship.source, ids[index]);
    assert.equal(relationship.target, ids[index + 1]);
  });
  assert.match(treatmentJourney.note, /Requirements can also drive controls/);
});
await test("both scenarios have complete, visible and connected steps", () => {
  assert.deepEqual(
    scenarios.map((scenario) => scenario.steps.length),
    [21, 18],
  );
  scenarios.forEach((scenario) => {
    const layout = scenarioLayouts[scenario.id];
    assert.ok(layout);
    assert.equal(new Set(scenario.steps.map((step) => step.id)).size, scenario.steps.length);
    scenario.steps.forEach((step, index) => {
      assert.equal(step.order, index + 1);
      assert.ok(step.explanation && step.takeaway && step.packet && (step.artefactChanges.length || step.decision));
      step.activeNodes.forEach((id) => {
        assert.ok(
          layout.positions.some((position) => position.id === id),
          `${step.id}: ${id}`,
        );
      });
      step.activeRelationships.forEach((id) => {
        const relationship = relationshipById[id];
        assert.ok(relationship, id);
        assert.ok(
          step.activeNodes.includes(relationship.source) && step.activeNodes.includes(relationship.target),
          `${step.id}: ${id}`,
        );
      });
      step.artefactChanges.forEach((change) => {
        assert.ok(nodeById[change.artefact], change.artefact);
      });
      if (step.decision) {
        assert.equal(new Set(step.decision.options.map((option) => option.id)).size, step.decision.options.length);
        assert.ok(step.decision.options.some((option) => option.id === step.decision?.continueWith));
        step.decision.options.forEach((option) => {
          assert.ok(option.description && option.feedback);
        });
      }
    });
  });
});
await test("autoplay stops at the unanswered treatment choice and a paused tick cannot skip it", () => {
  const scenario = missingJustificationScenario;
  let state = reduceState(initialState, { type: "scenario", scenario }, laptopScenario);
  state = reduceState(state, { type: "toggle" }, scenario);
  for (let i = 0; i < 30; i++) state = reduceState(state, { type: "tick" }, scenario);
  assert.equal(state.stepIndex, 11);
  assert.equal(state.playing, false);
  state = reduceState(state, { type: "toggle" }, scenario);
  state = reduceState(state, { type: "move", direction: 1 }, scenario);
  state = reduceState(state, { type: "jump", index: 17 }, scenario);
  assert.equal(state.stepIndex, 11);
  assert.equal(state.playing, false);
});
await test("exploring the other treatment options cannot adopt mitigation or unlock later artefacts", () => {
  const scenario = missingJustificationScenario;
  let state = reduceState(initialState, { type: "scenario", scenario }, laptopScenario);
  state = reduceState(state, { type: "jump", index: 11 }, scenario);
  ["accept", "transfer", "avoid"].forEach((optionId) => {
    state = reduceState(state, { type: "choose", optionId }, scenario);
    state = reduceState(state, { type: "jump", index: 17 }, scenario);
    assert.equal(state.stepIndex, 11);
    assert.equal(firstUnresolvedDecision(scenario, state.choices), 11);
    const snapshot = snapshotAt(scenario, 17, state.choices);
    assert.equal(
      snapshot.some((change) => change.field === "R-027 plan"),
      false,
    );
    assert.match(
      snapshot.find((change) => change.field === "Learner treatment choice")?.value ?? "",
      /explored, not adopted/,
    );
    assert.match(snapshot.find((change) => change.field === "NC-004")?.value ?? "", /^Open/);
  });
  const unchanged = reduceState(state, { type: "choose", optionId: "unknown" }, scenario);
  assert.deepEqual(unchanged, state);
});
await test("choosing mitigation unlocks a justified plan, SoA and verified closure", () => {
  const scenario = missingJustificationScenario;
  let state = reduceState(initialState, { type: "scenario", scenario }, laptopScenario);
  state = reduceState(state, { type: "jump", index: 11 }, scenario);
  state = reduceState(state, { type: "choose", optionId: "mitigate" }, scenario);
  state = reduceState(state, { type: "move", direction: 1 }, scenario);
  assert.equal(state.stepIndex, 12);
  state = reduceState(state, { type: "jump", index: 17 }, scenario);
  assert.equal(state.stepIndex, 17);
  const snapshot = snapshotAt(scenario, state.stepIndex, state.choices);
  assert.match(snapshot.find((change) => change.field === "R-027 plan")?.value ?? "", /approval and review criteria/);
  assert.match(
    snapshot.find((change) => change.field === "A.7.1–A.7.4")?.value ?? "",
    /R-027.*mitigation.*commitment.*verified/,
  );
  assert.match(snapshot.find((change) => change.field === "NC-004")?.value ?? "", /^Closed/);
  assert.match(snapshot.find((change) => change.field === "Residual assessment")?.value ?? "", /owner accepted/);
});
await test("revisiting a choice, restarting, replaying and switching scenarios do not leak decisions", () => {
  const scenario = missingJustificationScenario;
  let state = reduceState(initialState, { type: "scenario", scenario }, laptopScenario);
  state = reduceState(state, { type: "jump", index: 11 }, scenario);
  state = reduceState(state, { type: "choose", optionId: "mitigate" }, scenario);
  state = reduceState(state, { type: "jump", index: 17 }, scenario);
  state = reduceState(state, { type: "jump", index: 11 }, scenario);
  state = reduceState(state, { type: "choose", optionId: "accept" }, scenario);
  state = reduceState(state, { type: "move", direction: 1 }, scenario);
  assert.equal(state.stepIndex, 11);
  state = reduceState(state, { type: "restart" }, scenario);
  assert.equal(state.stepIndex, 0);
  assert.deepEqual(state.choices, {});
  state = reduceState(state, { type: "jump", index: 11 }, scenario);
  state = reduceState(state, { type: "choose", optionId: "mitigate" }, scenario);
  state = reduceState(state, { type: "jump", index: 17 }, scenario);
  state = reduceState(state, { type: "toggle" }, scenario);
  assert.equal(state.stepIndex, 0);
  assert.equal(state.playing, true);
  assert.deepEqual(state.choices, {});
  state = reduceState(state, { type: "scenario", scenario: laptopScenario }, scenario);
  assert.equal(state.scenarioId, laptopScenario.id);
  assert.equal(state.playing, false);
  assert.equal(state.stepIndex, 0);
  assert.deepEqual(state.choices, {});
  state = reduceState(state, { type: "jump", index: 20 }, laptopScenario);
  assert.equal(state.stepIndex, 20);
});
