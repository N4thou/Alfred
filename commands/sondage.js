const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data : new SlashCommandBuilder()
	.setName('sondage')
	.setDescription('Replies with your input!')

	.addStringOption(option =>option.setName('question').setDescription('question du sondage').setRequired(true))

	.addStringOption(option =>option.setName('choix_1').setDescription('1er_choix').setRequired(true))

	.addStringOption(option =>option.setName('choix_2').setDescription('2eme_choix').setRequired(true))

	.addStringOption(option =>option.setName('choix_3').setDescription('3eme_choix')),

	async execute(interaction) {
		if (interaction.options.getString('choix_3')!=null){
			interaction.reply(`${interaction.options.getString('question')}\n 1-${interaction.options.getString('choix_1')}\n 2-${interaction.options.getString('choix_2')}\n 3-${interaction.options.getString('choix_3')}`);
			const message = await interaction.fetchReply();
			message.react('1️⃣');
			message.react('2️⃣');
			message.react('3️⃣');
			return 
		}else{
			interaction.reply(`${interaction.options.getString('question')}\n 1-${interaction.options.getString('choix_1')}\n 2-${interaction.options.getString('choix_2')}`);
			const message = await interaction.fetchReply();
			message.react('1️⃣');
			message.react('2️⃣');
			return 
		}
	},
};
