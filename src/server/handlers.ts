import * as drumsHandler from "./drumsHandler";

export const validInstruments = ["drums", "drone", "perc", "synth"];
export const validActions = ["play", "mute"];

export type Handler = {
  mute: () => void;
  play: () => void;
};

export type Handlers = {
  drums: Handler;
};

export const handlers: Handlers = {
  drums: drumsHandler,
};
