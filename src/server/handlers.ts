import * as drumsHandler from "./drumsHandler";

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
