import express, { Request, Response } from "express";
import * as stateListener from "./../tidal/stateListener";
import { getProcess, isBooted } from "./../repl/getProcess";
import { handlers, validActions, validInstruments } from "./handlers";
import { getState } from "../state/state";
import { getTidalCode } from "../tidal/getTidalCode";

const app = express();
const port = 3000;

stateListener.start();
getProcess();

app.get("/show", (req: Request, res: Response) => {
  const state = getState();
  res.status(200).json(state);
});

app.get("/show/code", (req: Request, res: Response) => {
  const state = getState();
  const code = getTidalCode(state);
  res.status(200).send(code);
});

app.post("/:instrument/:action", (req: Request, res: Response) => {
  const { instrument, action } = req.params;

  // Type-safe dynamic access with runtime validation
  const instrumentHandlers = handlers[instrument as keyof typeof handlers];
  if (!instrumentHandlers) {
    return res.status(400).json({ error: "Handler not found for instrument" });
  }

  const actionHandler =
    instrumentHandlers[action as keyof typeof instrumentHandlers];
  if (!actionHandler || typeof actionHandler !== "function") {
    return res.status(400).json({ error: "Handler not found for action" });
  }

  if (!isBooted()) {
    return res.status(418).json({ message: "still booting" });
  }

  actionHandler();

  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
