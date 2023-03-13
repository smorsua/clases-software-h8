import { createServer } from "net";
const server = createServer((clientSocket) => {
    clientSocket.on("data", (userData) => {
        console.log(userData.toString());
    });
});

server.listen(8000, "127.0.0.1");

// array de sockets y luego reenviar mensaje a todos menos a ti
