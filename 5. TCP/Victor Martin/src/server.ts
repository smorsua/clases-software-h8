import { Socket } from "dgram";
import { createConnection, createServer, SocketAddress } from "net";
const server = createServer((clientSocket) => {
    const socketArray = createSocketArray(clientSocket);

    clientSocket.on("data", (userData) => {
        for (let i = 0; (i = socketArray.length); i++) {
            const sendtoSocket = createConnection({
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

function createSocketArray(clientSocket: any) {
    const socketArray: any[] = [];
    clientSocket.on("connection", (clientSocket: Socket) => {
        const clientAdress = clientSocket.address();
        socketArray.push([clientAdress.port, clientAdress.address.toString()]);
    });
    return socketArray;
}

// los clientes se conectan, pero al parecer el socketArray no se genera correctamente, o el envío de los mensajes no lo hace
// es posible que ambos procesos sean incorrectos
