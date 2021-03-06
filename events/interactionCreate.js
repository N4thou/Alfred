module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered ${interaction.client.commands.get(interaction.commandName)} interaction.`);

		if (!interaction.isCommand()) return;
		//console.log(interaction);

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};