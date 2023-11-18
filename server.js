const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();
port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.resolve("../onchatter/public/")));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
})


app.get('/', (req, res) => {
    res.send({"message": "Hello from Server"});
});

server.listen(port, () => {
    console.log("server is running at http://localhost:"+port)
});

io.on('connection', (socket)=> {
    console.log("New WS Connection");
    console.log(socket.id)
});