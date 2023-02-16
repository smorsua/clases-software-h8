function getFile(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("Here you go: FILE.JPG");
        }, 2000);
    });
    return promise;
}

console.log("Starting request");

const file = getFile().then((value) => {
     console.log(value);
     return value
});

console.log(file);
