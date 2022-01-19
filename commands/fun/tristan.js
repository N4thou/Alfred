module.exports = {
	name: 'tristan',
	description: 'poids de tristan!',
	cooldown: 5,
	async execute(message, args,cmd) {
		message.channel.send('Le poids de Tristan est actuellement de 80kg!');
	},
};