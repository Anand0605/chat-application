const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io"); // Import socket.io

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Pass server instance to Socket.IO

// Serve static files from the 'public' folder
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Handle WebSocket connection
io.on("connection", (socket) => {
    console.log("A new user has connected:", socket.id);

    socket.on("user-message", (message) => {
        console.log("Received message:", message);
        io.emit("message", message); // ✅ Send message to all connected clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
server.listen(9000, () => console.log(`Server is running on PORT: 9000`));
