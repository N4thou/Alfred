// require the discord.js module
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');


// module pour recup le TOKEN stocker dans .env
const dotenv = require('dotenv');
dotenv.config();
// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

//commands handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

/*
client.once(`voiceStateUpdate`, () => {
        console.log(`Update! ${client.voiceStateUpdate}`);
});
*/

/*client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	console.log(interaction);

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});*/

//event handler

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);

const listePresence = new Map();


function intervalFunc() {
  console.log('Qui est la ?');
  //console.log(client.channels.cache);
  const channelListe = client.channels.cache;

  //parcours les channel de tout les serveur ou le bot est connecte
  for (const channels of channelListe) {
	//console.log(channels[1].isVoice());

	//verifie si le channel est un channel vocal
	if(channels[1].isVoice()){
		const memberListe = channels[1].members;
		
		//établit la liste de toute les personnes connecte dans les channel vocaux
		for (const members of memberListe){
			console.log(members[0]);
			const memberID = members[0];

			//recupere le solde de la personne connecte
			const memberExist = listePresence.get(memberID);

			//si le membre na pas de solde il faut le cree
			if(!memberExist){
				const member_constructor = {
					ID:memberID,
					solde:1,
				};
				listePresence.set(memberID,member_constructor);
			}else{
				memberExist.solde= memberExist.solde+1;
				console.log(memberExist.solde); 
			}
		}
	}
  }
  let donnees = JSON.stringify(listePresence);
  fs.writeFileSync('Solde.json',donnees);
}

setInterval(intervalFunc, 1500);



