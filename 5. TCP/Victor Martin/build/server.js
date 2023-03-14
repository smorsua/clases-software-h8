"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const server = (0, net_1.createServer)((clientSocket) => {
    const socketArray = createSocketArray(clientSocket);
    clientSocket.on("data", (userData) => {
        for (let i = 0; (i = socketArray.length); i++) {
            const sendtoSocket = (0, net_1.createConnection)({
                port: socketArray[i][0],
                host: socketArray[i][1],
            });
            sendtoSocket.write(userData);
        }
    });
    setTimeout(() => console.log("socketArray" + socketArray), 20000);
});
server.listen(8000, "127.0.0.1");
// array de sockets y luego reenviar mensaje a todos (menos a ti)
function createSocketArray(clientSocket) {
    const socketArray = [];
    clientSocket.on("connection", (clientSocket) => {
        const clientAdress = clientSocket.address();
        socketArray.push([clientAdress.port, clientAdress.address.toString()]);
    });
    return socketArray;
}
