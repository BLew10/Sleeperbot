import { Events } from "discord.js";

const ready = {
	name: Events.ClientReady,
	once: true,
	async execute() {
        console.log('Ready!');
	},
};

export default ready;