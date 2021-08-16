//make special array
var dancingLetters = ["aa","bb","cc","dd","ee","ff","gg","hh","i_","jj","kk","ll","m_","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww","xx","y_","z_"];
var dancingNumbers = ["00","11","2_","33","44","55","6_","77","88","99"];
var dancingSpecial = ["excimation","dollar","amprs","questmark","at"];

'use strict';

// Import the discord.js module
const { Client, Intents, Collection } = require('discord.js');

// Create an instance of a Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

// import token
const credentials = require('./auth.json');

const messageMap = new Map();

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
  });
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('messageCreate', async message => {
	//haha funny
	if(messageMap.has(message.channel.id) && !message.author.bot){
		if(messageMap.get(message.channel.id).content == message.content && messageMap.get(message.channel.id).author != message.author.id){
			let messUpdate = messageMap.get(message.channel.id);
			messUpdate.times += 1;
			messUpdate.author = message.author.id;
			messageMap.set(message.channel.id,messUpdate);
			if(messUpdate.times == 3){
				if(messUpdate.content.length != 0){
					message.channel.send(messUpdate.content);
				}
				else{
					message.channel.send({stickers:messUpdate.sticker}).catch(() => {console.log('could not send sticker')});
				}
				messageMap.delete(message.channel.id);
			}
		}
		else{
			let newInput = {content:message.content,times:1,author:message.author.id,sticker:message.stickers};
			messageMap.set(message.channel.id,newInput);
		}
	}
	else{
		let newInput = {content:message.content,times:1,author:message.author.id,sticker:message.stickers};
		messageMap.set(message.channel.id,newInput);
	}
	if (message.content.toLowerCase() === '!dance deploy' && message.author.id == '492850107038040095') {
		console.log('deploying commands');
		const data = [
			{
				name: 'dance',
				description: 'Turns your input into dancing letters!',
				options: [{
					name: 'input',
					type: 'STRING',
					description: 'The text to change',
					required: true,
				}],
			}
		];

		const command = await client.guilds.cache.get(message.guildId)?.commands.set(data);
	}
});
	
	
client.on('interactionCreate', async interaction => {
	// waits for up caret
	var msg = interaction.options.getString('input');
	var user = await interaction.member.displayName;
	console.log(user + ":" + msg);
	var newMsg = "";
	var emoji;
	for(let i=0;i<msg.length;i++){
		if(msg.charAt(i) === '<'){
			var temp = "";
			var okSend = true;
			while(msg.charAt(i)!='>'){
				temp = temp + msg.charAt(i);
				i++;
				if(i > msg.length){
					okSend = false;
					break;
				}
			}
			if(okSend){
				temp = temp + msg.charAt(i);
				i++;
				newMsg = newMsg + `${temp}`;
			}
			i++;
		}
		else if(48 <= msg.charCodeAt(i) && msg.charCodeAt(i) <=57){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingNumbers[msg.charCodeAt(i)-48]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(65 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 90){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-65]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(97 <= msg.charCodeAt(i) && msg.charCodeAt(i) <= 122){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingLetters[msg.charCodeAt(i)-97]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(msg.charCodeAt(i) == 33){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[0]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(msg.charCodeAt(i) == 36){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[1]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(msg.charCodeAt(i) == 38){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[2]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(msg.charCodeAt(i) == 63){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[3]);
			newMsg = newMsg + `${emoji}`;
		}
		else if(msg.charCodeAt(i) == 64){
			emoji = client.emojis.cache.find(emoji => emoji.name === dancingSpecial[4]);
			newMsg = newMsg + `${emoji}`;
		}
		else{
			newMsg = newMsg + msg[i] + '     ';
		}
		//console.log(newMsg);
	}
	if(newMsg.length > 2000){
		interaction.reply({ content: `Your message was too long!`, ephemeral: true })
	}
	else{
		interaction.reply(newMsg).catch(e => {
			console.log(e);
		});
	}
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(`${credentials.token}`);
