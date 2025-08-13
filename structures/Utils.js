const { glob } = require("glob");

module.exports = class BotUtils {
    constructor(client) {
        this.client = client;
    }

    async loadFiles(dirName) {
        const ARCHIVOS = await glob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
        ARCHIVOS.forEach((ARCHIVO) => delete require.cache[require.resolve(ARCHIVO)]);
        return ARCHIVOS;
    }
}