const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();
port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
// const io = new Server(server, {
//     cors: {
//         origin: "https://react-on-chatter-6ef12e3df9fb.herokuapp.com/",
//         // origin: "https://react-on-chatter-6ef12e3df9fb.herokuapp.com/",
//         methods: ["GET", "POST"]
//     },
// })


app.get('/', (req, res) => {
    res.send({
        "message": "Hello from Server",
        "nikhil": "hello Nikhil!",
        "metho": "adding cors: '*' "
    });
});

server.listen(port, () => {
    console.log("server is running at http://localhost:"+port)
});

io.on('connection', (socket)=> {
    console.log("New WS Connection");
    console.log(socket.id)
    socket.on("message", (message) => {
        console.log(message)
        socket.emit("everyone-recieve-it", {"STC" : message})
    });
    
});