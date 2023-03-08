export {};

const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = myCanvas.getContext("2d")!;
const buttonStart = document.getElementById("buttonStart") as HTMLButtonElement;
const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;

buttonStart.onclick = function setactivestate() {
    const gamestate = "active";
    return gamestate;
};
buttonStop.onclick = function setstoppedstate() {
    const gamestate = "stopped";
    return gamestate;
};

function gameRunning(gamestate: string) {
    if (gamestate == "active") {
    }
    if (gamestate == "stopped") {
    }
}

function setColor(state: string) {
    if (state == "alive") {
        pixel.fillStyle = "rgb(0,0,0)";
    }
    if (state == "dead") {
        pixel.fillStyle = "rgb(255,255,255)";
    }
}

//
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

function randomColorRect() {
    const R = ((Math.sin(Date.now()) + 1) * 255) / 2;
    const G = ((Math.sin(Date.now() + 10) + 1) * 255) / 2;
    const B = ((Math.sin(Date.now() + 10) + 1) * 255) / 2;
    ctx.fillStyle = `rgb(${R},${G},${B})`;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}

setInterval(randomColorRect, 1000);
//
