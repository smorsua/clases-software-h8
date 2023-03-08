"use strict";
exports.__esModule = true;
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
function randomColorRect() {
    var R = ((Math.sin(Date.now()) + 1) * 255) / 2;
    var G = ((Math.sin(Date.now() + 10) + 1) * 255) / 2;
    var B = ((Math.sin(Date.now() + 10) + 1) * 255) / 2;
    ctx.fillStyle = "rgb(".concat(R, ",").concat(G, ",").concat(B, ")");
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}
setInterval(randomColorRect, 1000);
