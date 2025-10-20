import express, { Request, Response } from "express";

const app = express();
const port = 3000;

const validInstruments = new Set(["drums", "drone", "perc", "synth"]);
const validActions = new Set(["play", "mute"]);

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

  res.json({ instrument, action });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
