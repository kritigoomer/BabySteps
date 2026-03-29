const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());          // ← NEW: allows POST requests with JSON body

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

// ---- SERIAL SETUP ----
// CHANGE THIS if COM5 is wrong (check in Windows Device Manager)
const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// ✅ NEW: Confirm port opened + error handling
port.on("open", () => {
  console.log("✅ Serial port opened successfully — Arduino connected");
});

port.on("error", (err) => {
  console.error("❌ Serial port error:", err.message);
});

// Arduino data → broadcast to your app
parser.on("data", (line) => {
  const data = line.trim();
  console.log("Arduino:", data);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
});

// ✅ NEW: API endpoint to START the session
app.post("/start-session", (req, res) => {
  const durationMs = req.body.duration || 600000; // default = 10 minutes

  if (!port.isOpen) {
    return res.status(500).json({ error: "Serial port is not open" });
  }

  // This is the exact command the Arduino is waiting for
  port.write(`SESSION:${durationMs}\n`);

  console.log(`🚀 Sent SESSION:${durationMs} to Arduino`);
  res.json({
    status: "started",
    durationSeconds: durationMs / 1000,
    message: "Session command sent to Arduino",
  });
});

wss.on("connection", () => {
  console.log("Client connected via WebSocket");
});