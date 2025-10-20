import { EventEmitter } from "events";

type Part = {
  playing: boolean;
};

export type Drums = Part & { mask: string; markovStates: Array<Array<number>> };
export type Drone = Part;
export type Perc = Part;
export type Synth = Part;

export type State = {
  drums: Drums;
};

let state: State = {
  drums: {
    playing: true,
    mask: "1",
    markovStates: [
      [0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
    ],
  },
};

// Create an EventEmitter instance for broadcasting state updates
export const stateEventEmitter = new EventEmitter();

export const updateState = (newState: State) => {
  state = newState;

  // Emit an event when state update is complete
  stateEventEmitter.emit("stateUpdated", state);
  return state;
};

export const getState = () => state;
