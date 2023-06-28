import { SlashCommandBuilder } from 'discord.js'
import { SleeperAPI } from '../models/SleeperAPI.js'

const ping = {
	data: new SlashCommandBuilder()
		.setName('week')
		.setDescription('Replies the current Nfl week!'),
	async execute(interaction) {
		const sleeperAPI = new SleeperAPI();
		let week = await sleeperAPI.getWeek();
		await interaction.reply(week);
	},
};

export default ping;
