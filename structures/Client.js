const {Client, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus, Collection } = require('discord.js');
const BotUtils = require('./Utils');
const statuslist = require('./status.json');

module.exports = class extends Client{
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildEmojisAndStickers,
        ],
        partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],

        allowedMentions: {
            parse: ["roles", "users"],
            repliedUser: false,
        },
        presence: {
            activities: [{ 
                name: "-help | V-0.50 (No estable) |", 
                type: ActivityType[process.env.STATUS_TYPE], 
                timestamps: {
                    start: Date.now(),
                    end: Date.now() + 60000,
                }  
            }],
            status: PresenceUpdateStatus.DoNotDisturb
        },
    })  {
        
        super({
            ...options
        });

        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];

        this.utils = new BotUtils(this);

        this.start();
    }

    async start(){
        await this.loadEvents();
        await this.loadHandlers();
        await this.loadCommands();
        await this.loadSlashCommands();

        this.login(process.env.BOT_TOKEN);
    }

    async loadCommands(){
        console.log(`(${process.env.PREFIX}) Cargando Comandos`.yellow);
        await this.commands.clear();

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/comandos");

        if(RUTA_ARCHIVOS.length){
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    const COMANDO = require(rutaArchivo)
                    const NOMBRE_COMANDO = rutaArchivo.split("\\").pop().split("/").pop().split(".")[0];
                    COMANDO.NAME = NOMBRE_COMANDO;

                    if(NOMBRE_COMANDO) this.commands.set(NOMBRE_COMANDO, COMANDO);

                } catch(e){
                    console.log(`ERROR AL CARGAR EL ARCHIVO ${rutaArchivo}`.bgRed);
                    console.log(e);
                }
            })
        }

        console.log(`(${process.env.PREFIX}) ${this.commands.size} Comandos Cargados`.green);
    }
    
    async loadSlashCommands(){
        console.log(`(/) Cargando Comandos Slash`.yellow);
        await this.slashCommands.clear();
        this.slashArray = [];

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/slashCommands");

        if(RUTA_ARCHIVOS.length){
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    const COMANDO = require(rutaArchivo)
                    const NOMBRE_COMANDO = rutaArchivo.split("\\").pop().split("/").pop().split(".")[0];
                    COMANDO.CMD.name = NOMBRE_COMANDO;

                    if(NOMBRE_COMANDO) this.slashCommands.set(NOMBRE_COMANDO, COMANDO);

                    this.slashArray.push(COMANDO.CMD.toJSON());

                } catch(e){
                    console.log(`ERROR AL CARGAR EL ARCHIVO ${rutaArchivo}`.bgRed);
                    console.log(e);
                }
            })
        }

        console.log(`(/) ${this.slashCommands.size} Comandos Slash Cargados`.green);
        if(this?.application?.commands){
            this.application.commands.set(this.slashArray);
            console.log(`(/) ${this.slashCommands.size} Comandos Publicados!`.green);
        }

    }

    async loadHandlers(){
        console.log(`(*) Cargando Handlers`.yellow);

        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/handlers");

        if(RUTA_ARCHIVOS.length){
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    require(rutaArchivo)(this);
                } catch(e){
                    console.log(`ERROR AL CARGAR EL ARCHIVO ${rutaArchivo}`.bgRed);
                    console.log(e);
                }
            })
        }

        console.log(`(*) ${RUTA_ARCHIVOS.length} Handlers Cargados`.green);
    }

    async loadEvents(){
        console.log(`(+) Cargando Eventos`.yellow);
        const RUTA_ARCHIVOS = await this.utils.loadFiles("/src/eventos");
        this.removeAllListeners();

        if(RUTA_ARCHIVOS.length){
            RUTA_ARCHIVOS.forEach((rutaArchivo) => {
                try {
                    const EVENTO = require(rutaArchivo)
                    const NOMBRE_EVENTO = rutaArchivo.split("\\").pop().split("/").pop().split(".")[0];
                    this.on(NOMBRE_EVENTO, EVENTO.bind(null, this))

                } catch(e){
                    console.log(`ERROR AL CARGAR EL ARCHIVO ${rutaArchivo}`.bgRed);
                    console.log(e);
                }
            })
        }

        console.log(`(+) ${RUTA_ARCHIVOS.length} Eventos Cargados`.green);
    }
    
}