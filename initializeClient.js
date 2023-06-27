
import { Collection }  from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

export const initCommands = async (client) => {
    client.commands = new Collection();
    const commandsPath = path.join(path.dirname(fileURLToPath(new URL(import.meta.url))), 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const moduleURL = pathToFileURL(filePath);
        const command = await import(moduleURL.href);
        if (command.default.data && typeof command.default.execute === 'function') {
            client.commands.set(command.default.data.name, command.default);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

export const initEvents = async (client) => {
    const eventsPath = path.join(path.dirname(fileURLToPath(new URL(import.meta.url))), 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const moduleURL = pathToFileURL(filePath);
        const event = await import(moduleURL.href);
        if (event.default.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args, client));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(...args, client));
        }
    }
}

