"use strict";
function descargarArchivos(onSuccess, onFailure) {
    console.log("Descargando archivos...");
    setTimeout(() => {
        onSuccess();
    }, 2000);
}
function desencriptarArchivos(callback, onFailure) {
    console.log("Desencriptando archivos...");
    setTimeout(() => {
        callback();
    }, 2000);
}
function procesasAudio(callback, onFailure) {
    console.log("Procesando audio...");
    setTimeout(() => {
        callback();
    }, 2000);
}
function procesarVideo(callback, onFailure) {
    console.log("Procesando video...");
    setTimeout(() => {
        callback();
    }, 2000);
}
descargarArchivos(() => {
    desencriptarArchivos(() => {
        procesasAudio(() => {
            procesarVideo(() => {
                console.log("Acabado!");
            }, () => {
                "Error procesando video";
            });
        }, () => {
            "Error procesando audio";
        });
    }, () => {
        "Error desencriptando archivos";
    });
}, () => {
    "Error descargando archivos";
});
descargarArchivos(() => {
    desencriptarArchivos(() => {
        procesasAudio(() => {
            procesarVideo(() => {
                console.log("FINISHED");
            }, () => {
                console.log("ERROR VIDEO");
            });
        }, () => {
            console.log("ERROR");
        });
    }, () => {
        console.log("Error desencriptando archivos");
    });
}, () => {
    console.log("ERROR");
});
