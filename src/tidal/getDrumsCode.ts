import { State } from "./../state/state";

export const getDrumsCode = (state: State) => {
  const markovMatrix = state.drums.markovStates
    .map((markovState) => {
      const s = markovState.map((num) => {
        return num.toFixed(5);
      });

      return `[${s.join(",")}]`;
    })
    .join(`,\n          `);

  return `p "drums"
    $ ${state.drums.playing ? "id" : "gtfo"}
    $ stack [
      mask "${state.drums.mask}"
        $ midichan (fmap ([0,1,2,3]!!)
        $ markovPat 16 0 [
          ${markovMatrix}
         ] ) # note "c3" # amp 1
    ] # s "rytm"`;
};
