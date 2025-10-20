import { State } from "../state/state";
import { drumsHandler } from "./drumsHandler";

export type Handler = {
  core: {
    mute: () => State;
    play: () => State;
  };
};

export type DrumsHandler = Handler & {
  markov: {
    nudge: () => State;
    randomize: () => State;
  };
  mask: {
    set: (maskString: string) => State;
  };
};

export type Handlers = {
  drums: DrumsHandler;
};

export const handlers: Handlers = {
  drums: drumsHandler,
};
