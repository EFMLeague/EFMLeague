// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
// Il codice del tuo server Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://www.efmleague.com",
    methods: ["GET", "POST"],
  },
});

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
    console.log(data.nameBlue);
    const newRooms = {
      roomNumber: generateRandomLink(),
      blue: generateRandomLink(),
      red: generateRandomLink(),
      blueName: data.nameBlue === "" ? "Blue" : data.nameBlue,
      redName: data.nameRed === "" ? "Red" : data.nameRed,
    };
    activeRooms.push(newRooms);
    printRooms(activeRooms);
    socket.emit("message_received", newRooms);
  });

  socket.on("print_room", () => {
    console.log("stampando le rooms");
    printRooms(activeRooms);
    console.log("fine stampa");
  });

  socket.on("join_room", (room) => {
    const res = activeRooms.find(({ roomNumber }) => roomNumber === room);

    if (activeRooms.find(({ roomNumber }) => roomNumber === room)) {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
      io.to(room).emit("receive_room", {
        teamBlue: res.blueName,
        teamRed: res.redName,
      });
    } else {
      console.log(` la room: ${room} non esiste`);
    }
  });

  socket.on("send_message", (data) => {
    const res = activeRooms.find(({ roomNumber }) => roomNumber === data.room);

    if (data.passwordSide === "") {
      console.log("l'utente non può inviare messaggi");
    }
    if (res.red === data.passwordSide || res.blue === data.passwordSide) {
      // Verifica se il mittente è nella stanza come "red" o "blue"
      const sender = res.red === data.passwordSide ? "red" : "blue";

      io.to(data.room).emit("receive_message", {
        message: data.message,
        sender: sender,
      });
      console.log(data.message + "<->" + sender);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
