import { send } from "../repl/send";
import { getState, stateEventEmitter } from "./../state/state";
import { getTidalCode } from "./getTidalCode";

let started = false;

export const start = () => {
  if (started) {
    return;
  }

  // Listen for state updates
  stateEventEmitter.on("stateUpdated", (updatedState) => {
    sendToTidal();
  });

  started = true;
};

const sendToTidal = () => {
  const code = getTidalCode(getState());
  send(code);
};
