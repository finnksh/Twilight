const { ActivityType } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const sq = require('../../config/sq');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const commands = [];

		const files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
		for(const file of files){
    	const command = require(`../commands/${file}`);
    	commands.push(command.data.toJSON());
	}

		const rest = new REST({ version: '9' }).setToken(token);

	await rest.put(Routes.applicationCommands(clientId), {body : commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

	await sq.sync({alter : true}).then(() => {
		console.log("DB IS SYNC !!!")
	})

	console.log(`Twilight is online as ${client.user.tag}.`);
	client.user.setActivity('your voice' , { type: ActivityType.Listening});
	client.user.setStatus('dnd');
	},
};