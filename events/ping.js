import { Events } from "discord.js";

const ping = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		if (message.content.toLowerCase() === 'ping') {
			message.reply('Pong!');
		}
	},
};

export default ping;