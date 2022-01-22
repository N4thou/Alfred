const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
//const ytSearch = require('yt-search');

const queue = new Map();

const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('En_construction!'),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;
		const connection = joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId:  interaction.guild.id,
						adapterCreator: interaction.guild.voiceAdapterCreator,
					});
		connection.destroy();
		interaction.reply('En construction!');
	},
};
