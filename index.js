import express from "express";
import http from "http";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from "socket.io";


const app = express();

const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname+ "/index.html");
});
io.on('connection', (socket) => {
    console.log('a user connected :' + socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (data) => {
      //console.log('message: ' + msg);
      io.emit('chat message', data);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});


