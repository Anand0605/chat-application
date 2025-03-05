const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io"); // Correct import

const app = express();
const server = http.createServer(app); // Create HTTP server correctly
const io = new Server(server); // Pass the actual server instance

// Socket.io connection event
io.on("connection", (socket) => {
    console.log("A new user has connected", socket.id);
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

server.listen(9000, () => console.log(`Server is started at PORT: 9000`));
