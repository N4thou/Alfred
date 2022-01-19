module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	async execute(message, args ,cmd) {
		message.channel.send('Pong.');
	},
};