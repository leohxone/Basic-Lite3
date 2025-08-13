module.exports = client => {
    console.log(`(!) Cargando Anticrash`.red)
    process.removeAllListeners();

    process.on("unhandledRejection", (reason, p) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(reason, p)
    });

    process.on("uncaughtException", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(err, origin)
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(err, origin)
    });

    process.on("multipleResolves", () => {});
}