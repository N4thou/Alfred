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
	getVoiceConnection,
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('En_construction!')
		.addStringOption(option =>option.setName('url').setDescription('URL de la video').setRequired(true)),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;

		//check if the user is in a voice channel
		if(!voiceChannel) return interaction.reply('Tu doit être dans un channel pour faire cette commande !');

		const server_queue = queue.get(interaction.guild.id);
		let song = {};

		//check url
		if(ytdl.validateURL(interaction.options.getString('url'))){

			const song_info = await ytdl.getInfo(interaction.options.getString('url'));
			song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };

			//if the server queue does not exist then create it and add to global queue
			if (!server_queue) {

				const queue_constructor = {
					voice_channel: voiceChannel,
					text_channel: interaction.channel,
					connection: null,
					songs: [],
				};
				// Add our key and value pair into the global queue. We then use this to get our server queue.
				queue.set(interaction.guild.id, queue_constructor);
				queue_constructor.songs.push(song);
				const player = createAudioPlayer();


				try {
					const connection = joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId:  interaction.guild.id,
						adapterCreator: interaction.guild.voiceAdapterCreator,
					});
					connection.subscribe(player);

					queue_constructor.connection = connection;
					video_player(interaction.guild, queue_constructor.songs[0],player,interaction);
					interaction.reply('👍');
				}
				catch (err) {
					queue.delete(interaction.guild.id);
					interaction.reply('There was an error connecting!');
					throw err;
				}

			}
			else{
				server_queue.songs.push(song);
				return interaction.reply(`👍 **${song.title}** added to queue!`);
			}

			/*
			//connect to the voice channel
			const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId:  interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			const stream = ytdl(interaction.options.getString('url'), { filter: 'audioonly' });
			const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
			const player = createAudioPlayer();

			player.play(resource);
			connection.subscribe(player);
			player.on(AudioPlayerStatus.Idle, () => connection.destroy());
			return interaction.reply('playing music!');
			*/
		}else{
			return interaction.reply('invalide url!');
		}	
	},
};

const video_player = async (guild, song,player,interaction) => {
	const song_queue = queue.get(guild.id);

	// If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
	if (!song) {
		const connection = joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId:  interaction.guild.id,
						adapterCreator: interaction.guild.voiceAdapterCreator,
					});
		connection.destroy();
		queue.delete(guild.id);
		return;
	}
	console.log(song.url);
	const stream = ytdl(song.url, { filter: 'audioonly' });
	const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
	player.play(resource);
	player.on(AudioPlayerStatus.Idle, () => {
			song_queue.songs.shift();
			video_player(guild, song_queue.songs[0],player,interaction);
		});
	await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`);
};