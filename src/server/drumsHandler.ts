import { getState, State, updateState } from "../state/state";
import { getRand, nudge } from "../util/random";

const mute = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: false },
  };
  return updateState(newState);
};

const play = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: true },
  };
  return updateState(newState);
};

const nudgeMarkov = () => {
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

const randomizeMarkov = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newMarkovStates = [
    [getRand(0, 1), getRand(0, 1), getRand(0, 1), getRand(0, 1)],
    [getRand(0, 1), getRand(0, 1), getRand(0, 1), getRand(0, 1)],
    [getRand(0, 1), getRand(0, 1), getRand(0, 1), getRand(0, 1)],
    [getRand(0, 1), getRand(0, 1), getRand(0, 1), getRand(0, 1)],
  ];

  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, markovStates: newMarkovStates },
  };

  return updateState(newState);
};

const setMask = (mask: string) => {
  const oldState = getState();
  const oldDrums = oldState.drums;

  const newState = { ...oldState, drums: { ...oldDrums, mask } };
  return updateState(newState);
};

export const drumsHandler = {
  core: { mute, play },
  mask: {
    set: setMask,
  },
  markov: {
    randomize: randomizeMarkov,
    nudge: nudgeMarkov,
  },
};
