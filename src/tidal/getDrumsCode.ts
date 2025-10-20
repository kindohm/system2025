import { State } from "./../state/state";

export const getDrumsCode = (state: State) => {
  return `p "drums"
    $ ${state.drums.playing ? "id" : "gtfo"}
    $ stack [
      s "rytm" # midichan 0 # note "c3" # amp 1
    ]`;
};
