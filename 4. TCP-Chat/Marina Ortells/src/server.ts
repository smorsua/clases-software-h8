import { Socket } from "net";
import { createServer } from "net";
import net from "net";
const server = createServer((conn) => {
    console.log("server created");
    conn.on("data", (data) => {
        console.log(data.toString())
        conn.write(data.toString("utf-8"));
    });
});

server.listen(8000, "127.0.0.1");
