// Obtener input del user (node:readline) --> internet
// Conexión, enviar, recibir (node:net.Socket) --> Documentacion node:net

import { createInterface } from "readline";
import { createConnection } from "net";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on("line", (input) => {
    const userInput = input.toUpperCase();
    client.write(userInput);
});

readline.on("data", (serverData) => {
    // en cuanto el server envía mensajes, cada cliente los recibirá
    console.log(serverData.toString());
});

const client = createConnection({ port: 8000, host: "127.0.0.1" }, () => {
    console.log("Connected successfully");
});
