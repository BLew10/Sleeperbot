import { Client, GatewayIntentBits, Partials} from 'discord.js';
import { initCommands, initEvents } from './initializeClient.js';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({ 
        intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers], 
        partials: [
                Partials.Channel, 
                Partials.Message]
            });

initCommands(client);
initEvents(client);

client.login(process.env.DISCORD_TOKEN);
