import express, { Request, Response } from "express";
import * as stateListener from "./../tidal/stateListener";
import { getProcess, isBooted } from "./../repl/getProcess";
import { handlers } from "./handlers";
import { getState } from "../state/state";
import { getTidalCode } from "../tidal/getTidalCode";

const app = express();
const port = 3000;

// Add middleware to parse JSON and text request bodies
app.use(express.json());

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

app.post("/:instrument/:feature/:action", (req: Request, res: Response) => {
  const { instrument, feature, action } = req.params;
  const body = req.body;

  console.log("body!", body);

  // Validate parameters exist
  if (!instrument || !feature || !action) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Type-safe dynamic access with runtime validation
  const instrumentHandlers = handlers[instrument as keyof typeof handlers];
  if (!instrumentHandlers) {
    return res.status(400).json({ error: "Handler not found for instrument" });
  }

  const featureHandlers = (instrumentHandlers as any)[feature];
  if (!featureHandlers || typeof featureHandlers !== "object") {
    return res.status(400).json({ error: "Handler not found for feature" });
  }

  const actionHandler = featureHandlers[action];
  if (!actionHandler || typeof actionHandler !== "function") {
    return res.status(400).json({ error: "Handler not found for action" });
  }

  actionHandler();

  res.status(200).json(getState());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
