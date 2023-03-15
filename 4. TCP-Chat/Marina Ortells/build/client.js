/** https://nodejs.org/api/net.html*/
import { createInterface } from "readline";
import { createConnection } from "net";
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
        }
        else {
            console.log("Line working");
            return input;
        }
    });
});
