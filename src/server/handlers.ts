import { State } from "../state/state";
import * as drumsHandler from "./drumsHandler";

export type Handler = {
  mute: () => State;
  play: () => State;
};

export type DrumsHandler = Handler & {
  nudgeMarkov: () => State;
};

export type Handlers = {
  drums: DrumsHandler;
};

export const handlers: Handlers = {
  drums: drumsHandler,
};
