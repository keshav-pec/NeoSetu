require("dotenv").config();

const express = require("express");
const app = express();

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const server = createServer(app);

const { connectToSocket } = require("./controllers/socketManager");
const io = connectToSocket(server);

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const userRoutes = require("./routes/users.routes")

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  return res.send("Hi, I am Root");
});

app.set("PORT", process.env.PORT || 8080);
app.set("url", process.env.MONGO_URL);
server.listen(app.get("PORT"), () => {
  console.log(`Server is listening on port ${app.get("PORT")}`);
  mongoose.connect(app.get("url"));
  console.log("DB connected");
});
