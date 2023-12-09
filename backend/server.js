const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
// Il codice del tuo server Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const roomTimers = {};

const generateRandomLink = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const linkLength = 10;
  let randomLink = "";

  for (let i = 0; i < linkLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomLink += characters[randomIndex];
  }

  return randomLink + "$";
};

const printRooms = (active) => {
  active.forEach((element) => {
    console.log(element);
  });
};

var activeRooms = [];

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("create_room", (data) => {
    console.log("creazione room richiesta");
    const newRooms = {
      roomNumber: generateRandomLink(),
      blue: generateRandomLink(),
      red: generateRandomLink(),
      draftInfo: {
        draftNames: {
          teamBlue: data.nameBlue === "" ? "Blue" : data.nameBlue,
          teamRed: data.nameRed === "" ? "Red" : data.nameRed,
        },
        draftStats: {
          bluePick: [],
          redPick: [],
          banBlue: [],
          banRed: [],
        },
        draftTurn: {
          timer: 30,
          side: "",
        },
        started: "false",
        blueReady: "false",
        redReady: "false",
        phase: 0,
        message: "",
        confirm: "false",
      },
    };
    activeRooms.push(newRooms);
    socket.emit("message_received", newRooms);
  });

  socket.on("print_room", () => {
    console.log("stampando le rooms");
    printRooms(activeRooms);
    console.log("fine stampa");
  });

  socket.on("join_room", (data) => {
    const res = activeRooms.find(({ roomNumber }) => roomNumber === data.room);
    console.log("password:", data.passwordSide);
    if (activeRooms.find(({ roomNumber }) => roomNumber === data.room)) {
      if (res.red === data.passwordSide || res.blue === data.passwordSide) {
        var sender = res.red === data.passwordSide ? "red" : "blue";
      } else {
        var sender = "spectator";
      }
      console.log("mi sono unito come:" + sender);
      socket.join(data.room);
      console.log(res);
      io.to(data.room).emit("message_received", res);
    } else {
      console.log(`la room non esiste`);
    }
  });

  socket.on("send_message", (data) => {
    const res = activeRooms.find(({ roomNumber }) => roomNumber === data.room);
    console.log(res);
    if (res.draftInfo.started === "false") {
      console.log("aggiornamento");
      res.draftInfo.redReady = data.redReady;
      res.draftInfo.blueReady = data.blueReady;
      console.log(res);
      io.to(data.room).emit("message_received", res);
      if (
        res.draftInfo.redReady === "true" &&
        res.draftInfo.blueReady === "true"
      ) {
        res.draftInfo.started = "true";
        io.to(data.room).emit("message_received", res);
      }
    }
    console.log("------");
    if (res.draftInfo.started === "true") {
      console.log("draft iniziata");
      startTimer(res);
    }

    if (data.passwordSide === "") {
      console.log("l'utente non può inviare messaggi");
    }
  });

  socket.on("send_pick", async (data) => {
    const room = activeRooms.find(({ roomNumber }) => roomNumber === data.room);

    if (room.draftInfo.started === "true") {
      if (data.confirm === "false") {
        console.log("confirm=false");
        handleDraftInfoUpdate(room, data);
        io.to(room.roomNumber).emit("message_received", room);
      }
      if (data.confirm === "true") {
        console.log("confirm=true");
        handleDraftInfoUpdate(room, data);
        handleDraftStatsUpdate(room, data);
        handlePhaseChange(room);
        io.to(room.roomNumber).emit("message_received", room);
        await handleDraftPhases(room);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

function handleDraftInfoUpdate(room, data) {
  room.draftInfo.message = data.message;
  room.draftInfo.confirm = data.confirm;
}

function handleDraftStatsUpdate(room, data) {
  const { draftStats, phase } = room.draftInfo;

  if ([0, 2, 4, 13, 15].includes(phase)) {
    draftStats.banBlue.push(data.message);
  }
  if ([6, 9, 10, 17, 18].includes(phase)) {
    draftStats.bluePick.push(data.message);
  }
  if ([1, 3, 5, 12, 14].includes(phase)) {
    draftStats.banRed.push(data.message);
  }
  if ([7, 8, 11, 16, 19].includes(phase)) {
    draftStats.redPick.push(data.message);
  }
}

function handleDraftStatsUpdateNotConfirmed(room) {
  const { draftStats, phase } = room.draftInfo;
  if ([0, 2, 4, 13, 15].includes(phase)) {
    draftStats.banBlue.push(room.draftInfo.message);
  }
  if ([6, 9, 10, 17, 18].includes(phase)) {
    draftStats.bluePick.push(room.draftInfo.message);
  }
  if ([1, 3, 5, 12, 14].includes(phase)) {
    draftStats.banRed.push(room.draftInfo.message);
  }
  if ([7, 8, 11, 16, 19].includes(phase)) {
    draftStats.redPick.push(room.draftInfo.message);
  }
}

function handlePhaseChange(room) {
  if (roomTimers[room.roomNumber]) {
    clearInterval(roomTimers[room.roomNumber]);
    delete roomTimers[room.roomNumber];
    io.to(room.roomNumber).emit("timer_end");
  }
}

async function handleDraftPhases(room) {
  while (room.draftInfo.phase < 20) {
    console.log("fase " + room.draftInfo.phase);
    startTimer(room);

    await waitForPhaseChangeOrTimeout(room);

    room.draftInfo.phase++;
    resetDraftInfoForNextPhase(room);

    io.to(room.roomNumber).emit("message_received", room);
  }
}
function startTimer(room) {
  if (!roomTimers[room.roomNumber] && room.draftInfo.draftTurn.timer > 0) {
    roomTimers[room.roomNumber] = setInterval(() => {
      room.draftInfo.draftTurn.timer--;

      io.to(room.roomNumber).emit("message_received", room);

      if (room.draftInfo.draftTurn.timer === 0) {
        handleDraftStatsUpdateNotConfirmed(room);
        clearInterval(roomTimers[room.roomNumber]);
        delete roomTimers[room.roomNumber];
        io.to(room.roomNumber).emit("timer_end");
        handlePhaseChange(room);
        io.to(room.roomNumber).emit("message_received", room);
      }
    }, 1000);
  }
}

function waitForPhaseChangeOrTimeout(room) {
  return new Promise((resolve) => {
    const timerCheckInterval = setInterval(() => {
      if (!roomTimers[room.roomNumber] || room.draftInfo.confirm === "true") {
        clearInterval(timerCheckInterval);
        resolve();
      }
    }, 1000);
  });
}
function resetDraftInfoForNextPhase(room) {
  room.draftInfo.confirm = "false";
  room.draftInfo.message = "";
  room.draftInfo.draftTurn.timer = 30;
}
