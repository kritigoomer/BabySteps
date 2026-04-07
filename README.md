# BabySteps – Real-Time Contraction Monitoring System

BabySteps is an end-to-end real-time monitoring system that tracks uterine contractions using a flex sensor (Arduino) and streams data to a mobile application for live analysis and visualization.

The system integrates embedded hardware, a Node.js backend, and a React Native frontend to deliver low-latency contraction detection, session tracking, and labor insights.

---

## 🚀 Features

* Real-time contraction detection using Arduino flex sensor
* WebSocket-based streaming of contraction events (start/end, duration)
* Live session tracking with countdown timer and analytics
* Contraction classification (true vs false) based on duration and intervals
* Motion detection (Expo DeviceMotion) to ensure accurate readings
* Calibration workflow for sensor baseline and noise reduction
* Demo mode for testing without physical contractions

---

## 🧠 System Architecture

```
Arduino (C++)
   ↓ Serial (USB)
Node.js Backend (Express + WebSocket)
   ↓ WebSocket (ws://)
React Native App (Expo)
```

### Flow

1. Arduino detects contraction events via flex sensor
2. Data is sent over serial to Node.js server
3. Server parses and broadcasts events via WebSockets
4. Mobile app receives events and updates UI in real-time

---

## 🛠️ Tech Stack

**Frontend**

* React Native (Expo)
* TypeScript
* Expo DeviceMotion

**Backend**

* Node.js
* Express
* WebSocket (ws)

**Hardware**

* Arduino (C++)
* Flex Sensor
* Serial Communication

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/yourusername/babysteps.git
cd babysteps
```

---

### 2. Backend Setup

```
cd server
npm install
node server.js
```

Make sure your Arduino is connected and the correct COM port is set in `server.js`.

---

### 3. Mobile App Setup

```
cd app
npm install
npx expo start
```

Update your backend IP address in the app:

```js
const IP = "YOUR_LOCAL_IP";
```

---

### 4. Arduino Setup

* Upload the Arduino sketch to your board
* Ensure baud rate matches backend (9600)
* Keep sensor still during calibration

---

## ▶️ Usage

1. Open the app
2. Select session duration (or enter custom time)
3. Press **Begin Contractions**
4. System starts session and listens for contraction events
5. View:

   * Number of contractions
   * Time remaining
   * Average interval
   * True contraction count
   * Labor status

---

## 🧪 Demo Mode

To simulate contractions without hardware:

* Enter `demo` in the custom time field
* Starts a short session with simulated contraction events

Useful for testing UI and event pipeline.

---

## 📊 Contraction Classification Logic

A contraction is classified as “true” if:

* Duration > 30 seconds
* Interval between contractions < 5 minutes

This logic runs in real-time on the client.

---

## 🔌 API Endpoints

### Start Session

```
GET /start-session?duration=60000
```

Sends session command to Arduino:

```
SESSION:<duration_ms>
```

---

## ⚠️ Known Limitations

* Requires local network connection between device and server
* Public WiFi may block WebSocket or local IP communication
* Sensor accuracy depends on proper placement and calibration

---

## 🔮 Future Improvements

* Cloud deployment (remove local network dependency)
* Persistent session storage (Firebase / database)
* ML-based contraction classification
* Data visualization dashboard
* BLE-based hardware communication (remove USB dependency)

---

## 📌 Summary

BabySteps demonstrates a full-stack, real-time system combining:

* Embedded systems (Arduino)
* Backend streaming (WebSockets)
* Mobile frontend (React Native)

It highlights event-driven architecture, low-latency data pipelines, and hardware-software integration.

---
