import { getState, State, updateState } from "../state/state";

export const mute = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, muted: true },
  };
  updateState(newState);
};

export const play = () => {
  const oldState = getState();
  const oldDrums = oldState.drums;
  const newState: State = {
    ...oldState,
    drums: { ...oldDrums, muted: false },
  };
  updateState(newState);
};
