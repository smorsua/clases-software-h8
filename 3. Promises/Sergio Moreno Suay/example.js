"use strict";
function getFile() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Here you go: FILE.JPG");
        }, 2000);
    });
    return promise;
}
console.log("Starting request");
const file = getFile().then((value) => {
    return console.log(value);
});
console.log(file);
