import { Events } from "discord.js";

const ready = {
	name: Events.ClientReady,
	async execute() {
        console.log('Ready!');
	},
};

export default ready;