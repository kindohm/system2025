import { getState, State, updateState } from "../state/state";
import { nudge } from "../util/random";

export const mute = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: false },
  };
  return updateState(newState);
};

export const play = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: true },
  };
  return updateState(newState);
};

export const nudgeMarkov = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const oldMarkovStates = oldDrums.markovStates;

  const newMarkovStates: Array<Array<number>> = oldMarkovStates.reduce(
    (acc: Array<Array<number>>, markovState: Array<number>) => {
      const newMarkovState = markovState.map((num) => {
        return nudge(num);
      });
      return acc.concat([newMarkovState]);
    },
    []
  );

  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, markovStates: newMarkovStates },
  };

  return updateState(newState);
};
