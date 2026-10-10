import type { View, Scenario } from "../types";
import { nextStep, firstUnresolvedDecision } from "./playback";
export interface AppState {
  view: View;
  selected: string;
  stepIndex: number;
  playing: boolean;
  scenarioId: string;
  choices: Record<string, string>;
}
export type AppAction =
  | { type: "view"; view: View }
  | { type: "select"; id: string }
  | { type: "move"; direction: -1 | 1 }
  | { type: "jump"; index: number }
  | { type: "tick" }
  | { type: "toggle" }
  | { type: "restart" }
  | { type: "pause" };
export type ScenarioAction = { type: "scenario"; scenario: Scenario } | { type: "choose"; optionId: string };
export const initialState: AppState = {
  view: "map",
  selected: "clause-6",
  stepIndex: 0,
  playing: false,
  scenarioId: "laptop-encryption",
  choices: {},
};
export function reduceState(state: AppState, action: AppAction | ScenarioAction, scenario: Scenario): AppState {
  const last = scenario.steps.length - 1;
  function stepState(index: number, playing = false) {
    const gate = firstUnresolvedDecision(scenario, state.choices);
    const safe = Math.max(0, Math.min(last, index, gate));
    const active = scenario.steps[safe].activeNodes;
    return {
      ...state,
      stepIndex: safe,
      selected: active[active.length - 1],
      playing: playing && safe < last && safe < gate,
    };
  }
  switch (action.type) {
    case "view": {
      if (action.view === state.view) return state;
      const selected =
        action.view === "scenario"
          ? scenario.steps[state.stepIndex].activeNodes[0]
          : action.view === "controls" || action.view === "audit"
            ? "A.8.24"
            : action.view === "documents"
              ? "register"
              : "clause-6";
      return { ...state, view: action.view, playing: false, selected };
    }
    case "select":
      return { ...state, selected: action.id };
    case "move":
      return stepState(nextStep(state.stepIndex, scenario.steps.length, action.direction));
    case "jump":
      return stepState(action.index);
    case "tick":
      return state.playing ? stepState(nextStep(state.stepIndex, scenario.steps.length, 1), true) : state;
    case "toggle":
      if (state.stepIndex === last) return { ...stepState(0, true), choices: {} };
      if (state.stepIndex >= firstUnresolvedDecision(scenario, state.choices)) return { ...state, playing: false };
      return { ...state, playing: !state.playing };
    case "restart":
      return { ...stepState(0), choices: {} };
    case "pause":
      return { ...state, playing: false };
    case "scenario":
      return {
        ...state,
        scenarioId: action.scenario.id,
        stepIndex: 0,
        playing: false,
        choices: {},
        selected: action.scenario.steps[0].activeNodes[0],
      };
    case "choose": {
      const step = scenario.steps[state.stepIndex];
      if (!step.decision?.options.some((option) => option.id === action.optionId)) return state;
      return { ...state, playing: false, choices: { ...state.choices, [step.id]: action.optionId } };
    }
  }
}
