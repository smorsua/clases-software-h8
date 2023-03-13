"use strict";
// Obtener input del user (node:readline) --> internet
// Conexión, enviar, recibir (node:net.Socket) --> Documentacion node:net
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const net_1 = require("net");
const readline = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
readline.on("line", (input) => {
    const userInput = input.toUpperCase();
    client.write(userInput);
});
const client = (0, net_1.createConnection)({ port: 8000, host: "127.0.0.1" }, () => {
    console.log("Connected successfully");
});
