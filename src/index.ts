import express, { Request, Response } from "express";
import * as stateListener from "./tidal/stateListener";
import { getState, State, updateState } from "./state/state";
import { getProcess, isBooted } from "./repl/getProcess";

const app = express();
const port = 3000;

const validInstruments = new Set(["drums", "drone", "perc", "synth"]);
const validActions = new Set(["play", "mute"]);

stateListener.start();
getProcess();

app.post("/:instrument/:action", (req: Request, res: Response) => {
  const { instrument, action } = req.params;

  if (!instrument || !validInstruments.has(instrument)) {
    return res.status(400).json({
      error: `Invalid instrument. Must be one of: ${Array.from(
        validInstruments
      ).join(", ")}`,
    });
  }

  if (!action || !validActions.has(action)) {
    return res.status(400).json({
      error: `Invalid action. Must be one of: ${Array.from(validActions).join(
        ", "
      )}`,
    });
  }

  if (!isBooted()) {
    return res.status(418).json({ message: "still booting" });
  }

  const state = getState();
  const newState: State = {
    ...state,
    drums: { muted: action === "mute" ? true : false },
  };

  updateState(newState);

  res.status(200).send(); //json({ instrument, action });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
