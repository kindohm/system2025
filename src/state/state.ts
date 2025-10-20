import { EventEmitter } from "events";

type Part = {
  muted: boolean;
};

export type Drums = Part;
export type Drone = Part;
export type Perc = Part;
export type Synth = Part;

export type State = {
  drums: Drums;
  drone: Drone;
  perc: Perc;
  synth: Synth;
};

let state: State = {
  drums: {
    muted: true,
  },
  perc: { muted: true },
  drone: { muted: true },
  synth: { muted: true },
};

// Create an EventEmitter instance for broadcasting state updates
export const stateEventEmitter = new EventEmitter();

export const updateState = (newState: State) => {
  state = newState;

  // Emit an event when state update is complete
  stateEventEmitter.emit("stateUpdated", state);
};

export const getState = () => state;
