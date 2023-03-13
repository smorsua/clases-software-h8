"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const server = (0, net_1.createServer)((clientSocket) => {
    clientSocket.on("data", (userData) => {
        console.log(userData.toString());
    });
});
server.listen(8000, "127.0.0.1");
