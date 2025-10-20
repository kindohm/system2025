import { getState, State, updateState } from "../state/state";

export const mute = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: false },
  };
  updateState(newState);
};

export const play = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, playing: true },
  };
  updateState(newState);
};
