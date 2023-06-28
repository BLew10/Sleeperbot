import { Client, GatewayIntentBits, Partials, Collection, REST, Routes } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

export class DiscordClient {
    constructor(token, clientId, guildId) {
        this.client = new Client({ 
                        intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMembers], 
                        partials: [
                                Partials.Channel, 
                                Partials.Message]
                            }),
        this.token = token,
        this.rest = new REST().setToken(token);
        this.clientId = clientId;
        this.guildId = guildId;
        this.commands = [];
    }


    async initialize() {
        await this.initCommands();
        await this.initEvents();
        await this.addCommands();
        await this.client.login(this.token);
    }

     async initCommands() {
        this.client.commands = new Collection();
        const commandsPath = path.join(path.dirname(fileURLToPath(new URL(import.meta.url))), '..','commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const moduleURL = pathToFileURL(filePath);
            const command = await import(moduleURL.href);
            if (command.default.data && typeof command.default.execute === 'function') {
                this.client.commands.set(command.default.data.name, command.default);
                this.commands.push(command.default.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    
     async initEvents() {
        const eventsPath = path.join(path.dirname(fileURLToPath(new URL(import.meta.url))),'..', 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const moduleURL = pathToFileURL(filePath);
            const event = await import(moduleURL.href);
            if (event.default.once) {
                this.client.once(event.default.name, (...args) => event.default.execute(...args, this.client));
            } else {
                this.client.on(event.default.name, (...args) => event.default.execute(...args, this.client));
            }
        }
    }

    async addCommands() {
        try {
            console.log(`Started refreshing ${this.commands.length} application (/) commands.`);
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await this.rest.put(
                Routes.applicationGuildCommands(this.clientId, this.guildId),
                { body: this.commands },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
}

