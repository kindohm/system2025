type Part = {
  muted: boolean;
};

export type Drums = Part;
export type Drone = Part;
export type Perc = Part;
export type Synth = Part;

type State = {
  drums: Drums;
  drone: Drone;
  perc: Perc;
  synth: Synth;
  toTidalString: (state: State) => string;
};

export const state: State = {
  drums: {
    muted: true,
  },
  perc: { muted: true },
  drone: { muted: true },
  synth: { muted: true },
  toTidalString: (state: State) => {
    return "hush";
  },
};
