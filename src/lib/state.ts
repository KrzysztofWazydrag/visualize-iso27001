import type { View, Scenario } from "../types";
import { nextStep } from "./playback";
export interface AppState {
  view: View;
  selected: string;
  stepIndex: number;
  playing: boolean;
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
export const initialState: AppState = { view: "map", selected: "clause-6", stepIndex: 0, playing: false };
export function reduceState(state: AppState, action: AppAction, scenario: Scenario): AppState {
  const last = scenario.steps.length - 1;
  function stepState(index: number, playing = false) {
    const safe = Math.max(0, Math.min(last, index));
    const active = scenario.steps[safe].activeNodes;
    return { ...state, stepIndex: safe, selected: active[active.length - 1], playing: playing && safe < last };
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
      return state.stepIndex === last ? stepState(0, true) : { ...state, playing: !state.playing };
    case "restart":
      return stepState(0);
    case "pause":
      return { ...state, playing: false };
  }
}
