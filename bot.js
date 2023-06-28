import { DiscordClient } from './models/DiscordClient.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new DiscordClient(process.env.DISCORD_TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
client.initialize();