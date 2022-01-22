const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
//const ytSearch = require('yt-search');


const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('En_construction!')
		.addStringOption(option =>option.setName('url').setDescription('URL de la video').setRequired(true)),
	async execute(interaction) {
		//console.log(interaction.member.voice.channel);
		const voiceChannel = interaction.member.voice.channel;

		if(!voiceChannel) return interaction.reply('Tu doit être dans un channel pour faire cette commande !');
		if(ytdl.validateURL(interaction.options.getString('url'))){
			const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId:  interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			const stream = ytdl(interaction.options.getString('url'), { filter: 'audioonly' });
			console.log('1');
			const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
			console.log('2');
			const player = createAudioPlayer();
			console.log('3');
			player.play(resource);
			connection.subscribe(player);
			console.log('4');
			//player.on(AudioPlayerStatus.Idle, () => connection.destroy());
			return interaction.reply('playing music!');
		}else{
			return interaction.reply('En construction!');
		}


		//player.on(AudioPlayerStatus.Idle, () => connection.destroy());
		//console.log(interaction.member.voice.channel);
		
	},
};