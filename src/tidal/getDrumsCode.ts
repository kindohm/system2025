import { State } from "./../state/state";

export const getDrumsCode = (state: State) => {
  return `p "drums"
    $ ${state.drums.muted ? "gtfo" : "id"}
    $ stack [
      s "rytm" # midichan 0 # note "c3" # amp 1
    ]`;
};
