module.exports = {
	name: 'clear',
	description: 'Supprime n-1 message!',
	cooldown: 5,
	args:true,
	async execute(message, args, cmd) {
		if(isNaN(args[0])) return message.reply('please enter a real number');

		if(args[0] > 100) return message.reply('you connot delete more than 100 messages!');
		if(args[0] < 1) return message.reply('you must delete at leaste one message!');

		await message.channel.messages.fetch({ limit: args[0] }).then(messages =>{
			message.channel.bulkDelete(messages);
		});
	},
};