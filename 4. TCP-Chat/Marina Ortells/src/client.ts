/** https://nodejs.org/api/net.html*/

import { Socket } from "net";
import { Readline } from "node:readline/promises";

import { createInterface } from "readline";

import { createConnection } from "net";

import { getEventListeners } from "events";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const socket = createConnection(8000, "127.0.0.1", () => {
    console.log("Connected to server");
});

socket.on("data", (data) => {
   console.log(data.toString());
});

const reader = readline.on("line", (input) => {
    socket.write(input, (er) => {
        if (er) {
            console.log("Line not working");
        } else {
            console.log("Line working");
            return input;
        }
    });
});


